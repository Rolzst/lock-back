import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jws.js";
import {TOKEN_SECRET} from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if (userFound)
            return res.status(400).json({message: ['El email ya esta en uso']});

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash
        }); //creamos un modelo user con los datos de requets
        const userSaved = await newUser.save({
            username,
            email,
            password: passwordHash
        }); //guardamos el modelo en mongodb
        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
        });

        res.send({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });    // y regresamos la respuesta de mongodb
    } catch (error) {
        console.error(error);   //en caso de fallo imprimimos el error
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if (!userFound)
            return res.status(400).json({message: ["User not found"]});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch)
            return res.status(400).json({message: ["La contraseña no coincide"]});

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
        });

        res.send({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            password: password,
        });    // y regresamos la respuesta de mongodb
    } catch (err) {
        console.log(err);
    }
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    console.log(req.user.id)
    const userFound
        = await User.findById(req.user.id);

    console.log(userFound)
    if (!userFound) {
        return res.status(400).json({message: ["User not found"]});
    }

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user)
            return res.status(404).json({message: ["Usuario no encontrado"]});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al actualizar el usuario']});
    }
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    if (!token)
        return res.status(404).json({message: ["No autorizado"]});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err)
            return res.status(401).json({message: ['No autorizado']});

        const userFound = await User.findById(user.id);
        if (!userFound)
            return res.status(401).json({message: ['No autorizado']});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}
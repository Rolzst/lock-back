import Servicio from '../models/servicio.models.js';
import CryptoJS from 'crypto-js';

export const createServicio = async (req, res) => {
    const {email_serv, nom_servicio, contrasenia, user} = req.body;
    const mensaje = "Este es un mensaje secreto";
    const clave = "ClaveSecreta123";

    const mensajeCifrado = CryptoJS.AES.encrypt(mensaje, clave).toString();

    console.log(mensajeCifrado);

    try {
        const passwordHash = CryptoJS.AES.encrypt(contrasenia, clave).toString();
        console.log(passwordHash);

        const newServicio = new Servicio({
            email_serv,
            nom_servicio,
            contrasenia: passwordHash,
            user
        });
        console.log(newServicio);
        const servicioSaved = await newServicio.save(newServicio);
        res.send(servicioSaved);    // y regresamos la respuesta de mongodb
    } catch (e) {
        console.log(e);
        res.status(500).send({message: ['Error al crear el servicio']});
    }
}

export const getServicios = async (req, res) => {

    try {
        const servicios = await Servicio.find({user: req.user.id}).populate('user');

        servicios.forEach(servicio => {
            const decryptedMessage = CryptoJS.AES.decrypt(servicio.contrasenia, 'ClaveSecreta123').toString(CryptoJS.enc.Utf8);

            console.log(decryptedMessage);
            servicio.contrasenia = decryptedMessage;
        });
        console.log(servicios);

        res.status(200).json(servicios);
    } catch (err) {
        console.log(err);
        res.status(500).send({message: ['Error al obtener los servicios']});
    }
}

export const deleteServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findByIdAndDelete(req.params.id);
        if (!servicio)
            return res.status(404).json({message: ["Servicio no encontrada"]});
        res.json(servicio);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: ['Error eliminar el servicio']});
    }
};
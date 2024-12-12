import mongoose from "mongoose";

const stringRule = {
    type: String,
    required: true,
    trim: true
};

const serviciosModel = new mongoose.Schema({
    nom_servicio: stringRule,
    email_serv: stringRule,
    contrasenia:stringRule,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('Servicio', serviciosModel);

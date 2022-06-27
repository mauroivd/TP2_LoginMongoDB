import { Schema, model } from 'mongoose';           // importo Schema y model para definir que la structura como objeto JSON en mongoDB

const barSchema = new Schema(
    {
        name: String,
        address: String,
        capacity: Number,
    },
    {
        timestamps: true,                           // para que guarde su fecha de creacion cada vez q se guarde un dato
        versionKey: false                           // para quitarle el __v  cada vez q se crea un documento
    }
);


export default model('Bar', barSchema);             // exporto un modelo que va a estar basado en el barSchema que defini
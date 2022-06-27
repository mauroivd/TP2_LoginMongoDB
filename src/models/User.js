import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'                               //modulo para encriptar passwords


const userSchema = new Schema({
    username : {
        type : String,
        unique: true
    },
    email : {
        type : String,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    roles : [
        {
            ref  : "Role",                                  //propiedad q me indica q esta relacionado con el modelo de Role
            type : Schema.Types.ObjectId                    //indico q el tipo de dato q guardo es un objectid y no el nombre del rol
        }
    ],
},
{
    timestamps: true,
    versionKey: false
}
);


export default model("User", userSchema);
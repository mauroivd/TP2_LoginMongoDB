//creo los roles para limitar segun el tipo de cada usuario
import { Schema, model } from 'mongoose';


export const ROLES = ["user", "moderator", "admin"];



const roleSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);

export default model("Role", roleSchema); 
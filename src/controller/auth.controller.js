import User from '../models/User';
import Role from '../models/Role'

import * as Utils from '../libs/utils'      // modulo donde tengo mis metodos bcryptjs
import jsonWebToken from 'jsonwebtoken'     // modulo para asignar tokens a cada sesion de User
import config from '../config'              // modulo donde tengo un objeto q tiene mi palabra clave




// Registro de usuarios
export const signUp = async (req, res) => {
    try {
        const { username, email, password, roles} = req.body;               // Destructure del req.body por comodidad

        const newUser = new User({                                          // Creo un nuevo objeto de User
            username,
            email,
            password: await Utils.encryptPassword(password),
        });
    

        if(roles != undefined || roles != null ){                           // Verifico si recibo algun rol, caso contrario asigno _id defautl de User       
            const foundRoles = await Role.find( {name: {$in: roles }} )
            newUser.roles = foundRoles.map(role => role._id);               // Itero todo el objeto Roles y solo tomo el dato del _id
        } else {
            const role = await Role.findOne( {name: 'user'} ) 
            newUser.roles = [role._id];
        }
    
        const savedUser = await newUser.save();                              // Guardo en MongoDB el objeto User
        console.log(savedUser)


        return res.status(200).json({ message: "El usuario ** " + savedUser.email + " ** fue generado correctamente." });

    } catch (error) {
        console.error(error);
    }
} 



// Inicio de sesion
export const login = async (req, res) => {
    
    const userFound = await User.findOne({ email: req.body.email }).populate("roles")               //con populate() obtengo el objeto entero

    if (!userFound) return res.status(400).json({ message: "No se encontro el usuario" });

    const matchPassword = await Utils.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({token: null, message: "Invalid password" });
    
    //devuelvo un token cada vez q inicio sesion, que luego utilizo en un header para mis middlewares
    const token = jsonWebToken.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400, // 24 hours en seg.
    });

    console.log(userFound)

    res.json({token})
}

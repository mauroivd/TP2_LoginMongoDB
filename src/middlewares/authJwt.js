import jwt, { decode } from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";


export const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];                                                        // guardo el token que recibo en un header

    if (!token) return res.status(403).json({ message: "No se recibio un Token para validar. Es necesario que inicie su sesion." });      // necesito un token que recibo al iniciar sesion o generar un usuario.

    try {
        const decodedToken = jwt.verify(token, config.SECRET);                                        // decodifico el token para obtener el id de mi usuario y poder validar si existe
        // console.log(decodedToken)
        req.userId = decodedToken.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No se encontro el usuario." });

        next();

    } catch (error) {
        return res.status(401).json({ message: "No tiene autorizacion!." });
    }
};


export const isModOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator" || roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Necesita un Rol de Moderator/Admin!" });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Necesita ser un Admin!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

import User from "../models/User";
import { ROLES } from "../models/Role";

// Verifico si el correo existe
const checkUsernameOrEmailExist = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) return res.status(400).json({ message: "El usuario ya existe" });
        
        const email = await User.findOne({ email: req.body.email });
        if (email) return res.status(400).json({ message: "El email ya existe" });
    
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Verifico si los roles existen
const checkRolesExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({   message: `El Rol ${req.body.roles[i]} no existe`,});
            }
        }   
    }

    next();
};


export { checkUsernameOrEmailExist, checkRolesExist };


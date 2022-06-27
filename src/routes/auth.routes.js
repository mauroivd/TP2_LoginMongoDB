import * as authController from '../controller/auth.controller';
import { Router } from 'express';
import { verifySignup} from '../middlewares';


const router = Router()


//Registro de usuarios, verifico primero si existen user/email/roles con mis middlewares
router.post("/signup", [verifySignup.checkUsernameOrEmailExist, verifySignup.checkRolesExist], authController.signUp)


//Inicio de sesion 
router.post("/login", authController.login)



export default router;
//endpoints para los bares
import { Router } from 'express';
const router = Router()
//importo todas mis funciones de mi controller
import * as baresController from '../controller/bares.controller';
import { authJwt } from '../middlewares';



router.get('/', authJwt.verifyToken, baresController.getBares)

router.get('/:barId', authJwt.verifyToken, baresController.getBarById)

router.post('/', [authJwt.verifyToken, authJwt.isModOrAdmin], baresController.createBar)

router.put('/:barId', [authJwt.verifyToken, authJwt.isModOrAdmin], baresController.updateBarById)

router.delete('/:barId', [authJwt.verifyToken, authJwt.isAdmin], baresController.deleteBarById)




export default router;

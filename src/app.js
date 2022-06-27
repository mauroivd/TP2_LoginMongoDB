import express from 'express';
import morgan from 'morgan';
import infoPkg from '../package.json'

import {createRoles} from './libs/initialSetup'             //para crear los roles cuando inicie express 

import baresRoutes from './routes/bares.routes'
import authRoutes from './routes/auth.routes'


const app = express()
createRoles();


app.use(morgan('dev'));
app.use(express.json());                                    //para q pueda interpretar los objetos json q lleguen y no me los muestre como undefined si uso un console.log(*)


app.set('infoPkg', infoPkg);
app.get('/',(req, res) => {                                 //info inicial cuando me conecto a localhost:4000
    res.json({
        name : "App " + app.get('infoPkg').name,
        author : app.get('infoPkg').author,
        description : app.get('infoPkg').description
    })

})


app.use('/bares', baresRoutes);
app.use('/auth' , authRoutes);


export default app;
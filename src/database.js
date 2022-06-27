import mongoose from 'mongoose';//modulo para trabajar con MongoDB

mongoose.connect("mongodb://localhost/tp2_baresdb")
        .then(db => console.log('Conectado a MongoDB:tp2_baresdb'))
        .catch(error => console.log(error))

import Bar from '../models/Bar'


//POST: nuevo Bar
export const createBar = async (req, res) => {
    console.log(req.body)
    const {name, address, capacity} = req.body //destructuro mi req.body para crear un nuevo Bar
    const newBar = new Bar({name, address, capacity});
    const barSaved = await newBar.save() //async y await para especificar que es asincrono, y save() para guardarlo en mi DBS

    res.status(201)       //codigo de estado para especificar que se creo un nuevo recurso
    res.json(barSaved)    // para devolver el bar que acabo d guardar 
    
}

//GET: lista de Bares
export const getBares = async (req, res) => {
    const baresList = await Bar.find()  //me devuelve mi lista de Bares en un array
    //console.log(baresList)
    res.status(200)   
    res.json(baresList)
    
}

//GET: un Bar especificando el Id
export const getBarById = async (req, res) => {
    const barFound = await Bar.findById(req.params.barId)
    //console.log(barFound)
    res.status(200)
    res.json(barFound)

}

//PUT: actualiza un Bar especificando el Id
export const updateBarById = async (req, res) => {
    const updatedBar = await Bar.findByIdAndUpdate(req.params.barId, req.body, {
        new: true //para q moongose me devuelva los datos actualizados
    })
    res.status(200).json(updatedBar)
}

//DELETE: elimina un Bar especificando el Id
export const deleteBarById = async (req, res) => {
    const deletedBar = await Bar.findByIdAndDelete(req.params.barId)
    res.status(200).json("Bar *"+ deletedBar.name + "* eliminado de la DB.")
    
    //await Bar.findByIdAndDelete(req.params.barId)
    //res.status(204).json()
}
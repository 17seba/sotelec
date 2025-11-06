import TecnicoService from '../services/TecnicoService.js'
import { generateToken,verifyToken } from '../utils.js'
const Tecnico = new TecnicoService()

const index = async(req,res) => {
    try {
        const tecnicos = await Tecnico.obtenerTodosLosTecnico()
        //console.log(tecnicos)
        return res.render('tecnicos/viewListarTecnicos', {
            layout: 'main',
            title:'Listado de Tecnico',
            tecnicos
        })
    } catch (error) {
        console.log(error)
    }
}

export {index}
import UsuarioService from '../services/UsuarioService.js'
import { generateToken,verifyToken } from '../utils.js'
const usuario = new UsuarioService()

const index = async(req,res) => {
    try {
        const usuarios = await usuario.obtenerTodosLosUsuarios()
        return res.render('usuarios/listar', {
            layout: 'main',
            title:'Listado de usuarios',
            usuarios
        })
    } catch (error) {
        console.log(error)
    }
}

export {index}
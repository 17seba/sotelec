import SesionService from '../services/SesionService.js'
import { generateToken } from '../utils.js'
const Sesion = new SesionService()

const index = async(req,res) => {
    try {
        return res.render('sesion/index',{
            layout: 'sesion'
        })
    } catch (error) {
        
    }
}

const nopermitido = async(req,res) => {
    try {
        return res.status(300).send({status:false,message:'Usuario o Contraseña son invalidos'})
    } catch (error) {
         console.log(error.message)
    }
}

const login = async(req,res) => {
    console.log('ok')
    if(!req.user){
        console.log('err')
        return res.status(400).send({status:false,message:'Credenciales invalidas'})
    }
    const token = generateToken(req.user)
    return res.cookie('cookieToken',token,{
        maxAge:60*60*1000,
        httpOnly:true,
        secure:true,
        sameSite: 'strict'
    }).send({status:true,message:''})
}


export {index,login,nopermitido}
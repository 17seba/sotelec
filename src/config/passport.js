import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
import SesionService from '../services/SesionService.js'
import { isValidPassword, createHash } from '../utils.js'
const Sesion = new SesionService()
const initializePassport = () => {

    passport.use(new localStrategy({usernameField:'email'},async (email,password,done) => {
        try {
            //console.log(await createHash("12345"))
            const cliente = await Sesion.buscarUsuarioPorEmail(email)
            
           // console.log(cliente)
            if(!cliente){
                return done(null,false)
            }
            if(!await isValidPassword(cliente.password,password)){
                return done(null,false)
            }
            return done(null,cliente)
        } catch (err) {
            return done(`Error al obtener el usuario: ${err}`)
        }
    }))

    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['cookieToken']
        }
        return token
    }

    passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:'55a1d5f0e8bc2c0f4e5f67e83e14ab981d79fcfeb9d53ec3eed11252ddfbf10c'
    },async(jwt_payload,done) => {
        try {
            //Obtengo el id del cliente desde la cookie
            const {usuario_id} = jwt_payload.user
            //Por si el usuario ha sufrido cambios
            const user = await Sesion.buscarUsuarioPorId(usuario_id)
            return done(null,user)
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser(async (usuario,done) => {
        done(null,usuario.usuario_id)
    })

    passport.deserializeUser(async (id,done) => {
        const usuario = await Sesion.buscarUsuarioPorId(id)
        done(null,usuario)
    })

}
export default initializePassport
import {Router} from 'express'
import passport from 'passport';
const router = Router()
import {index} from '../controllers/UsuarioController.js'


router.get('/',passport.authenticate('jwt',{session:false}),index)

export default router
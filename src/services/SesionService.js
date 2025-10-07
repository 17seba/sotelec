import config from '../config/config.js'
import knex from 'knex'
export default class SesionService{
    constructor(){
        this.knex = knex(config)
    }
    
    async buscarUsuarioPorEmail(email){
        return this.knex('usuarios').select('*').where({email:email}).first()
    }

    async buscarUsuarioPorId(id){
        return this.knex('usuarios').select('*').where({usuario_id:id}).first()
    }
}
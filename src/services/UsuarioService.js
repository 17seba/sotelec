import config from '../config/config.js'
import knex from 'knex'
export default class UsuarioService{
    constructor(){
        this.knex = knex(config)
    }
    
    async buscarUsuarioPorRun(runCliente){
        return this.knex('clientes').select('*').where({run:runCliente}).first()
    }

    async obtenerTodosLosUsuarios(){
        return this.knex('usuarios').select('*')
    }

}
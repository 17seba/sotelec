import config from '../config/config.js'
import knex from 'knex'
export default class TecnicoService{
    constructor(){
        this.knex = knex(config)
    }
    
    async buscarTecnicoPorRun(runCliente){
        return this.knex('clientes').select('*').where({run:runCliente}).first()
    }

    async obtenerTodosLosTecnico(){
        return this.knex.select('usuario_id', 'nombre', 'apellido1', 'apellido2', 'email').from('usuarios')
    }

}
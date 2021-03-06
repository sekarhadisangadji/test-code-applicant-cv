'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Keahlian extends Model {

    static get incrementing () {
        return false
    }
    
    static get primaryKey () {
        return 'id'
    }

    static get table () {
        return 'keahlian'
    }
}

module.exports = Keahlian

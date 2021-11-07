'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PengalamanKerjaApplicant extends Model {

    static get incrementing () {
        return false
    }
    
    static get primaryKey () {
        return 'id'
    }

    static get table () {
        return 'pengalaman_kerja_applicants'
    }

}

module.exports = PengalamanKerjaApplicant

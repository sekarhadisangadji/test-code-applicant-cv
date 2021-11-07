'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CvApplicant extends Model {

    static get incrementing () {
        return true
    }

    static get primaryKey () {
        return 'id'
    }

    static get table () {
        return 'cv_applicants'
    }

}

module.exports = CvApplicant

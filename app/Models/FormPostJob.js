'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FormPostJob extends Model {

    static get incrementing () {
        return false
    }
    
    static get primaryKey () {
        return 'id'
    }

    static get table () {
        return 'form_post_jobs'
    }

}

module.exports = FormPostJob

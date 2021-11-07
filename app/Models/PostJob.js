'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PostJob extends Model {

    static boot() {
        super.boot()
        this.addTrait('@provider:Lucid/When')
    }

    static get incrementing () {
        return false
    }
    
    static get primaryKey () {
        return 'id'
    }

    static get table () {
        return 'post_jobs'
    }

    form_additional() {
        return this.hasMany('App/Models/FormPostJob','post_jobs_id','id');
    }

    company_data() {
        return this.hasOne('App/Models/Company','company_id','id');
    }

    user_create() {
        return this.hasOne('App/Models/User','post_by_user_id','id');
    }

}

module.exports = PostJob

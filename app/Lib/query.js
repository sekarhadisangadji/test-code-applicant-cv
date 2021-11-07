

// MODEL
const User      = use('App/Models/User')
const Company   = use('App/Models/Company')

module.exports = {

    findCompany: async(id) => {
        return await Company.query().where('id','=',id).first()
    }

}

const { v4: uuidv4 }        = require('uuid')
var moment                  = require('moment')
// MODEL
const User                      = use('App/Models/User')
const Company                   = use('App/Models/Company')
const Job                       = use('App/Models/PostJob')
const AditionalFormJob          = use('App/Models/FormPostJob')

module.exports = {

    findCompany: async(id) => {
        return await Company.query().where('id','=',id).first()
    },

    createPostJob : async(body) => {
        let idJob = uuidv4()
        const createJob = new Job()
        createJob.id    = idJob
        createJob.company_id = body.company
        createJob.post_by_user_id = body.user
        createJob.title_job       = body.title
        createJob.create_date     = moment(body.date).format("YYYY-MM-DD")
        createJob.created_date_time =  moment(body.date).format("YYYY-MM-DD HH:mm:ss")
        createJob.about_job = body.about
        await createJob.save()
        if(body.additional_label.length != 0) {
            for(i = 0; i < body.additional_label.length; i++) {
                const formAdditional = new AditionalFormJob()
                formAdditional.id           = uuidv4()
                formAdditional.post_jobs_id = idJob
                formAdditional.position = i
                formAdditional.label = body.additional_label[i]
                formAdditional.type_data_value = body.additional_type[i]
                await formAdditional.save()
            }
        }
    }

}
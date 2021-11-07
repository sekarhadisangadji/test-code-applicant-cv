
const { v4: uuidv4 }        = require('uuid')
var moment                  = require('moment')
// MODEL
const User                      = use('App/Models/User')
const Company                   = use('App/Models/Company')
const Job                       = use('App/Models/PostJob')
const AditionalFormJob          = use('App/Models/FormPostJob')

module.exports = {

    findUser: async(id) => {
        return await User.query().where('id','=',id).first()
    },

    findCompany: async(id) => {
        return await Company.query().where('id','=',id).first()
    },

    getTotalPostJob: async() => {
        let total = await Job.query().count('* as total')
        return total[0].total
    },

    getTotalPostJobNonActive: async() => {
        let total = await Job.query().where('active','=',false).count('* as total')
        return total[0].total
    },

    listPostJob: async(request) => {
        let page = parseInt(request.all().page,10) || 1;
        let query = Job.query()
        query.with('form_additional')
        query.with('user_create')
        query.where('active','=',true)
        query.when(request.all().search, (q,value) => q.where('title_job','LIKE', "%"+value+"%"))
        query.orderBy('created_at','desc')
        let getData = await query.paginate(page,20)
        return getData
    },

    createPostJob : async(body) => {
        let idJob = uuidv4()
        const createJob = new Job()
        createJob.id    = idJob
        createJob.company_id = body.company
        createJob.post_by_user_id = body.user
        createJob.title_job       = body.title
        createJob.create_date     = moment(body.date).format("YYYY-MM-DD")
        createJob.created_date_time =  moment(body.date+' '+moment().format('HH:mm:ss')).format("YYYY-MM-DD HH:mm:ss")
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
'use strict'
const Helpers                   = use('Helpers')
// model
const CVApplicant               = use('App/Models/CvApplicant')
// LIB
const LibQuery                  = use('App/Lib/query')

class ApplicantController {

    async profile({ view, auth }) {
        let pengalamanKerja = await LibQuery.getAllPengalamanKerjaByID(auth.user.id)
        let userData        = await auth.user
        let myCV            = await CVApplicant.query().where('user_id','=',auth.user.id).first()
        return view.render('applicant.profile',{
            title : 'Profile',
            active_menu : 'profile',
            user : userData.toJSON(),
            pengalaman_kerja : pengalamanKerja.toJSON(),
            my_cv : myCV
        })
    }

    async searchJob({ view }) {
        return view.render('applicant.search-job',{
            title : 'Cari pekerjaan',
            active_menu : 'search-job',
        })
    }

    async uploadCV({ request, response}) {
        console.log(request.all())
        const fileCV = request.file('file_cv', {
            size: '10mb'
          })
        await fileCV.moveAll(Helpers.tmpPath('uploads'))
        return response.route('applicant.profile')
    }

}

module.exports = ApplicantController

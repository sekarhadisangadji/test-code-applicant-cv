'use strict'

// LIB
const LibQuery = use('App/Lib/query')

class ApplicantController {

    async profile({ view, auth }) {
        let pengalamanKerja = await LibQuery.getAllPengalamanKerjaByID(auth.user.id)
        let userData        = await auth.user
        return view.render('applicant.profile',{
            title : 'Profile',
            active_menu : 'profile',
            user : userData.toJSON(),
            pengalaman_kerja : pengalamanKerja.toJSON()
        })
    }

}

module.exports = ApplicantController

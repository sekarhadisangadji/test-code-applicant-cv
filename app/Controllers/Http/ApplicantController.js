'use strict'

class ApplicantController {

    async profile({ view, auth }) {
        return view.render('applicant.profile',{
            title : 'Profile',
            active_menu : 'profile',
            user : await auth.user.toJSON()
        })
    }

}

module.exports = ApplicantController

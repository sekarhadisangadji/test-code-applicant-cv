'use strict'

class ApplicantController {

    async profile({ view }) {
        return view.render('applicant.profile',{
            title : 'Profile',
            active_menu : 'profile'
        })
    }

}

module.exports = ApplicantController

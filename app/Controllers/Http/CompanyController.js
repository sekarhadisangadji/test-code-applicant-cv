'use strict'
const { validate } = use('Validator')
// model
const User = use('App/Models/User')

class CompanyController {

    async dashboard({ view }) {
		return view.render('company.dashboard',{
	   	title : 'Dashboard',
	   	active_menu : 'dashboard'
	   })
	}

}

module.exports = CompanyController

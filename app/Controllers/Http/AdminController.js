'use strict'
const { validate } = use('Validator')
// model
const User = use('App/Models/User')

class AdminController {

	async dashboard({ view }) {
		return view.render('admin.dashboard',{
	   	title : 'Dashboard',
	   	active_menu : 'dashboard'
	   })
	}

}

module.exports = AdminController

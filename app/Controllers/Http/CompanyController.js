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

	async setting({ view }) {
		return view.render('company.setting',{
			title : 'Pengaturan',
			active_menu : 'setting'
		})
	}

	async jobs({ view }) {
		return view.render('company.jobs',{
			title : 'List pekerjaan',
			active_menu : 'jobs'
		})
	}

	async jobsAdd({ view }) {
		return view.render('company.jobs-add',{
			title : 'Tambah pekerjaan',
			active_menu : 'jobs'
		})
	}

}

module.exports = CompanyController

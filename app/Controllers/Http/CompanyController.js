'use strict'
const { validate } = use('Validator')
// LIB
const LibQuery = use('App/Lib/query')

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
		let totalJob = await LibQuery.getTotalPostJob()
		let totalNonActiveJob = await LibQuery.getTotalPostJobNonActive()
		return view.render('company.jobs',{
			title : 'List pekerjaan',
			active_menu : 'jobs',
			total_job : totalJob.toString(),
			total_non_active_job : totalNonActiveJob.toString()
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

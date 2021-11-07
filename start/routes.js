'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', async ({ response }) => {

	return response.route('login.index')

}).as('base')

// AUTH

Route.group(() => {
	Route.get('login', 'Auth/LoginController.index').as('login.index').middleware('guestOnly')
	Route.post('login', 'Auth/LoginController.check').as('login.check').middleware('guestOnly')
	Route.get('register', 'Auth/LoginController.register').as('register').middleware('guestOnly')
	Route.post('register', 'Auth/LoginController.registerCheck').middleware('guestOnly')
	Route.post('logout', 'Auth/LoginController.logout').as('logout').middleware('auth')
}).prefix('auth')

// END AUTH


// APPLICANT

Route.group(() => {

	Route.get('profile', 'ApplicantController.profile').as('applicant.profile')


}).prefix('app/applicant').middleware('applicantOnly')

// END APPLICANT

// COMPANY

Route.group(() => {

	Route.get('dashboard', 'CompanyController.dashboard').as('company.dashboard')

	// JOBS

	Route.get('jobs','CompanyController.jobs').as('company.jobs')

	Route.get('jobs/add','CompanyController.jobsAdd').as('company.jobs.add')

	// END JOBS

	// SETTING
	Route.get('setting','CompanyController.setting').as('company.setting')
	// END SETTING

}).prefix('app/corporate').middleware('companyOnly')

// END COMPANY

// ADMIN

Route.group(() => {

	Route.get('dashboard', 'AdminController.dashboard').as('admin.dashboard')

}).prefix('app/admin').middleware('adminOnly')


// END ADMIN

// API
Route.group(() => {

		// JOBS

		Route.post('jobs/add','ApiController.jobsAdd').middleware('apikey:company').as('api.jobs.add')

		Route.post('jobs/list','ApiController.jobsList').middleware('apikey:company,applicant').as('api.jobs.list')

		// END JOBS

		// COMPANY

		Route.get('company/:id', 'ApiController.companyFind').middleware('apikey:company,applicant').as('api.company.find')

		Route.post('company/update/:id', 'ApiController.companyUpdate').middleware('apikey:company').as('api.company.update')

		// END COMPANY

}).prefix('apiku')
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
	Route.post('logout', 'Auth/LoginController.logout').as('logout').middleware('auth')
}).prefix('auth')

// END AUTH

// COMPANY

Route.group(() => {

	Route.get('dashboard', 'AdminController.dashboard').as('company.dashboard')

}).prefix('app/corporate').middleware('companyOnly')

// END COMPANY

// ADMIN

Route.group(() => {

	Route.get('dashboard', 'AdminController.dashboard').as('admin.dashboard')

}).prefix('app/admin').middleware('adminOnly')


// END ADMIN


'use strict'

const { validate } = use('Validator')
const { v4: uuidv4 }        = require('uuid')
// model
const User = use('App/Models/User')

class LoginController {

	async index({ view }) {
	   return view.render('auth.login',{
	   	title : 'Login'
	   })
	}

	async register({ view }) {
		return view.render('auth.register',{
			title : 'Register'
		})
	}

	async registerCheck({ request, auth, response }) {
		const validation = await validate(request.all(), {
			first_name : "required|string",
			last_name : "required|string",
			email: 'required|email|unique:users,email',
			password: 'required'
		  })
		  if (validation.fails()) {
			return response.status(422).json({
				error : true,
				status : 422,
				message: validation.messages()[0].message
			})
		  }
		  const createUser = new User()
		  createUser.id         = uuidv4()
		  createUser.api_key    = uuidv4()
		  createUser.first_name = request.body.first_name
		  createUser.last_name  = request.body.last_name
		  createUser.email      = request.body.email
		  createUser.email_verified = true
		  createUser.password = request.body.password
		  await createUser.save()
		  try {
	    	await auth.attempt(request.body.email, request.body.password)
	    	var urlPathRedirect = '';
	    	const user = await auth.user.toJSON()
	    	if(user.type == 'admin') {
	    		urlPathRedirect = '/app/admin/dashboard'
	    	} else if (user.type == 'company') {
				urlPathRedirect = '/app/corporate/dashboard'
			} else if (user.type == 'applicant') {
				urlPathRedirect = '/app/applicant/dashboard'
			}
	    	return response.status(200).json({
		      	  error : false,
		          status : 200,
		          message: "Successfully register",
		          data : {
		          	redirect_url : urlPathRedirect
		        }
		    })
	    } catch(e) {
			console.log(e)
	    	return response.status(422).json({
	      	  error : true,
	          status : 422,
	          message: 'Something wrong'
	      })
	    }
	}

	async check({ request, auth, response }) {
	    const validation = await validate(request.all(), {
	      email: 'required|email',
	      password: 'required'
	    })
		if (validation.fails()) {
	      return response.status(422).json({
	      	  error : true,
	          status : 422,
	          message: validation.messages()[0].message
	      })
	    }
	    try {
	    	await auth.attempt(request.all().email, request.all().password)
	    	var urlPathRedirect = '';
	    	const user = await auth.user.toJSON()
	    	if(user.type == 'admin') {
	    		urlPathRedirect = '/app/admin/dashboard'
	    	} else if (user.type == 'company') {
				urlPathRedirect = '/app/corporate/dashboard'
			} else if (user.type == 'applicant') {
				urlPathRedirect = '/app/applicant/dashboard'
			}
	    	return response.status(200).json({
		      	  error : false,
		          status : 200,
		          message: "Successfully login",
		          data : {
		          	redirect_url : urlPathRedirect
		        }
		    })
	    } catch(e) {
	    	return response.status(422).json({
	      	  error : true,
	          status : 422,
	          message: 'Email dan password salah.'
	      })
	    }
	}

	async logout({ auth, response }) {
	   await auth.logout()
	   return response.route('login.index')
	}
}

module.exports = LoginController

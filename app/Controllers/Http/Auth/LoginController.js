'use strict'

const { validate } = use('Validator')
// model
const User = use('App/Models/User')

class LoginController {

	async index({ view }) {
	   return view.render('auth.login',{
	   	title : 'Login'
	   })
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

'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthAdminOnly {
  
  
  async handle ({ request, auth, response, view }, next) {
    try {
      await auth.check()
      const user = await auth.user.toJSON()
      if(user.type == 'admin') {
        await next()
      } else {
        return response.status(404).json('page not found')
      }
    } catch (error) {
      return response.route('login.index')
    }
  }
}

module.exports = AuthAdminOnly

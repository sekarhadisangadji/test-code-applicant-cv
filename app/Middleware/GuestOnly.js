'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GuestOnly {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    try {
      await auth.check()
      const user = await auth.user.toJSON()
      if(user.type == 'admin') {
        response.route('admin.dashboard')
      } else if(user.type == 'company') {
        response.route('company.dashboard')
      }
    } catch (error) {
      await next()
    }
  }
}

module.exports = GuestOnly

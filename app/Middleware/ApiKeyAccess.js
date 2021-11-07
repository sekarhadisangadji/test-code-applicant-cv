'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class ApiKeyAccess {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next, userType) {
    let auth = request.header('Authorization')
    if(!auth) {
      return response.status(401).json({
        status : 401,
        message : 'Unauthorized'
      });
    }
    let getUser = await User.query().where('api_key','=',auth).first()
    if(!getUser) {
      return response.status(401).json({
        status : 401,
        message : 'Api key not valid'
      });
    }
    for(let i in userType) {
        if(userType[i] == getUser.type){
          request.auth_data = getUser
          return await next()
        }
    }
    return response.status(401).json({
      status : 401,
      message : 'Access not valid'
    });
  }
}

module.exports = ApiKeyAccess

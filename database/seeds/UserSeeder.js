'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory               = use('Factory')
const User                  = use('App/Models/User')
const Company               = use('App/Models/Company')
const { v4: uuidv4 }        = require('uuid')
var slugify                 = require('slugify')

class UserSeeder {
  async run () {
    let checkUser = await User.query().count('* as total')
    if(checkUser[0].total == 0) {
      let checkCompany = await Company.query().count('* as total')
      if(checkCompany[0].total == 0) {
        let idCompany = uuidv4()
        let nameCompany = 'PT. INDONESIA MERDEKA'
        const createCompany                     = new Company()
        createCompany.id                        = idCompany
        createCompany.slug_name_company         = slugify(nameCompany, {replacement: '-', remove: undefined, lower: true, strict: false, trim: true})
        createCompany.name_company              = nameCompany
        createCompany.moto_company              = 'TETAP MERDEKA INDONESIA RAYA'
        await createCompany.save()
        // create user company
        const u1      = new User()
        u1.id         = uuidv4()
        u1.api_key    = uuidv4()
        u1.password   = 'password'
        u1.email      = 'company@example.com'
        u1.email_verified = true
        u1.first_name = 'hadi'
        u1.last_name  = 'sangadji'
        u1.type       = 'company'
        u1.company_id = idCompany
        u1.company_verified = true
        await u1.save()
      }
    }
  }
}

module.exports = UserSeeder

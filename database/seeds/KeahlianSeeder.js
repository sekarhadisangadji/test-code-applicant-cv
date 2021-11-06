'use strict'

/*
|--------------------------------------------------------------------------
| KeahlianSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory   = use('Factory')
var slugify     = require('slugify')

class KeahlianSeeder {
  async run () {
    let dataKeahlian = [
      {
        name : "PHP"
      },
      {
        name : "NodeJs"
      },
      {
        name : "Laravel"
      }
    ]

  }
}

module.exports = KeahlianSeeder

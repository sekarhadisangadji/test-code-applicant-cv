'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('company', (table) => {
      table.uuid('id').primary()
      table.string('logo').notNullable().defaultTo('logo_default_company.png')
      table.string('slug_name_company').notNullable()
      table.string('name_company').notNullable()
      table.string('moto_company').nullable()
      table.text('about').nullable()
      table.string('website').nullable()
      table.string('industri').nullable()
      table.string('location_head_office').nullable()
      table.string('jenis_company').nullable()
      table.string('years_of_standing').nullable()
      table.text('spesialis').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('company')
  }
}

module.exports = CompanySchema

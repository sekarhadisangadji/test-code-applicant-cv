'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KeahlianSchema extends Schema {
  up () {
    this.create('keahlian', (table) => {
      table.uuid('id').primary()
      table.string('slug_name').notNullable().unique()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('keahlian')
  }
}

module.exports = KeahlianSchema

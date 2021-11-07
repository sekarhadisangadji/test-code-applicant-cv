'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormPostJobsSchema extends Schema {
  up () {
    this.create('form_post_jobs', (table) => {
      table.uuid('id').primary()
      table.uuid('post_jobs_id').notNullable()
      table.integer('position').notNullable()
      table.string('label').notNullable()
      table.string('type_data_value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('form_post_jobs')
  }
}

module.exports = FormPostJobsSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostJobsSchema extends Schema {
  up () {
    this.create('post_jobs', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id').notNullable()
      table.uuid('post_by_user_id').notNullable()
      table.string('title_job').notNullable()
      table.date('create_date').notNullable()
      table.datetime('created_date_time').notNullable()
      table.text('about_job').notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('post_jobs')
  }
}

module.exports = PostJobsSchema

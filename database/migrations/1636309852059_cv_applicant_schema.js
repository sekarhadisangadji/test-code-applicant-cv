'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CvApplicantSchema extends Schema {
  up () {
    this.create('cv_applicants', (table) => {
      table.increments()
      table.uuid('user_id').notNullable().unique()
      table.string('name_file').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cv_applicants')
  }
}

module.exports = CvApplicantSchema

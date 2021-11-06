'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.uuid('id').primary()
      table.string('api_key').notNullable().unique()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('moto_profesional').nullable()
      table.string('phone_number').nullable()
      table.string('profile').notNullable().defaultTo('profile_default.png')
      table.string('email').notNullable().unique()
      table.boolean('email_verified').notNullable().defaultTo(false)
      table.string('password').notNullable()
      table.enu('type',['company','applicant','admin']).notNullable().defaultTo('applicant')
      table.uuid('company_id').nullable()
      table.boolean('company_verified').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

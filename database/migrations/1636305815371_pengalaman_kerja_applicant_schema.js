'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PengalamanKerjaApplicantSchema extends Schema {
  up () {
    this.create('pengalaman_kerja_applicants', (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable()
      table.string('posisi').notNullable()
      table.string('jenis_pekerjaan').notNullable()
      table.string('nama_perusahaan').notNullable()
      table.string('lokasi_pekerjaan').notNullable()
      table.string('start_month').notNullable()
      table.string('start_year').notNullable()
      table.string('end_month').notNullable()
      table.string('end_year').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pengalaman_kerja_applicants')
  }
}

module.exports = PengalamanKerjaApplicantSchema

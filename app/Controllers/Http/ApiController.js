'use strict'

const { validate }       = use('Validator')
var slugify              = require('slugify')

// LIB
const LibQuery           = use('App/Lib/query')

class ApiController {

    async companyFind({ response, params }) {
        let find = await LibQuery.findCompany(params.id)
        if(find == null) {
            return response.status(404).json({
                error: true,
                status:404,
                message: "company not found"
            })
        }
        return response.status(200).json({
            error: false,
            status: 200,
            message: "Successfully find company", 
            data : find
        })
    }

    async companyUpdate({ request, response, params }) {
          const validation = await validate(request.body, {
            name_company                 : 'required|string',
            moto_company                 : 'required|string',
            about_company                : 'required|string',
            website_company              : 'required|string',
            industri_company             : 'required|string',
            head_office_location_company : 'required|string',
            jenis_company                : 'required|string',
            tahun_berdiri_company        : 'required|string',
            spesialis_company            : 'required|string'
          })
          if (validation.fails()) {
            return response.status(422).json({
                error : true,
                status : 422,
                message: validation.messages()[0].message
            })
          }
        if(params.id != request.auth_data.company_id) {
            return response.status(422).json({
                error: true,
                status:422,
                message: "company not valid"
            })
        }
        let find = await LibQuery.findCompany(params.id)
        find.slug_name_company = slugify(request.body.name_company, {replacement: '-', remove: undefined, lower: true, strict: false, trim: true})
        find.name_company      = request.body.name_company
        find.moto_company      = request.body.moto_company
        find.about             = request.body.about_company
        find.website           = request.body.website_company
        find.industri          = request.body.industri_company
        find.location_head_office = request.body.head_office_location_company
        find.jenis_company     = request.body.jenis_company
        find.years_of_standing = request.body.tahun_berdiri_company
        find.spesialis         = request.body.spesialis_company
        await find.save()
        return response.status(200).json({
            error: false,
            status: 200,
            message: "Successfully update company"
        })
    }

    
}

module.exports = ApiController

import Joi from 'joi'
export const createUser = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().required(),
    phone : Joi.string().required(),
    Profile : Joi.string().required()
})
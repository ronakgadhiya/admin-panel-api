import Joi from 'joi'
export const createUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required()
})


export const userLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

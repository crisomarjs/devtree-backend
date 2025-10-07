import User from "../models/User"
import { Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
import slug from "slug"
import { validationResult } from "express-validator"
import { generateJWT } from "../utils/jwt"

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        const error = new Error('Un Usuario con ese email ya esta registrado')
        return res.status(409).json({ error: error.message })
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })

    if (handleExist) {
        const error = new Error('Nombre de ususario no disponible')
        return res.status(409).json({ error: error.message })
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    await user.save()
    res.status(201).send('Resgitro Creado Correctamente')
}

export const login = async (req: Request, res: Response) => {

    //comprobar si el usuario existe
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error('El Usuario no existe')
        return res.status(404).json({ error: error.message })
    }

    //comprobar el password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Password Incorrecto')
        return res.status(401).json({ error: error.message })
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}

import User from "../models/User"
import { Request, Response } from "express"
import { checkPassword, hashPassword } from "../utils/auth"
import slug from "slug"
import formidable from "formidable"
import {v4 as uuid} from "uuid"
import cloudinary from "../config/cloudinary"
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

    const token = generateJWT({ id: user._id })

    res.send(token)
}


export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body

        const handle = slug(req.body.handle, '')
        const handleExist = await User.findOne({ handle })
        if (handleExist && handleExist.email !== req.user.email) {
            const error = new Error('Nombre de ususario no disponible')
            return res.status(409).json({ error: error.message })
        }

        //actualizar el usuario
        req.user.description = description
        req.user.handle = handle
        req.user.links = links

        await req.user.save()
        res.send('Perfil Actualizado Correctamente')

    } catch (e) {
        const error = new Error('Hubo un error')
        return res.status(500).json({ error: error.message })
    }
}


export const uploadImage = async (req: Request, res: Response) => {

    const form = formidable({ multiples: false })

    try {
        form.parse(req, (error, fields, files) => {
            cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async function (error, result) {
                if (error) {
                    const error = new Error('Hubo un error al subir la imagen')
                    return res.status(500).json({ error: error.message })
                }

                if(result){
                    req.user.image = result.secure_url
                    await req.user.save()
                    res.json({image: result.secure_url})
                }
            })
        })
    } catch (e) {
        const error = new Error('Hubo un error')
        return res.status(500).json({ error: error.message })
    }
}

export const getUserByHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.params
        const user = await User.findOne({handle}).select('-_id -__v -email -password')
        if(!user){
            const error = new Error('El usuario no existe')
            res.status(404).json({error: error.message})
        }
        res.json(user)

    } catch (e) {
        const error = new Error('Hubo un error')
        return res.status(500).json({ error: error.message })
    }
}
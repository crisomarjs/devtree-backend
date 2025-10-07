import { Router } from "express";
import { createAccount, getUser, login, updateProfile } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router()

/** Autenticacion y Registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El Handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('El Password es muy corto, minimo 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('El Password es obligatorio'),
    handleInputErrors,
    login
)

router.get('/user', authenticate, getUser)
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El Handle no puede ir vacio'),
    body('description')
        .notEmpty()
        .withMessage('La descripción no puede ir vacia'),
    handleInputErrors,
    authenticate,
    updateProfile
)

export default router
# ⚙️ DevTree Backend

Backend del proyecto **DevTree**, es una aplicación que permite a los usuarios crear y administrar su propio perfil de enlaces personalizados.  
Este servidor está desarrollado con **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Cloudinary** para el manejo de imágenes, siguiendo una arquitectura modular y escalable.

---

## 🧱 Tecnologías utilizadas

- 🟩 **Node.js**  
- 🚀 **Express**  
- 🟦 **TypeScript**  
- 🍃 **MongoDB** con **Mongoose**
- ☁️ **Cloudinary** para almacenamiento de imágenes
- 🔐 **dotenv** para variables de entorno    
- 🧩 **Arquitectura limpia** con separación de capas (`models`, `handlers`, `middleware`, `utils`)

---

## 📂 Estructura del proyecto

- `config/` → Configuración general (DB, entorno)
- `handlers/` → Controladores o lógica de negocio
- `middleware/` → Middlewares personalizados
- `models/` → Modelos de datos con Mongoose
- `utils/` → Funciones auxiliares
- `router.ts` → Definición de rutas principales
- `server.ts` → Inicialización del servidor Express
---

## ⚙️ Configuración del entorno

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```env
DATABASE_URL = url_database
FRONTEND_URL = url_frontend
JWT_SECRET = palabra_secreta_para_el_jwt
CLOUDINARY_NAME= nombre_de_cloud
CLOUDINARY_API_KEY= api_key_de_cloud
CLOUDINARY_API_SECRET= api_key_secret_de_cloud

```


## 🔗 Repositorios relacionados

- [Frontend - React + TS](https://github.com/crisomarjs/devtree-frontend)
- [Backend - Node + Express + TS + MongoDB](https://github.com/crisomarjs/devtree-backend)

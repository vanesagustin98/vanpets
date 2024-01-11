import express from "express";
import {routerMascotas} from './routes/mascotasRoutes.js';
import {router} from './routes/solicitudAdopcionRoutes.js';
import {routerUser} from './routes/userRouter.js';
import {db} from "./Database/database.js"
import cors from 'cors'
// import bodyParser from 'body-parser'

//Crear instancia de express
const app = express()
app.use(cors())

// app.use(bodyParser.json())
app.use(express.json())

//Verificar conexion a Base de datos
db.authenticate().then(()=>{
    console.log(`Base de datos conectada de manera exitosa`);
}).catch(err=>{
    console.log(`Error al conectarse a la base de datos ::: ${err}`);
})

// Rutas
app.use('/mascotas', routerMascotas);
app.use('/solicitudAdopcion', router);
app.use('/user', routerUser);
//Puerto de Servidor
const PORT = 8000

db.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Servidor inicializado en puerto ${PORT}`);
    })
}).catch(err=>{
    console.log(`Error al sincronizar base de datos ${err}`);
})
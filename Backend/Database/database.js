import Sequelize from "sequelize";

const db = new Sequelize("adopcion_mascotas", "adopcion_mascotas", "mascotas",{
    dialect: "mysql",
    host: "localhost"
})

export {db}
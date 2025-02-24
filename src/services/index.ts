import { Sequelize } from "sequelize-typescript";
import enviroments from "~/config/environment";
import { UsersEntity } from "./users/users.entity";

export const sequelize = new Sequelize({
    host: enviroments.DB_HOST,
    port: enviroments.DB_PORT,
    username: enviroments.DB_USER,
    password: enviroments.DB_PASS,
    database: enviroments.DB_NAME,
    dialect: "mysql",
});

sequelize.addModels([UsersEntity]);

export async function connectDB() {
    try {
        await sequelize.authenticate({});
        console.log("Conectado a la base de datos");
    } catch (err) {
        console.log("Error en la conexion de base de datos", err);
    }
}
export { UsersEntity };

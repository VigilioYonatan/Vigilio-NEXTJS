import enviroments from "~/config/environment";
import { usersSeeders } from "@/users/users.seeder";
import { UsersEntity } from "@/users/users.entity";
import { sequelize } from "..";
import { UnauthorizedException } from "@vigilio/next-api";

export class SeedersService {
    async index() {
        if (enviroments.NODE_ENV === "production") {
            throw new UnauthorizedException("No seed in production mode");
        }
        await sequelize.sync({ force: true }); //elimina todas las tablas
        try {
            await Promise.all([UsersEntity.bulkCreate(usersSeeders)]);
            return { success: true, message: "seed executed succelly" };
        } catch (error) {
            throw new UnauthorizedException(
                `No seed ${(error as Error).message}`
            );
        }
    }
}

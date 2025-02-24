import { UsersEntity } from "~/services";
import { UsersStoreDto } from "./dtos/users.store.dto";
import { BadRequestException, NotFoundException } from "~/decorator";
import { UsersUpdateDto } from "./dtos/users.update.dto";
import { Op } from "sequelize";

export class UsersService {
    async index() {
        const users = await UsersEntity.findAll();
        return { success: true, users };
    }

    async show(id: string) {
        const user = await UsersEntity.findByPk(id);
        if (!user) {
            throw new NotFoundException(`No se encontró un usuario ${id}`);
        }
        return { success: true, user };
    }

    async store(body: UsersStoreDto) {
        const [existUserWithEmal] = await Promise.all([
            UsersEntity.findOne({ where: { email: body.email } }),
        ]);
        if (existUserWithEmal) {
            throw new BadRequestException(
                `Ya existe un usuario con el email ${body.email}`
            );
        }
        const user = new UsersEntity(body);
        await user.save();
        return { success: true, user };
    }

    async update(id: string, body: UsersUpdateDto) {
        const { user } = await this.show(id);
        console.log({ body });

        const [existUserWithEmal] = await Promise.all([
            UsersEntity.findOne({
                where: {
                    email: body.email,
                    [Op.not]: {
                        // que busque un usuario que no tenga mismo  email, que omita el mio
                        id: user.id,
                    },
                },
            }),
        ]);
        if (existUserWithEmal) {
            throw new BadRequestException(
                `Ya existe un usuario con el email ${body.email}`
            );
        }
        await user.update(body);
        return { success: true, user };
    }
    async destroy(id: string) {
        const { user } = await this.show(id);
        await user.destroy();
        return { success: true, message: "Usuario eliminado correctamente" };
    }
}

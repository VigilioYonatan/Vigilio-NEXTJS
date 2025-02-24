import { UsersService } from "./users.service";
import { objectAsync, string } from "@vigilio/valibot";
import {
    Body,
    Delete,
    Get,
    HttpCode,
    Injectable,
    Param,
    Post,
    Put,
} from "@vigilio/next-api";
import { Pipe, Validator } from "@vigilio/next-api/validator/valibot";
import { type UsersUpdateDto, usersUpdateDto } from "./dtos/users.update.dto";
import { type UsersStoreDto, usersStoreDto } from "./dtos/users.store.dto";

@Injectable()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("/users")
    async index() {
        const result = await this.usersService.index();
        return result;
    }

    @Pipe(objectAsync({ id: string() }))
    @Get("/users/:id")
    async show(@Param("id") id: string) {
        const result = await this.usersService.show(id);
        return result;
    }

    @HttpCode(201)
    @Validator(usersStoreDto)
    @Post("/users")
    async store(@Body() body: UsersStoreDto) {
        const result = await this.usersService.store(body);
        return result;
    }

    @HttpCode(201)
    @Validator(usersUpdateDto)
    @Pipe(objectAsync({ id: string() }))
    @Put("/users/:id")
    async update(@Body() body: UsersUpdateDto, @Param("id") id: string) {
        const result = await this.usersService.update(id, body);
        return result;
    }

    @Pipe(objectAsync({ id: string() }))
    @Delete("/users/:id")
    async destroy(@Param("id") id: string) {
        const result = await this.usersService.destroy(id);
        return result;
    }
}

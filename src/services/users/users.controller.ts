import { Body, Delete, Get, HttpCode, Param, Post, Put } from "~/decorator";
import { UsersService } from "./users.service";
import { Injectable } from "~/decorator/decorators/injectable.decorator";
import { Pipe, Validator } from "~/decorator/validator/valibot";
import { objectAsync, string } from "@vigilio/valibot";
import { type UsersStoreDto, usersStoreDto } from "./dtos/users.store.dto";
import { type UsersUpdateDto, usersUpdateDto } from "./dtos/users.update.dto";

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

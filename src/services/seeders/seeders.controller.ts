import { Get, Injectable } from "@vigilio/next-api";
import { SeedersService } from "./seeders.service";

@Injectable()
export class SeedersController {
    constructor(private readonly seedersService: SeedersService) {}

    @Get("/seed")
    async index() {
        const result = await this.seedersService.index();
        return result;
    }
}

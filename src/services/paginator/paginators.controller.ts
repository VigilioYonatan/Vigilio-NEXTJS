import { Injectable } from "~/decorator/decorators/injectable.decorator";
import { custom, objectAsync, string } from "@vigilio/valibot";
import type { Request } from "express";
import { Pipe } from "~/decorator/validator/valibot";
import { PaginatorService } from "./paginators.service";
import { paginatorModel, type PaginatorModel } from "./libs";
import { Get, Param, Query, Req } from "~/decorator";

@Injectable()
export class PaginatorController {
    constructor(private readonly paginatorServices: PaginatorService) {}

    @Pipe(
        objectAsync({
            model: string([
                custom(
                    (val) => paginatorModel.includes(val as PaginatorModel),
                    "Modelo no válido"
                ),
            ]),
        })
    )
    @Get("/paginator/:model")
    async index(
        @Param("model") model: PaginatorModel,
        @Query()
        query: {
            offset: string;
            limit: string;
            search: string;
        } & Record<string, string>,
        @Req() req: Request
    ) {
        const result = await this.paginatorServices.index({
            model,
            query,
            req,
        });
        return result;
    }
}

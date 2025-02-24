import { custom, objectAsync, string } from "@vigilio/valibot";
import { paginatorModel, type PaginatorModel } from "./libs";
import { PaginatorService } from "./paginators.service";
import type { Request } from "express";
import { Get, Injectable, Param, Query, Req } from "@vigilio/next-api";
import { Pipe } from "@vigilio/next-api/validator/valibot";

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

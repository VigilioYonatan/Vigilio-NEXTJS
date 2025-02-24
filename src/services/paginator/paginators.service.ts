import { type PaginatorModel } from "./libs";
import { Op, type WhereOptions } from "sequelize";
import type { Request } from "express";
import { Injectable } from "~/decorator/decorators";
import { InternalServerErrorException } from "~/decorator";
import { UsersEntity } from "@/users/users.entity";

@Injectable()
export class PaginatorService {
    async index(props: {
        model: PaginatorModel;
        query: {
            offset: string;
            limit: string;
            search: string;
        } & Record<string, string>;
        req: Request;
    }) {
        const {
            limit = "20",
            offset = "0",
            search = "",
            params,
            ...rest
        } = props.query;
        const offsetConverted = Number(offset);
        const limitConverted = Number(limit);
        let data = null;

        const searchLowerCase = `${search.toLowerCase()}%`;

        switch (props.model) {
            case "users":
                {
                    let where: WhereOptions = {
                        name: {
                            [Op.like]: searchLowerCase,
                        },
                    };

                    data = await Promise.all([
                        UsersEntity.findAll({
                            offset: offsetConverted,
                            limit: limitConverted,
                            where,
                            order: Object.entries(rest),
                        }),
                        UsersEntity.count({
                            where,
                        }),
                    ]);
                }
                break;

            default: {
                throw new InternalServerErrorException(
                    "Comunicarse con el desarrollador "
                );
            }
        }
        const next = `/api/paginator/${props.model}?offset=${
            offsetConverted + limitConverted
        }&limit=${limitConverted}`;
        const offsetTotal = offsetConverted - limitConverted;
        const back = `/api/paginator/${props.model}?offset=${offsetTotal}&limit=${limitConverted}`;

        return {
            success: true,
            count: data[1],
            next,
            previous: offsetTotal >= 0 ? back : null,
            results: data[0],
        };
    }
}

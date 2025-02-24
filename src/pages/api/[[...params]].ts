import { UsersController } from "@/users/users.controller";
import { SeedersController } from "@/seeders/seeders.controller";
import { PaginatorController } from "@/paginator/paginators.controller";
import { createHandler } from "@vigilio/next-api";
export const config = {
    api: {
        bodyParser: false,
    },
};

export default createHandler(
    [SeedersController, PaginatorController, UsersController],
    true
);

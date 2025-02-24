import { createHandler } from "~/decorator";
import { UsersController } from "@/users/users.controller";
import { SeedersController } from "@/seeders/seeders.controller";
import { PaginatorController } from "@/paginator/paginators.controller";

export default createHandler(
    [SeedersController, PaginatorController, UsersController],
    true
);

import { Input, omitAsync } from "@vigilio/valibot";
import { usersSchema } from "../users.schema";

export const usersStoreDto = omitAsync(usersSchema, ["id"]);
export type UsersStoreDto = Input<typeof usersStoreDto>;

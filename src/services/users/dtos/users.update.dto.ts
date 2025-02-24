import { Input, omitAsync } from "@vigilio/valibot";
import { usersSchema } from "../users.schema";

export const usersUpdateDto = omitAsync(usersSchema, ["id"]);
export type UsersUpdateDto = Input<typeof usersUpdateDto>;

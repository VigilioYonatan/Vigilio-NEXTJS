import { filesSchema } from "@/uploads/uploads.schema";
import {
	array,
	Input,
	literal,
	number,
	objectAsync,
	string,
	union,
	maxLength,
	minLength,
	boolean,
	email,
	maxValue,
	minValue,
	object,
	nullable,
} from "@vigilio/valibot";

export const usersSchema = objectAsync({
	id: number(),
	name: string([minLength(3), maxLength(10)]),
	email: string([email()]),
	age: number([minValue(18), maxValue(120)]),
	role: union([literal("admin"), literal("client")]), // enum : admin|client
	enabled: boolean(),
	hobbies: array(string()),
	address: nullable(object({ zip: string(), code: string() })), // can be a nullable
	photo: nullable(array(filesSchema([100, 400]))),
});
export type UsersSchema = Input<typeof usersSchema>;

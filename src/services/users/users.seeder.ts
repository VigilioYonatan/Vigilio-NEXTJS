import { faker } from "@faker-js/faker";
import { UsersSchema } from "./users.schema";

export const usersSeeders: Omit<UsersSchema, "id">[] = Array.from({
	length: 100,
}).map(() => {
	return {
		name: faker.person.firstName(),
		age: faker.number.int({ max: 100, min: 18 }),
		email: faker.internet.email(),
		address: {
			zip: faker.location.zipCode(),
			code: faker.location.countryCode(),
		},
		enabled: faker.datatype.boolean(),
		hobbies: [faker.music.genre(), faker.music.genre(), faker.music.genre()],
		role: faker.helpers.arrayElement(["admin", "client"]),
		photo: null,
	};
});

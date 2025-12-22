import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const generateMockUsers = async (quantity = 1) => {
const users = [];
const hashedPassword = await bcrypt.hash("coder123", 10);

for (let i = 0; i < quantity; i++) {
    users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: []
    });
}

return users;
};
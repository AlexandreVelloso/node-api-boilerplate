import faker from 'faker';

import UserModel from '../UserModel';

export async function generateUser(name?: string, email?: string) {
    return await UserModel.query()
        .insert({
            name: name ? name : faker.name.firstName(),
            email: email ? email : faker.internet.email(),
            password: faker.internet.password(10),
            refresh_token: faker.random.word(),
        });
}

export async function generateUserWithDefaultPassword(name?: string, email?: string) {
    return await UserModel.query()
        .insert({
            name: name ? name : faker.name.firstName(),
            email: email ? email : faker.internet.email(),
            password: '1234',
            refresh_token: faker.random.word(),
        });
}
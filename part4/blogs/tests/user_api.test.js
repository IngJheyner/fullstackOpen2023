import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import helper from "./test_helper.test.js";

const api = supertest(app);

import User from "../models/user.js";

// Antes de cada test, se vacía la base de datos y se añaden dos blogs de ejemplo
beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe("when there is initially one user in db", () => {

    test("creation succeeds with a fresh username", async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test("Validation password length", async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test("User are added correctly", async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'miguel',
            name: 'Miguel',
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)

    })
});

afterAll(() => {
    mongoose.connection.close()
})
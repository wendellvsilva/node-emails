const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../modules/express.js");
const UserModel = require("../src/models/user.model.js"); 

jest.mock("../src/models/user.model"); 

describe("User API", () => {
  beforeAll(async () => {
    mongoose.connect = jest.fn(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("GET /users - deve retornar uma lista de usuários", async () => {
    const users = [{ name: "User 1" }, { name: "User 2" }];
    UserModel.find.mockResolvedValue(users);

    const res = await request(app).get("/users");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(users);
  });

  it("POST /users - deve criar um novo usuário", async () => {
    const newUser = { name: "User 1", email: "user1@example.com", password: "password123" };
    UserModel.create.mockResolvedValue(newUser);

    const res = await request(app).post("/users").send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(newUser);
  });

  it("GET /users/:id - deve retornar um usuário por ID", async () => {
    const user = { _id: "1", name: "User 1" };
    UserModel.findById.mockResolvedValue(user);

    const res = await request(app).get("/users/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(user);
  });

  it("PATCH /users/:id - deve atualizar um usuário por ID", async () => {
    const updatedUser = { _id: "1", name: "User 1 Updated" };
    UserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const res = await request(app).patch("/users/1").send({ name: "User 1 Updated" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedUser);
  });

  it("DELETE /users/:id - deve remover um usuário por ID", async () => {
    const deletedUser = { _id: "1", name: "User 1" };
    UserModel.findByIdAndRemove.mockResolvedValue(deletedUser);

    const res = await request(app).delete("/users/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(deletedUser);
  });
});
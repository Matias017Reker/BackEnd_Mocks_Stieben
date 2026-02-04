import { expect } from "chai";
import supertest from "supertest";
import { UserModel } from "../src/models/User.js";
import { PetModel } from "../src/models/Pet.js";
import { AdoptionModel } from "../src/models/Adoption.js";

import app from "../src/app.js";

const requester = supertest(app);

describe("Adoption Router - Functional Tests", function () {

    let userId;
    let petId;
    let adoptionId;

    this.timeout(10000);

    beforeEach(async function () {
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
    await AdoptionModel.deleteMany({});

    const user = await UserModel.create({
        first_name: "Test",
        last_name: "User",
        email: "test@test.com",
        password: "1234"
    });

    const pet = await PetModel.create({
        name: "Firulais",
        specie: "dog"
    });

    userId = user._id.toString();
    petId = pet._id.toString();
    });

    it("POST /api/adoptions debe crear una adopción", async function () {
    const response = await requester.post("/api/adoptions").send({
        ownerId: userId,
        petId: petId
    });

    expect(response.status).to.equal(201);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.have.property("_id");

    adoptionId = response.body.payload._id;
    });

    it("GET /api/adoptions debe listar adopciones", async function () {
    await AdoptionModel.create({
        owner: userId,
        pet: petId
    });

    const response = await requester.get("/api/adoptions");

    expect(response.status).to.equal(200);
    expect(response.body.payload.length).to.be.greaterThan(0);
    });

    it("GET /api/adoptions/:id debe traer una adopción", async function () {
    const adoption = await AdoptionModel.create({
        owner: userId,
        pet: petId
    });

    const response = await requester.get(`/api/adoptions/${adoption._id}`);

    expect(response.status).to.equal(200);
    expect(response.body.payload._id).to.equal(adoption._id.toString());
    });

    it("DELETE /api/adoptions/:id debe eliminar adopción", async function () {
    const adoption = await AdoptionModel.create({
        owner: userId,
        pet: petId
    });

    const response = await requester.delete(`/api/adoptions/${adoption._id}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");

    const exists = await AdoptionModel.findById(adoption._id);
    expect(exists).to.be.null;
    });

});
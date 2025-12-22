import { Router } from "express";
import { generateMockUsers } from "../utils/userMocker.js";
import { generateMockPets } from "../utils/petMocker.js";
import { UserModel } from "../models/User.js";
import { PetModel } from "../models/Pet.js";

const router = Router();

    /**
    * GET /api/mocks/mockingusers
    * Genera 50 usuarios mockeados
    */
router.get("/mockingusers", async (req, res) => {
try {
    const users = await generateMockUsers(50);
    res.json({ status: "success", payload: users });
} catch (error) {
    res.status(500).json({ status: "error", error: error.message });
}
});

    /**
    * GET /api/mocks/mockingpets
    * Genera pet mockeadas
    */
router.get("/mockingpets", (req, res) => {
try {
    const pets = generateMockPets(10);
    res.json({ status: "success", payload: pets });
} catch (error) {
    res.status(500).json({ status: "error", error: error.message });
}
});

router.post("/generateData", async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

    if (isNaN(users) || isNaN(pets)) {
        return res.status(400).json({
            status: "error",
            message: "Los parámetros users y pets deben ser numéricos"
        });
    }

        let insertedUsers = [];
        let insertedPets = [];

    if (users > 0) {
        const mockUsers = await generateMockUsers(users);
        insertedUsers = await UserModel.insertMany(mockUsers);
    }

    if (pets > 0) {
        const mockPets = generateMockPets(pets);
        insertedPets = await PetModel.insertMany(mockPets);
    }

    res.json({
        status: "success",
        usersInserted: insertedUsers.length,
        petsInserted: insertedPets.length
    });
} catch (error) {
    res.status(500).json({
        status: "error",
        error: error.message
    });
    }
});

export default router;
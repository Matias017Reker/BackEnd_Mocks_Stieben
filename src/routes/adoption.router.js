import { Router } from "express";
import mongoose from "mongoose";
import { AdoptionModel } from "../models/Adoption.js";
import { UserModel } from "../models/User.js";
import { PetModel } from "../models/Pet.js";

const router = Router();

/* POST /api/adoptions */

router.post("/", async (req, res) => {
    try {
    const { ownerId, petId } = req.body;

    if (!ownerId || !petId) {
        return res.status(400).json({
        status: "error",
        message: "ownerId y petId son obligatorios"
        });
    }

    if (
        !mongoose.Types.ObjectId.isValid(ownerId) ||
        !mongoose.Types.ObjectId.isValid(petId)
    ) {
        return res.status(400).json({
        status: "error",
        message: "IDs inválidos"
        });
    }

    const owner = await UserModel.findById(ownerId);
    const pet = await PetModel.findById(petId);

    if (!owner || !pet) {
        return res.status(404).json({
        status: "error",
        message: "Usuario o mascota no encontrados"
        });
    }

    const adoption = await AdoptionModel.create({
        owner: ownerId,
        pet: petId
    });

    res.status(201).json({
        status: "success",
        payload: adoption
    });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* GET /api/adoptions */

router.get("/", async (req, res) => {
    try {
    const adoptions = await AdoptionModel.find()
        .populate("owner", "-password")
        .populate("pet");

    res.json({ status: "success", payload: adoptions });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* GET /api/adoptions/:id */

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        status: "error",
        message: "ID inválido"
    });
    }

    try {
    const adoption = await AdoptionModel.findById(id)
        .populate("owner", "-password")
        .populate("pet");

    if (!adoption) {
        return res.status(404).json({
        status: "error",
        message: "Adopción no encontrada"
        });
    }

    res.json({ status: "success", payload: adoption });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* DELETE /api/adoptions/:id */

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        status: "error",
        message: "ID inválido"
    });
    }

    try {
    const deleted = await AdoptionModel.findByIdAndDelete(id);

    if (!deleted) {
        return res.status(404).json({
        status: "error",
        message: "Adopción no encontrada"
        });
    }

    res.json({
        status: "success",
        message: "Adopción eliminada"
    });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

export default router;
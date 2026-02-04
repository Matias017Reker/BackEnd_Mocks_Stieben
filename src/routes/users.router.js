/**
 *   @openapi
 *   components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           example: user
 *         pets:
 *           type: array
 *           items:
 *             type: string
 */


import { Router } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserModel } from "../models/User.js";

const router = Router();

/* GET /api/users */

/**
 *   @openapi
 *   /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

router.get("/", async (req, res) => {
    try {
    const users = await UserModel.find().select("-password");
    res.json({ status: "success", payload: users });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* GET /api/users/:id */

/**
 *   @openapi
 *   /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        status: "error",
        message: "ID inválido"
    });
    }

    try {
    const user = await UserModel.findById(id).select("-password");

    if (!user) {
        return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
        });
    }

    res.json({ status: "success", payload: user });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* POST /api/users */

/**
 *   @openapi
 *   /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       409:
 *         description: Email existente
 */

router.post("/", async (req, res) => {
    try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios"
        });
    }

    const exists = await UserModel.findOne({ email });

    if (exists) {
        return res.status(409).json({
        status: "error",
        message: "El email ya está registrado"
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await UserModel.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
        status: "success",
        payload: userResponse
    });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* PUT /api/users/:id */

/**
 *   @openapi
 *   /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags:
 *       - Users
 */

router.put("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        status: "error",
        message: "ID inválido"
    });
    }

    try {
    const updateData = { ...req.body };

    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    ).select("-password");

    if (!updatedUser) {
        return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
        });
    }

    res.json({ status: "success", payload: updatedUser });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

/* DELETE /api/users/:id */

/**
 *   @openapi
 *   /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags:
 *       - Users
 */

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        status: "error",
        message: "ID inválido"
    });
    }

    try {
    const deleted = await UserModel.findByIdAndDelete(id);

    if (!deleted) {
        return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
        });
    }

    res.json({
        status: "success",
        message: "Usuario eliminado"
    });
    } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
    }
});

export default router;
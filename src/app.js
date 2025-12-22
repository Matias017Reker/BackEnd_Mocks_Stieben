import express from "express";
import { connectDB } from "./config/db.js";
import mocksRouter from "./routes/mocks.router.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/mocks", mocksRouter);

// Test
app.get("/", (req, res) => {
    res.send("Backend mocks funcionando");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
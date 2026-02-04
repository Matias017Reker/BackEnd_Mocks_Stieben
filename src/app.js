import express from "express";
import { connectDB } from "./config/db.js";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger.js";
import adoptionRouter from "./routes/adoption.router.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/adoptions", adoptionRouter);

// Test
app.get("/", (req, res) => {
    res.send("Backend mocks funcionando");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
    });
}
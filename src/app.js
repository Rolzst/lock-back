import express from 'express';
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import servicioRoutes from "./routes/servicio.routes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', authRoutes);
app.use('/api/', servicioRoutes);

export default app;
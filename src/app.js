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
    origin: ['http://localhost:4000',
        'http://localhost:5173',
        process.env.BASE_URL,
        process.env.BASE_URL_FRONTEND],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', authRoutes);
app.use('/api/', servicioRoutes);
app.use('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API',
        version: '1.0.0',
        rutasDisponibles: [
            {endpoint: '/api/register', method: 'POST', description: 'Registra un usuario'},
            {endpoint: '/api/login', method: 'POST', description: 'Inicia sesión'},
        ]
    })
})
export default app;
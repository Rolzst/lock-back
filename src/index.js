import app from "./app.js";
import {connectDB} from "./db.js";

const PORT  = process.env.PORT || 4000;
connectDB();
app.listen(POTR);
console.log('Servidor corriendo en el puerto 4000');

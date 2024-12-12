import {Router} from "express";
import {validateSchema} from "../middlewares/validator.middleware.js";
import {
    createServicio, deleteServicio, getServicios,
} from "../controllers/servicio.controller.js";
import {servicioSchema} from "../schemas/servicio.schemas.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

router.post('/servicio', authRequired, validateSchema(servicioSchema), createServicio);
router.get('/servicio', authRequired, getServicios);
router.delete('/servicio/:id', authRequired, deleteServicio);


export default router;
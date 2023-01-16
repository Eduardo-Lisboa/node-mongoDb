import Express from "express";
import AutorController from "../controllers/autoresControllers.js";

const router = Express.Router();

router.get("/autores", AutorController.listAutor);
router.post("/autores", AutorController.createAutor);
router.put("/autores/:id", AutorController.updateAutor);
router.get("/autores/:id", AutorController.searchAutor);
router.delete("/autores/:id", AutorController.deleteAutor);

export default router;

import Express from "express";
import LivroController from "../controllers/livrosController.js";

const router = Express.Router();

router.get("/livros", LivroController.listLivros);
router.post("/livros", LivroController.createLivro);
router.put("/livros/:id", LivroController.updateLivro);
router.get("/livros/:id", LivroController.searchLivro);
router.delete("/livros/:id", LivroController.deleteLivro);

export default router;

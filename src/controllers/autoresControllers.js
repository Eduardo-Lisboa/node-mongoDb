import autores from "../models/Autor.js";

class AutorController {
    static async listAutor(req, res) {
        try {
            const autoresList = await autores.find();
            res.status(200).json(autoresList);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createAutor(req, res) {
        const autor = new autores({
            nome: req.body.nome,
            nacionalidade: req.body.nacionalidade,
        });

        try {
            const newLivro = await autor.save();
            res.status(201).json(newLivro);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async updateAutor(req, res) {
        try {
            const autor = await autores.findById(req.params.id);
            if (autor == null) {
                return res
                    .status(404)
                    .json({ message: "Livro não encontrado" });
            }

            if (req.body.titulo != null) {
                autor.titulo = req.body.titulo;
            }

            const livroAtualizado = await autor.save();
            res.status(200).json(livroAtualizado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async deleteAutor(req, res) {
        try {
            const autor = await autores.findById(req.params.id);
            if (autor == null) {
                return res
                    .status(404)
                    .json({ message: "Livro não encontrado" });
            }

            await autor.remove();
            res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async searchAutor(req, res) {
        const autor = await autores.findById(req.params.id);
        if (autor == null) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json(autor);
    }
}

export default AutorController;

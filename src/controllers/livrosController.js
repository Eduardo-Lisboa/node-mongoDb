import livros from "../models/livro.js";

class LivroController {
    static async listLivros(req, res) {
        try {
            const livrosList = await livros.find();
            res.status(200).json(livrosList);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createLivro(req, res) {
        const livro = new livros({
            titulo: req.body.titulo,
            autor: req.body.autor,
            editora: req.body.editora,
            numeroPaginas: req.body.numeroPaginas,
        });

        try {
            const newLivro = await livro.save();
            res.status(201).json(newLivro);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async updateLivro(req, res) {
        try {
            const livro = await livros.findById(req.params.id);
            if (livro == null) {
                return res
                    .status(404)
                    .json({ message: "Livro não encontrado" });
            }

            if (req.body.titulo != null) {
                livro.titulo = req.body.titulo;
            }
            if (req.body.autor != null) {
                livro.autor = req.body.autor;
            }
            if (req.body.editora != null) {
                livro.editora = req.body.editora;
            }
            if (req.body.numeroPaginas != null) {
                livro.numeroPaginas = req.body.numeroPaginas;
            }

            const livroAtualizado = await livro.save();
            res.status(200).json(livroAtualizado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async deleteLivro(req, res) {
        try {
            const livro = await livros.findById(req.params.id);
            if (livro == null) {
                return res
                    .status(404)
                    .json({ message: "Livro não encontrado" });
            }

            await livro.remove();
            res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async searchLivro(req, res) {
        const livro = await livros.findById(req.params.id);
        if (livro == null) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    }
}

export default LivroController;

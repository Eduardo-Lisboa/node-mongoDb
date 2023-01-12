import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/livro.js";

db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("curso de node");
});

app.get("/livros", (res) => {
    livros.find((err, livros) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.status(200).json(livros);
    });
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).json("livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
    let index = buscaLivro(req.params.id);
    index.titulo = req.body.titulo;
    res.status(200).json("livro atualizado com sucesso");
});

app.get("/livros/:id", (req, res) => {
    let index = buscaLivro(req.params.id);
    res.json(index);
});

app.delete("/livros/:id", (req, res) => {
    let { id } = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.status(200).json("livro deletado com sucesso");
});

function buscaLivro(id) {
    return livros.find((livro) => livro.id == id);
}
export default app;

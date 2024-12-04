import { db } from "../db.js";

export const getTask = (_, res) => {
    const q = "SELECT * FROM tarefas"

    db.query(q, (err, data) => {

        if (err) {
            return res.json(err)
        }

        return res.status(200).json(data)

    })
}

// Controller para adicionar tarefas
export const addTask = (req, res) => {
    // A consulta SQL para inserir uma nova tarefa
    const q = 'INSERT INTO tarefas(`id_usuario`, `descricao`, `setor`, `prioridade`, `status`) VALUES(?)';

    // Os valores que serão inseridos na tabela
    const values = [
        req.body.id_usuario,
        req.body.descricao,
        req.body.setor,
        req.body.prioridade,
        req.body.status || 'a fazer' // Define "a fazer" como status padrão caso não seja informado
    ];

    // Executa a consulta no banco de dados
    db.query(q, [values], (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json("Tarefa cadastrada com sucesso!");
    });
};

// Controller para deletar uma tarefa pelo id
export const deleteTask = (req, res) => {
    const tarefaId = req.params.id;

    const q = 'DELETE FROM tarefas WHERE id = ?';

    db.query(q, [tarefaId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        return res.status(200).json({ message: 'Tarefa deletada com sucesso!' });
    });
};

// Controller para atualizar uma tarefa pelo id
export const updateTask = (req, res) => {
    const tarefaId = req.params.id;
    const { descricao, setor, prioridade, status } = req.body;

    const q = `UPDATE tarefas SET descricao = ?, setor = ?, prioridade = ?, status = ? WHERE id = ?`;

    db.query(q, [descricao, setor, prioridade, status, tarefaId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        return res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
    });
};


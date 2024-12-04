import {db} from "../db.js";

export const  getUsers =  (_, res) => {
    const q = "SELECT * FROM usuarios"

    db.query(q, (err, data) => {

        if(err){
            return res.json(err)
        }

        return res.status(200).json(data)

    })
}

// Controlador de usuários
export const getUserById = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT nome FROM usuarios WHERE id_usuario = ?";

    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        
        if (data.length > 0) {
            return res.status(200).json(data[0]);
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    });
};


export const addUsers = (req, res) => {

    const q = 'INSERT INTO usuarios(`nome`, `email`) VALUES(?)';

    const values = [
        req.body.nome,
        req.body.email,
    ];

    db.query(q, [values], (err) =>{

        if(err){
            return res.json(err);
        }

        return res.status(200).json("Usuario cadastrado com sucesso!");
    })
}


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Task() {

  const [descricao, setDescricao] = useState('');
  const [setor, setSetor] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('a fazer');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao carregar a lista de usuários.');
      });
  }, []);

 
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!descricao || !setor || !nomeUsuario || !prioridade) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }


    const tarefa = {
      id_usuario: nomeUsuario,
      descricao,
      setor,
      prioridade,
      status,
    };

   
    axios.post('http://localhost:3000/task/task', tarefa)
      .then((response) => {
        setMensagem(response.data); 
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar a tarefa:', error);
        setMensagem('Erro ao cadastrar usuário. Tente novamente.');

      });
  };

  return (
    <div className="container mt-4">
     
      <h3>Cadastro de Tarefas</h3>
      
      <form className="mt-3" onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            placeholder="Digite a descrição da tarefa"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        
        <div className="mb-3">
          <label htmlFor="setor" className="form-label ">Setor</label>
          <input
            type="text"
            className="form-control"
            id="setor"
            placeholder="Digite o setor responsável"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          />
        </div>

     
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Usuário</label>
          <select
            className="form-select"
            id="nome"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          >
            <option value="" disabled>Selecione um nome</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="prioridade" className="form-label">Prioridade</label>
          <select
            className="form-select"
            id="prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="" disabled>Selecione a prioridade</option>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

    
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    
      {mensagem && (
        <div className="mt-3 alert alert-info" role="alert">
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default Task;

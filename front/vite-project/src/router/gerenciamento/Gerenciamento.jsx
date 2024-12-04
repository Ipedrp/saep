import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Gerenciamento() {
    const [tarefas, setTarefas] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});
    const [tarefaEditada, setTarefaEditada] = useState(null);
    const [formEditado, setFormEditado] = useState(null);
    const [mensagem, setMensagem] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3000/task/task')
            .then((response) => {
                setTarefas(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar tarefas:', error);
                alert('Erro ao carregar as tarefas.');
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then((response) => {
                const usuariosMap = {};
                response.data.forEach(user => {
                    usuariosMap[user.id_usuario] = user.nome;
                });
                setUsuarios(usuariosMap);
            })
            .catch((error) => {
                console.error('Erro ao buscar usuários:', error);
                setMensagem('Erro ao carregar os usuários.');
            });
    }, []);

    const atualizarStatus = (id, status) => {
        axios.put(`http://localhost:3000/task/task/${id}`, { status })
            .then((response) => {
                setMensagem('Status atualizado com sucesso!');
                setTarefas(tarefas.map(t => t.id === id ? { ...t, status } : t));
            })
            .catch((error) => {
                console.error('Erro ao atualizar o status:', error);
                setMensagem('Erro ao atualizar o status.');
            });
    };

    const excluirTarefa = (id) => {
        axios.delete(`http://localhost:3000/task/task/${id}`)
            .then((response) => {
                setMensagem('Tarefa deletada com sucesso!');
                setMensagem(tarefas.filter(tarefa => tarefa.id !== id));
            })
            .catch((error) => {
                console.error('Erro ao deletar a tarefa:', error);
                setMensagem('Erro ao deletar a tarefa.');
            });
    };

    const iniciarEdicao = (tarefa) => {
        setFormEditado({ ...tarefa });
        setTarefaEditada(tarefa.id);
    };

    const salvarEdicao = () => {
        axios.put(`http://localhost:3000/task/task/${tarefaEditada}`, formEditado)
            .then((response) => {
                setMensagem('Tarefa editada com sucesso!');
                setTarefas(tarefas.map(t => t.id === tarefaEditada ? formEditado : t));
                setFormEditado(null);
                setTarefaEditada(null);
            })
            .catch((error) => {
                console.error('Erro ao editar a tarefa:', error);
                setMensagem('Erro ao salvar as alterações.');
            });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormEditado({ ...formEditado, [name]: value });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Gerenciamento de Tarefas</h3>


            <div className="row">
                {['a fazer', 'fazendo', 'pronto'].map((status) => (
                    <div key={status} className="col-md-4">
                        <h4 className={`text-${status === 'a fazer' ? 'info' : status === 'fazendo' ? 'warning' : 'success'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</h4>
                        <div className="list-group">
                            {tarefas.filter((tarefa) => tarefa.status === status).map((tarefa) => (
                                <div key={tarefa.id} className="list-group-item">
                                    <p className="mb-1"><strong>Descrição</strong> {tarefa.descricao}</p>
                                    <p className="mb-1"><strong>Setor:</strong> {tarefa.setor}</p>
                                    <p className="mb-1"><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                                    <p className="mb-1"><strong>Usuário:</strong> {usuarios[tarefa.id_usuario] || 'Desconhecido'}</p>
                                    <button
                                        className="btn btn-primary me-2 mb-1"
                                        onClick={() => iniciarEdicao(tarefa)}
                                    >
                                        Editar Dados
                                    </button>
                                    <button
                                        className="btn btn-primary mb-1"
                                        onClick={() => excluirTarefa(tarefa.id)}
                                    >
                                        Deletar
                                    </button>
                                    <div className="mb-2">
                                        <label className="form-check-label me-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedStatus[tarefa.id] === 'a fazer'}
                                                onChange={() => setSelectedStatus({ ...selectedStatus, [tarefa.id]: 'a fazer' })}
                                            />
                                            A fazer
                                        </label>
                                        <label className="form-check-label me-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedStatus[tarefa.id] === 'fazendo'}
                                                onChange={() => setSelectedStatus({ ...selectedStatus, [tarefa.id]: 'fazendo' })}
                                            />
                                            Fazendo
                                        </label>
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedStatus[tarefa.id] === 'pronto'}
                                                onChange={() => setSelectedStatus({ ...selectedStatus, [tarefa.id]: 'pronto' })}
                                            />
                                            Pronto
                                        </label>
                                    </div>
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => {
                                            if (selectedStatus[tarefa.id]) {
                                                atualizarStatus(tarefa.id, selectedStatus[tarefa.id]);
                                            } else {
                                                setMensagem('Por favor, selecione um status para atualizar.');
                                            }
                                        }}
                                    >
                                        Alterar Status
                                    </button>
                                    {formEditado && formEditado.id === tarefa.id && (
                                        <div className="mt-3">
                                            <h5 className="text-primary">Editar Tarefa</h5>
                                            <form>
                                                <div className="mb-2">
                                                    <label className="form-label">Descrição</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="descricao"
                                                        value={formEditado.descricao}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Setor</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="setor"
                                                        value={formEditado.setor}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Prioridade</label>
                                                    <select
                                                        className="form-select"
                                                        name="prioridade"
                                                        value={formEditado.prioridade}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="baixa">Baixa</option>
                                                        <option value="media">Média</option>
                                                        <option value="alta">Alta</option>
                                                    </select>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={salvarEdicao}
                                                >
                                                    Salvar Alterações
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {mensagem && (
                <div className="mt-3 alert alert-info" role="alert">
                    {mensagem}
                </div>
            )}
        </div>
    );
}

export default Gerenciamento;

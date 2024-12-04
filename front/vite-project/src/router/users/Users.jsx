import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Users() {
    
    const nomeRef = useRef();
    const emailRef = useRef();
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        
        const nome = nomeRef.current.value;
        const email = emailRef.current.value;

        try {
            const response = await axios.post('http://localhost:3000/', { nome, email });

            setMensagem(response.data); 
            nomeRef.current.value = ''; 
            emailRef.current.value = ''; 
        } catch (err) {
            setMensagem('Erro ao cadastrar usuário. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
          
            <h3>Cadastro de Usuários</h3>

          
            <form className="mt-3" onSubmit={handleSubmit}>
               
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        placeholder="Digite seu nome"
                        ref={nomeRef} 
                        required
                    />
                </div>

                {/* Input E-mail */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Digite seu e-mail"
                        ref={emailRef} 
                        required
                    />
                </div>

                
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>

            {/* Mensagem de feedback */}
            {mensagem && (
                <div className="mt-3 alert alert-info" role="alert">
                    {mensagem}
                </div>
            )}
        </div>
    );
}

export default Users;

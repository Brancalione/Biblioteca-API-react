import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


function Principal(){
    return(
        <div>
            <nav>
                <div >  
                    <ul className="column" >
                        <li><Link to="/">Início</Link> </li>
                        <li><Link to="/buscar">Listar livros</Link> </li>
                        <li><Link to="/buscarporid">Detalhes Livro</Link> </li>
                        <li><Link to="/formcriareditar">Criar/Editar livro</Link></li>
                        <li><Link to="/deletar">Excluir livro</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="column">
                <h1>Biblioteca IFRS</h1>
            </div>
        </div>
    )
}

export default Principal

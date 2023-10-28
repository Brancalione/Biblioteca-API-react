import React, {useState} from "react";
import axios from "axios";
import { ValidarId } from "../Funções/ValidarLivro";
import Principal from "./Principal";

function BuscarPorId(){
    const [book, setBook] = useState({
        id:null,
        title: "",
        description: "",
        pageCount: null,
        excerpt: "",
        publishDate: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (event) => {
        setBook({
          ...book,
          [event.target.name]: event.target.value,
        });
      };

    //Limpar os dados do livro
    const handleClear = () => {
        setBook({
            id:null,
            title: "",
            description: "",
            pageCount: null,
            excerpt: "",
            publishDate: "",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
 
        if(ValidarId(book.id)) return
        
        setIsLoading(false);

        try{
            const response = await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/books/${book.id}` );
            setBook(response.data)
            setIsLoading(true);
        }catch(error){
            alert("Livro não encontrado! Tente outro código.")
            setIsLoading(true);
        }   
    };

    return(
        <div>
            <Principal/>
            <div className="column">
                {isLoading ? (
                    <>
                        <h3>Buscar detalhes de livro</h3>
                        <form onSubmit={handleSubmit}  className="BuscarPorId">
                            <br />
                            <input type="number" name="id" placeholder="Código do livro" min="1" onChange={handleChange} />
                            <br />
                            <button type="submit" className="btn btn-outline-light">Buscar</button>
                            <div>
                                <p className="DadosLivros">Título:</p>
                                <p>{book.title}</p>
                                <p className="DadosLivros">Descrição:</p>
                                <p>{book.description}</p>
                                <p className="DadosLivros">Número de páginas:</p>
                                <p>{book.pageCount}</p>
                                <p className="DadosLivros">Resumo:</p>
                                <p>{book.excerpt}</p>
                                <p className="DadosLivros">Data da publicação:</p>
                                <p>{book.publishDate}</p>
                            </div>
                            <button type="button" onClick={handleClear} className="btn btn-outline-secondary" >Limpar</button>
                        </form>
                    </>
                ) : ( 
                <p className="Carregando">Carregando...</p>  
                )}
            </div>
        </div>
    )
}
export default BuscarPorId
import React, { useState } from "react";
import axios from "axios";
import { ValidarTodosCampos } from "../Funções/ValidarLivro";
import Principal from "./Principal";

function convertDate(dateString) {
    let [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}` 
}
 
function FormCriarEditar() {
    const [book, setBook] = useState({
        id: null,
        title: "",
        description: "",
        pageCount: null,
        excerpt: "",
        publishDate: "",
    });

    //Definir metodo do axios
    const [usarPutOuPost , setUsarPutOuPost] = useState("post")

    //Limpar os dados do livro
    const handleClear = () => {
        setBook({
            id:"",
            title: "",
            description: "",
            pageCount: "",
            excerpt: "",
            publishDate: "",
        });
    };

    //Status de carregamento da requição API
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        let formData = new FormData(event.target);
        let convertedPublishDate = convertDate(book.publishDate);
        setBook({ ...book, publishDate: convertedPublishDate });

        if(ValidarTodosCampos(book.id, book.title, book.description, book.pageCount, book.excerpt, book.publishDate )) {
            return
        }
        setIsLoading(false)

        if (usarPutOuPost === "post"){
            try {
                const response = await axios.post(`https://fakerestapi.azurewebsites.net/api/v1/Books`, book);
                setIsLoading(true)
                alert("Parabéns! Livro inserido com sucesso.");
                handleClear()
            } catch (error) {
                setIsLoading(true)
                alert("Erro ao tentar inserir o livro.\n" + error);
            }
        }else{
            try {
                const response = await axios.put(`https://fakerestapi.azurewebsites.net/api/v1/Books/${book.id}`, book);
                setIsLoading(true)
                alert("Parabéns! Livro editado com sucesso.");
                handleClear()
            } catch (error) {
                setIsLoading(true)
                alert("Erro ao tentar editar o livro.\n" + error);
            }
        }

    }
    return (
        <div >
            <Principal/>
            <div className="column">
                {isLoading ? (
                <div>
                    <h3>Cadastro/Edição de livro</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="number" name="id" placeholder="Código" min="1" value={book.id} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            <input type="text" name="title" placeholder="Título" value={book.title} onChange={handleChange}/>
                        </label>
                        <br />
                        <label>
                            <input type="text" name="description" placeholder="Descrição" value={book.description} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            <input type="number" min="1" name="pageCount" placeholder="Número de páginas" value={book.pageCount} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            <textarea name="excerpt" rows="6" cols="24" placeholder="Resumo" value={book.excerpt} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                        <input type="date" name="publishDate" value={book.publishDate} onChange={handleChange} />
                        </label>
                        <br />
                        <button type="submit" className="btn btn-outline-light" onClick={()=> setUsarPutOuPost("post")} >Criar</button>
                        <button type="submit" className="btn btn-outline-secondary" onClick={()=> setUsarPutOuPost("put")} >Editar</button>
                    </form>
                </div>
                ):(
                    <>
                        <p className="Carregando">Carregando...</p>
                    </>
                )}
            </div>    
        </div>
    );
}

export default FormCriarEditar;
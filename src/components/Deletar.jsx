import React, {useState} from "react";
import { ValidarId } from "../Funções/ValidarLivro";
import  axios  from "axios";
import Principal from "./Principal";

function Deletar(){
    const [book, setBook] = useState ({
        id:null,
        title:"",
        description:"",
        pageCount: null,
        excerpt: "",
        publishDate: ""
    })

    const [isLoading, setLoading] = useState(true) 

    const handleChange = (event) =>{
        setBook({
            ...book,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (ValidarId(book.id)) return

        setLoading(false);

        try{
            const response = await axios.delete(`https://fakerestapi.azurewebsites.net/api/v1/Books/${book.id}` );
            alert("Parabéns! Livro excluído com sucesso.")
            setLoading(true);
        }catch(error){
            alert("Livro não encontrado! Tente outro código.")
            setLoading(true);
        } 
    }

    return(
        <div >
            <Principal/>
            <div className="column"> 
                {isLoading ? (
                    <>
                        <h3>Excluir livro</h3>
                        <form onSubmit={handleSubmit} className="BuscarPorId">
                            <br />
                            <input className="formId" type="number" name="id" placeholder="Código do livro" min="1" onChange={handleChange} />
                            <br />
                            <button class="btn btn-outline-light" type="submit">Excluir</button>
                        </form>
                    </>
                ) : ( 
                    <p className="Carregando">Carregando...</p>  
                )}
            </div>
        </div>
    )
}
export default Deletar
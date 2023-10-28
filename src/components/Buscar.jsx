import React, { useState, useEffect } from "react";
import axios from "axios";
import Principal from "./Principal";

const Buscar = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakerestapi.azurewebsites.net/api/v1/books");
                setBooks(response.data);
                setIsLoading(false);
            } catch (error) {
                alert("Erro ao tentar listar o livros.\n" + error );
                setIsLoading(false);
            }
        };
    fetchData();
    }, []);

    return (
        <div>
            <Principal/>
            <div className="column">
                {/* condiconal de carregamento */}
                {isLoading ? (
                    <p className="Carregando">Carregando...</p>
                ) : (
                    <>
                        <h3 >Todos os livros</h3>
                        <div className="ListaTamanho">
                            <ul className="Listagem">
                                {books.map((book) => (
                                    <p key={book.ID}> 
                                         Nome do Livro: {book.title}
                                    </p>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>    
        </div>
    );
};

export default Buscar;
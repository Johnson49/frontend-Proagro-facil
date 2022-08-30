import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa";
import Linha from "../linhaDaTabela/Linha";
import style from "./style.module.css"

function ExibirPesquisa(){
    const { cpf } = useParams();
    const [registro, setRegistro] = useState([])
   
  
    const request = async (url) => {
     await fetch(url, {
        method: "GET",
        headers:{
            'content-Type': 'application/json'
        }
     })
     .then(res => res.json())
     .then(dados => setRegistro(dados))
     .catch(e => console.log(e))
    }
    
    useEffect(e => {
     const url = `https://api-proagro-facil.herokuapp.com/consultar/cpf/${cpf}`
     request(url)

     }, [cpf]) 

    return(
        <div className={style.container}>
            <BarraPesquisa/>
        <table>
        <thead>
                <tr>
                    <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>&nbsp;</th>
                    </tr>
        </thead>
                <tbody>
  
                {registro.length > 0 && registro.map(doc => <Linha key={doc.id} doc={doc.dados} />)}
                
                
                </tbody>
        </table>
    </div>
    )
}


export default ExibirPesquisa
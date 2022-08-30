import { useEffect, useRef, useState } from "react"
import BarraPesquisa from "../BarraPesquisa/BarraPesquisa"
import Linha from "../linhaDaTabela/Linha"
import Excluir from "../mensagens/excluir/Excluir"
import style from "./style.module.css"

function CorpoDaTabela(){

    const [registros, setRegistros] = useState([])
  
    const request = async (url) => {
        await fetch(url, {
           method: "GET",
           headers:{
               'content-Type': 'application/json'
           }
        })
        .then(res => res.json())
        .then(data => setRegistros(data))
        . catch(e => console.log(e))
       }

   useEffect(e => {
    const url = "https://api-proagro-facil.herokuapp.com/consultar"
    request(url)
    }, []) 

    


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
                {registros.length > 0 &&
                registros.map(doc => <Linha key={doc.id} doc={doc.dados} />)}
                </tbody>
        </table>
    </div>
    )
}

export default CorpoDaTabela
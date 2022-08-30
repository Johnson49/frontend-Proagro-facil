import style from "./style.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";


function Linha({ doc }) {
  const navegacao = useNavigate()
  
  const request = async (url) => {
    await fetch(url, {
      method: "DELETE",
      headers:{
        'content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))}

  const cpf = doc.cpf

   const deletarRegistro = () => {
       const url = `https://api-proagro-facil.herokuapp.com/consultar/deletar/${cpf}`
       request(url)
      //  navegacao("/registros")

       setTimeout(()=>{
          window.location.reload();
       }, 500)
   }

   const editarRedirect = ()=>{
    navegacao(`/registros/editar/${cpf}`)
   }
   const detalhesRedirect = ()=>{
    navegacao(`/registros/detalhes/${cpf}`)
   }
  return (
    <React.Fragment>
      <tr key={doc.email}>
        <td> {doc.nome} </td>
        <td> {doc.email} </td>
        <td>{doc.cpf} </td>
        <td className={style.botoes}>
          <button onClick={deletarRegistro} className={style.excluir}>
            Excluir
          </button>
          <button onClick={editarRedirect} className={style.editar}>
            Editar
          </button>
          <button onClick={detalhesRedirect} className={style.detalhes}>
            Detalhes
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default Linha;

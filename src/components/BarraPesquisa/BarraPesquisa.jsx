import { useState } from "react"
import {useNavigate } from "react-router-dom";
import style from "./style.module.css"
import search from "../../assets/img/search.png"
function BarraPesquisa(){

    const [pesquisa, setPesquisa] = useState("");
    const navegacao = useNavigate()

    const buscador = (e) => {
        e.preventDefault();
        if (!pesquisa) return ;
        navegacao(`/registros/cpf/${pesquisa}`)
        console.log(pesquisa)
        setPesquisa("");
    }
    function mascaraCPF() {
        let cpf = document.getElementById("cpf")
        var v = cpf.value;
      
        if (isNaN(v[v.length - 1])) {
          cpf.value = v.substring(0, v.length - 1);
          return;
        }
      
        let tamanhoCpf = cpf.value.length
        if(tamanhoCpf === 3 || tamanhoCpf === 7){
          cpf.value += "."
        } else if(tamanhoCpf === 11){
          cpf.value += "-"
        }
      
      }


    return(
        <div className={style.areaPesquisa}>
            <form  onSubmit={buscador}>
            <div className={style.campoDePesquisa}>
                        <input type="text" maxLength="14" id="cpf" required onKeyPress={mascaraCPF} value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} placeholder="Buscar registro pelo CPF" />
                    </div>
                    <div className={style.botaoPesquisa}>
                        <button type="submit" > <img src={search} alt="search" /> </button>
                    </div>
            </form>

        </div>
    )
}


export default BarraPesquisa
import style from "./style.module.css"
import waring from "../../../assets/img/waring.png"
import { Link } from "react-router-dom";


function Conflito({cpf}){

    function fecharModal(){
        document.getElementById("fundo").style.display = "none";
    }

    return(
        <div id="fundo" className={style.fundo}>
        <div id="modal" className={style.modal}>
            <div className={style.modalTitulo}> 
                <img src={waring} alt="" />
               
            </div>
            <div className={style.modalInfo}>
                <p>
                Há um conflito com o comunicado de CPF: <strong>
                    {cpf}
                </strong>
                </p>
            </div>
            <div className={style.modalBotao}>
                <button onClick={fecharModal} className={style.fechar}>Fechar</button>

                <Link to={`/registros/detalhes/${cpf}`} >
                <button onClick={fecharModal} id="fechar">Mais detalhes</button>
                </Link>

            </div>
        </div>
    </div>
    )
}

export default Conflito
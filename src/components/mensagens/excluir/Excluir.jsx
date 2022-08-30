import style from "./style.module.css"
import info from "../../../assets/img/info.png"


function Excluir(){
  
    return (
            <div id="fundo" className={style.fundo}>
        <div id="modal" className={style.modal}>
            <div className={style.modalTitulo}> 
                <img src={info} alt="" />
            </div>
            <div className={style.modalInfo}>
                <p>
                    Tem certeza que deseja excluir o registro?
                </p>
            </div>
            <div className={style.modalBotoes}>
                <button onClick={fecharModal} id="fechar">Cancelar</button>
                <button id="fechar"  className={style.btConf} >Sim</button>
            </div>
        </div>
    </div>
    
    )
}

export default Excluir
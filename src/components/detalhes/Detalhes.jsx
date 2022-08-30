import style from "./style.module.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Detalhes(){

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
     .catch()
    }
    
    useEffect(e => {
     const url = `https://api-proagro-facil.herokuapp.com/consultar/cpf/${cpf}`
     request(url)
    }, []) 


    function MarcaRadioButton() {
        var radios = document.getElementsByName("eventoOcorrido");
        const evento = registro[0].dados.eventoOcorrido
    
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].value === evento) {
                radios[i].checked = true;
            }
        }  
    };
    //  if (registro.length > 0){
    //     MarcaRadioButton()
    //  }



    return(
        <div className={style.container}>

        <header>DETALHES</header>
        { registro.length > 0 &&
        <form onLoad={MarcaRadioButton()}>
          <div className={style.grupoInputs}>
            <div className={style.detalhe}>
              <span className={style.titulo}>Comunicado de Perda</span>
            </div>
  
            <div className={style.campos}>
              <div id={style.block} className={style.info}>
                <label htmlFor="nome">Nome completo</label>
                <input
        
                  type="text"
                  maxLength="70"
                  id="nome"
                
                  minLength="3"
                  value={registro[0].dados.nome}
                  name="nome"
                  readOnly={true}
                  autoFocus
                />
              </div>
  
              <div className={style.info}>
                <label htmlFor="email">Email</label>
                <input
           
                  type="text"
                  id="email"
                  value={registro[0].dados.email}
                  maxLength="70"
                  minLength="5"
                  name="email"
                  readOnly={true}
                />
  
                <div className={style.areaAviso}>
                  <span id="pop-erro-email" className={style.modelAvisoErr}>
                    email inválido!!{" "}
                  </span>
                  <span id="pop-suce-email" className={style.modelAvisoSuce}>
                    email válido!!{" "}
                  </span>
                </div>
  
              </div>
  
  
              <div className={style.info}>
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={registro[0].dados.cpf}
                  maxLength="14"
                  readOnly={true}
                />
                <div className={style.areaAviso}>
                  <span id="pop-erro" className={style.modelAvisoErr}>
                    cpf inválido!!{" "}
                  </span>
                  <span id="pop-suce" className={style.modelAvisoSuce}>
                    cpf válido!!{" "}
                  </span>
                </div>
              </div>
  
              <div className={style.info}>
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  maxLength="50"
                  id="latitude"
                  minLength="2"
                  value={registro[0].dados.latitude}
                  name="latitude"
                  readOnly={true}
                />
                 <div className={style.areaAviso}>
                  <span id="pop-erro-latitude" className={style.modelAvisoErr}>
                    latitude inválido!!{" "}
                  </span>
                  <span id="pop-suce-latitude" className={style.modelAvisoSuce}>
                    latitude válido!!{" "}
                  </span>
                </div>
              </div>
  
              <div className={style.info}>
                <label htmlFor="longitude">Longitude </label>
                <input
                  type="text"
                  maxLength="50"
                  value={registro[0].dados.longitude}
                  id="longitude"
                  minLength="2"
                  name="longitude"
                  readOnly={true}
                />
                <div className={style.areaAviso}>
                  <span id="pop-erro-longitude" className={style.modelAvisoErr}>
                    longitude inválido{" "}
                  </span>
                  <span id="pop-suce-longitude" className={style.modelAvisoSuce}>
                    longitude válido{" "}
                  </span>
                </div>
              </div>
  
              <div className={style.info}>
                <label htmlFor="tipoLavoura">Tipo da lavoura </label>
                <input
                  type="text"
                  id="tipoLavoura"
                  value={registro[0].dados.tipoDaLavoura}
                  maxLength="50"
                  minLength="3"
                  name="tipoDaLavoura"
                  readOnly={true}
                />
              </div>
  
              <div className={style.info}>
                <label htmlFor="datadaColheita">Data da Colheita</label>
                <input
                  type="date"
                  value={registro[0].dados.dataDaColheita}
                  name="dataDaColheita"
                  readOnly={true}
                />
              </div>
  
            </div>
          </div>
  
  
          <div className={style.areaRadio}>
          <span className={style.titulo}>Evento ocorrido</span>
  
          <div className={style.grupoRadio}>
  
          <div className={style.eventoInput}>
                <input

                  type="radio"
                  name="eventoOcorrido"
                  value="chuva excessiva"
                  id="chuva"
                  readOnly={true}
                />
                <label htmlFor="chuva">Chuva excessiva</label>
              </div>
  
              <div className={style.eventoInput}>
                <input
                readOnly={true}
                  type="radio"
                  name="eventoOcorrido"
                  value="geada"
                  id="geada"
                />
                <label htmlFor="geada">Geada</label>
              </div>
  
              <div className={style.eventoInput}>
                <input
                  type="radio"
                  readOnly={true}
                  name="eventoOcorrido"
                  value="granizo"
                  id="granizo"
                />
                <label htmlFor="granizo">Granizo</label>
              </div>
  
              <div className={style.eventoInput}>
                <input
                  type="radio"
                  readOnly={true}
                  name="eventoOcorrido"
                  value="seca"
                  id="seca"
                />
                <label htmlFor="seca">Seca</label>
              </div>
  
              <div className={style.eventoInput}>
                <input
                  type="radio"
                  name="eventoOcorrido"
                  readOnly={true}
                  value="vendaval"
                  id="vendaval"
                />
                <label htmlFor="vendaval">Vendaval</label>
              </div>
  
              <div className={style.eventoInput}>
                <input
                  type="radio"
                  name="eventoOcorrido"
                  readOnly={true}
                  value="raio"
                  id="raio"
                />
                <label htmlFor="raio">Raio</label>
              </div>
          </div>
          </div>
          <div className={style.grupoBotoes}>
          <Link to="/registros">
            <button id={style.voltar} type="button">
            Voltar
            </button>
            </Link>

          </div>
        </form>
}
      </div>
    )
}


export default Detalhes
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validadeCPF } from "../../validation/validadeCPF";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { Formulahaversine } from "../../validation/FormulaHaversine";
import Conflito from "../mensagens/conflito/Conflito";

function Cadastro() {
  let [bloqueiarEnvio, setbloqueiarEnvio] = useState(true);
  const navegacao = useNavigate();

  function vereficaCPF() {
    let cpf = document.getElementById("cpf").value;

    if (cpf) {
      let resultado = validadeCPF(cpf);
      if (!resultado) {
        document.getElementById("pop-suce").style.display = "none";
        document.getElementById("pop-erro").style.display = "block";
        setbloqueiarEnvio(true);
      } else {
        document.getElementById("pop-erro").style.display = "none";
        document.getElementById("pop-suce").style.display = "block";
        setbloqueiarEnvio(false);
      }
    } else {
      document.getElementById("pop-erro").style.display = "none";
    }
  }

  function vereficaEmail(e) {
    let email = document.getElementById("email").value;

    let padrao = /^[\w._-]+@[\w_.-]+\.[\w]/gi;
    if (email) {
      if (email.match(padrao)) {
        document.getElementById("pop-erro-email").style.display = "none";
        document.getElementById("pop-suce-email").style.display = "block";
        setbloqueiarEnvio(false);
      } else {
        document.getElementById("pop-suce-email").style.display = "none";
        document.getElementById("pop-erro-email").style.display = "block";
        setbloqueiarEnvio(true);
      }
    } else {
      document.getElementById("pop-erro-email").style.display = "none";
    }
  }

  function mascaraCPF() {
    let cpf = document.getElementById("cpf");
    var v = cpf.value;

    if (isNaN(v[v.length - 1])) {
      cpf.value = v.substring(0, v.length - 1);
      return;
    }

    let tamanhoCpf = cpf.value.length;
    if (tamanhoCpf === 3 || tamanhoCpf === 7) {
      cpf.value += ".";
    } else if (tamanhoCpf === 11) {
      cpf.value += "-";
    }
  }

  function validaLatitude() {
    const padrao = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/;

    const latitude = document.getElementById("latitude").value;

    if (latitude) {
      if (latitude.match(padrao)) {
        document.getElementById("pop-erro-latitude").style.display = "none";
        document.getElementById("pop-suce-latitude").style.display = "block";
      } else {
        document.getElementById("pop-suce-latitude").style.display = "none";
        document.getElementById("pop-erro-latitude").style.display = "block";
      }
    } else {
      document.getElementById("pop-suce-latitude").style.display = "none";
      document.getElementById("pop-erro-latitude").style.display = "none";
    }
  }

  function validaLongitude() {
    const padrao = /[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    const longitude = document.getElementById("longitude").value;
    if (longitude) {
      if (longitude.match(padrao)) {
        document.getElementById("pop-erro-longitude").style.display = "none";
        document.getElementById("pop-suce-longitude").style.display = "block";
      } else {
        document.getElementById("pop-suce-longitude").style.display = "none";
        document.getElementById("pop-erro-longitude").style.display = "block";
      }
    } else {
      document.getElementById("pop-erro-longitude").style.display = "none";
    }
  }

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    latitude: "",
    longitude: "",
    tipoDaLavoura: "",
    dataDaColheita: "",
    eventoOcorrido: "",
  });

  const dadosFormulario = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const request = async (url) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then()
      .catch();
  };

  const [doc, setDoc] = useState([]);

  const requestTodosDocs = async (url) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDoc(data))
      .catch((e) => console.log(e));
  };

  useEffect((e) => {
    const url = "https://api-proagro-facil.herokuapp.com/consultar";
    requestTodosDocs(url);
  }, []);

  // console.log(doc)
  const [conflito, setConflito] = useState("");
  var NaoBloquearCadastro = Boolean;

  const EnviarDados = (e) => {
    e.preventDefault();
    const url = "https://api-proagro-facil.herokuapp.com/registrar";

    doc.map((e) => {
      if (e.dados.dataDaColheita === form.dataDaColheita) {
        console.log("DAta aqui.")
        const resultado = Formulahaversine(
          e.dados.latitude,
          e.dados.longitude,
          form.latitude,
          form.longitude
        ).toFixed(2);
        if (resultado <= 10) {
          if (e.dados.eventoOcorrido != form.eventoOcorrido) {
            setConflito(e.dados.cpf);
           
            document.getElementById("fundo").style.display = "block";
            NaoBloquearCadastro = false;
          }
        }
      }
    });

    if (NaoBloquearCadastro) {

      request(url);
      setTimeout(() => {
        navegacao("/registros");
      }, 300);
    }
  };

  return (
    <div className={style.container}>
      <Conflito cpf={conflito} />
      <header>REGISTRO</header>
      <form onSubmit={EnviarDados}>
        <div className={style.grupoInputs}>
          <div className={style.detalhe}>
            <span className={style.titulo}>Comunicado de Perda</span>
          </div>

          <div className={style.campos}>
            <div id={style.block} className={style.info}>
              <label htmlFor="nome">Nome completo</label>
              <input
                onChange={dadosFormulario}
                type="text"
                maxLength="70"
                id="nome"
                minLength="3"
                name="nome"
                autoFocus
                required
              />
            </div>

            <div className={style.info}>
              <label htmlFor="email">Email</label>
              <input
                onChange={dadosFormulario}
                type="text"
                id="email"
                onInput={vereficaEmail}
                maxLength="70"
                minLength="5"
                name="email"
                required
              />

              <div className={style.areaAviso}>
                <span id="pop-erro-email" className={style.modelAvisoErr}>
                  email inv??lido!!{" "}
                </span>
                <span id="pop-suce-email" className={style.modelAvisoSuce}>
                  email v??lido!!{" "}
                </span>
              </div>
            </div>

            <div className={style.info}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                onChange={dadosFormulario}
                onKeyPress={mascaraCPF}
                onInput={vereficaCPF}
                maxLength="14"
                required
              />
              <div className={style.areaAviso}>
                <span id="pop-erro" className={style.modelAvisoErr}>
                  cpf inv??lido!!{" "}
                </span>
                <span id="pop-suce" className={style.modelAvisoSuce}>
                  cpf v??lido!!{" "}
                </span>
              </div>
            </div>

            <div className={style.info}>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                onChange={dadosFormulario}
                onInput={validaLatitude}
                maxLength="50"
                id="latitude"
                minLength="2"
                name="latitude"
                required
              />
              <div className={style.areaAviso}>
                <span id="pop-erro-latitude" className={style.modelAvisoErr}>
                  latitude inv??lido!!{" "}
                </span>
                <span id="pop-suce-latitude" className={style.modelAvisoSuce}>
                  latitude v??lido!!{" "}
                </span>
              </div>
            </div>

            <div className={style.info}>
              <label htmlFor="longitude">Longitude </label>
              <input
                type="text"
                onChange={dadosFormulario}
                onInput={validaLongitude}
                maxLength="50"
                id="longitude"
                minLength="2"
                name="longitude"
                required
              />
              <div className={style.areaAviso}>
                <span id="pop-erro-longitude" className={style.modelAvisoErr}>
                  longitude inv??lido{" "}
                </span>
                <span id="pop-suce-longitude" className={style.modelAvisoSuce}>
                  longitude v??lido{" "}
                </span>
              </div>
            </div>

            <div className={style.info}>
              <label htmlFor="tipoLavoura">Tipo da lavoura </label>
              <input
                type="text"
                onChange={dadosFormulario}
                id="tipoLavoura"
                maxLength="50"
                minLength="3"
                name="tipoDaLavoura"
                required
              />
            </div>

            <div className={style.info}>
              <label htmlFor="datadaColheita">Data da Colheita</label>
              <input
                type="date"
                onChange={dadosFormulario}
                id={style.datadaColheita}
                name="dataDaColheita"
                required
              />
            </div>
          </div>
        </div>

        <div className={style.areaRadio}>
          <span className={style.titulo}>Evento ocorrido</span>

          <div className={style.grupoRadio}>
            <div className={style.eventoInput}>
              <input
                onChange={dadosFormulario}
                type="radio"
                name="eventoOcorrido"
                value="chuva excessiva"
                id="chuva"
                required
              />
              <label htmlFor="chuva">Chuva excessiva</label>
            </div>

            <div className={style.eventoInput}>
              <input
                onChange={dadosFormulario}
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
                name="eventoOcorrido"
                value="granizo"
                onChange={dadosFormulario}
                id="granizo"
              />
              <label htmlFor="granizo">Granizo</label>
            </div>

            <div className={style.eventoInput}>
              <input
                type="radio"
                name="eventoOcorrido"
                onChange={dadosFormulario}
                value="seca"
                id="seca"
              />
              <label htmlFor="seca">Seca</label>
            </div>

            <div className={style.eventoInput}>
              <input
                type="radio"
                onChange={dadosFormulario}
                name="eventoOcorrido"
                value="vendaval"
                id="vendaval"
              />
              <label htmlFor="vendaval">Vendaval</label>
            </div>

            <div className={style.eventoInput}>
              <input
                type="radio"
                name="eventoOcorrido"
                onChange={dadosFormulario}
                value="raio"
                id="raio"
              />
              <label htmlFor="raio">Raio</label>
            </div>
          </div>
        </div>
        <div className={style.grupoBotoes}>
          <button id={style.cancelar} type="button">
            <Link to="/registros">Cancelar</Link>
          </button>
          <button disabled={bloqueiarEnvio} id={style.registrar} type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;

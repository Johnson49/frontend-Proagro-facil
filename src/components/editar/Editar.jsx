import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import style from "./style.module.css"
import { Link } from "react-router-dom";
import { validadeCPF } from "../../validation/validadeCPF";

function Editar(){
    const { cpf } = useParams();
    const [registro, setRegistro] = useState([])
    const navegacao = useNavigate()
   
  
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
    }, []) 
    
    
     
     function vereficaCPF() {
         let cpf = document.getElementById("cpf").value;
         
         if(cpf){
             let resultado = validadeCPF(cpf); 
             console.log(resultado)
             if (!resultado) {
               document.getElementById("pop-suce").style.display = "none";
               document.getElementById("pop-erro").style.display = "block";
                
               } else{
                 document.getElementById("pop-erro").style.display = "none";
                 document.getElementById("pop-suce").style.display = "block";
                 
               }
           } else{
               document.getElementById("pop-erro").style.display = "none";
           }
         }
        
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
         function vereficaEmail(e) {
             let email = document.getElementById("email").value;
         
             let padrao = /^[\w._-]+@[\w_.-]+\.[\w]/gi;
             if (email){
                 if(email.match(padrao)){
                     document.getElementById("pop-erro-email").style.display = "none";
                     document.getElementById("pop-suce-email").style.display = "block";
                     
                 } else{
                     document.getElementById("pop-suce-email").style.display = "none";
                     document.getElementById("pop-erro-email").style.display = "block";
                     
                     
                 }
                 
             } else{ 
                 document.getElementById("pop-erro-email").style.display = "none";
             }
             
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
       
 function validaLatitude() {
 
     const padrao = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/
   
     const latitude = document.getElementById("latitude").value
   
     if(latitude){
       if(latitude.match(padrao)){
         document.getElementById("pop-erro-latitude").style.display = "none";
         document.getElementById("pop-suce-latitude").style.display = "block";
 
     } else{
         document.getElementById("pop-suce-latitude").style.display = "none";
         document.getElementById("pop-erro-latitude").style.display = "block";
 
       }
     } else{
       document.getElementById("pop-suce-latitude").style.display = "none";
       document.getElementById("pop-erro-latitude").style.display = "none";
     }
   }
   
   function validaLongitude() {
     const padrao = /[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
     const longitude = document.getElementById("longitude").value
     if(longitude){
       if(longitude.match(padrao)){
         document.getElementById("pop-erro-longitude").style.display = "none";
         document.getElementById("pop-suce-longitude").style.display = "block";
     } else{
         document.getElementById("pop-suce-longitude").style.display = "none";
         document.getElementById("pop-erro-longitude").style.display = "block";
 
     }
     } else{
       document.getElementById("pop-erro-longitude").style.display = "none";
     }
   }
 
 const [form, setForm ] = useState({
  nome: '',
  email: '',
  cpf: '',
  latitude:'',
  longitude: '',
  tipoDaLavoura: '',
  dataDaColheita: '',
  eventoOcorrido: ''
 
   })
 
   const dadosFormulario = (e) => {
     setForm({...form, [e.target.name]: e.target.value })
 }

 const requestUpdate = async (url) => {
     await fetch(url, {
        method: "PUT",
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify(form)
     })
     .then()
     .then()
     .catch()
    }

 const EnviarDados= (e) => {
    e.preventDefault()
    if(form.nome === ""){
      form.nome = registro[0].dados.nome
  }
  if(form.email === ""){
      form.email = registro[0].dados.email
  }
  if(form.cpf === ""){
      form.cpf = registro[0].dados.cpf
  }
  if(form.eventoOcorrido === ""){
      form.eventoOcorrido = registro[0].dados.eventoOcorrido
  }
  if(form.dataDaColheita === ""){
      form.dataDaColheita = registro[0].dados.dataDaColheita
  }
  if(form.latitude === ""){
      form.latitude = registro[0].dados.latitude
  }
  if(form.longitude === ""){
      form.longitude = registro[0].dados.longitude
  }
  if(form.tipoDaLavoura === ""){
      form.tipoDaLavoura = registro[0].dados.tipoDaLavoura
  }

    const url = `https://api-proagro-facil.herokuapp.com/consultar/atualizar/${cpf}`
    
    requestUpdate(url)
    navegacao("/registros")
 
 
 }
 
 
   return (
     <div  className={style.container}>

       <header>ATUALIZAR</header>

       { registro.length > 0 &&

       <form onLoad={MarcaRadioButton()} onSubmit={EnviarDados}>
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
                 defaultValue={registro[0].dados.nome}
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
                 defaultValue={registro[0].dados.email}
                 id="email"
                 onInput={vereficaEmail}
                 maxLength="70"
                 minLength="5"
                 name="email"
                 required
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
                 defaultValue={registro[0].dados.cpf}
                 onChange={dadosFormulario}
                 onKeyPress={mascaraCPF}
                 onInput={vereficaCPF}
                 maxLength="14"
                 required
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
                 onChange={dadosFormulario}
                 onInput={validaLatitude}
                 defaultValue={registro[0].dados.latitude}
                 maxLength="50"
                 id="latitude"
                 minLength="2"
                 name="latitude"
                 required
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
                 onChange={dadosFormulario}
                 onInput={validaLongitude}
                 defaultValue={registro[0].dados.longitude}
                 maxLength="50"
                 id="longitude"
                 minLength="2"
                 name="longitude"
                 required
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
                 defaultValue={registro[0].dados.tipoDaLavoura}
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
                 defaultValue={registro[0].dados.dataDaColheita}
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
                 id="granizo"
               />
               <label htmlFor="granizo">Granizo</label>
             </div>
 
             <div className={style.eventoInput}>
               <input
                 type="radio"
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
                 value="vendaval"
                 id="vendaval"
               />
               <label htmlFor="vendaval">Vendaval</label>
             </div>
 
             <div className={style.eventoInput}>
               <input
                 type="radio"
                 name="eventoOcorrido"
                 value="raio"
                 id="raio"
               />
               <label htmlFor="raio">Raio</label>
             </div>
         </div>
         </div>
         <div className={style.grupoBotoes}>
            <Link to="/registros">
                <button id={style.cancelar} type="button">
                  Cancelar
                </button>
           </Link>
           <button   id={style.registrar}type="submit">
             Atualizar
           </button>
         </div>
       </form>
}
     </div>
)
}

export default Editar
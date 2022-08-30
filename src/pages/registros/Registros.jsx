import { useEffect, useState } from "react"
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa"
import Linha from "../../components/linhaDaTabela/Linha"
import CorpoDaTabela from "../../components/CorpoDaTabela/CorpoDaTabela"
import style from "./style.module.css"
import { Outlet } from 'react-router-dom'
import NavBar from "../../components/navbar/NavBar"

function Registros(){
    
    return(
        <>
        <NavBar />
        <Outlet />
        </>
    )
}

export default Registros
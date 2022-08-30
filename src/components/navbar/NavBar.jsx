import style from "./style.module.css"

import { Link } from "react-router-dom";
import { AiOutlinePlus, AiFillFolderOpen } from "react-icons/ai";
function NavBar(){
    return(
        <>
            <nav className={style.nav}>
                <div className={style.pasta}>
                    <Link to='/registros'><AiFillFolderOpen/></Link>
                </div>
                <div className={style.add}>
                <Link to='/registrar'> <AiOutlinePlus/></Link>
                    </div>
            </nav>
        </>
    )
}

export default NavBar
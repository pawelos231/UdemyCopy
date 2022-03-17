import React from "react";
import bemCssModules from 'bem-css-modules'
import {StoreContext} from '../../store/storeProvider'
import {default as AsideMenuStyles} from './AsideMenu.module.scss'
import UserMenu from "./subcomponents/UserMenu";
import AdminMenu from './subcomponents/AdminMenu'
import { useContext } from "react";
const style = bemCssModules(AsideMenuStyles)

const ADMIN_TYPE = 1

const AsideMenu = () =>{
    const {user} = useContext(StoreContext)

    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE
		? <AdminMenu />
		: null; 
    
    
    return(
        <div className={style('nav-wrapper')}>
             <section className={style()}>
                 <UserMenu isUserLogged={Boolean(user)}/>
                {adminMenuComponent}
            </section>
        </div>
    )
}
export default AsideMenu
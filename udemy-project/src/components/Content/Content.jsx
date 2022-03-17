import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules'
import { Route, Routes } from 'react-router-dom';
import {default as ContentStyles} from './Content.module.scss'
import { StoreContext } from '../../store/storeProvider'
import Courses from '../Courses/Courses';
import UserCourses from '../UserCourses/UserCourses';
import AdminPanel from '../AdminPanel/AdminPanel';
const style = bemCssModules(ContentStyles)
const ADMIN_TYPE = 1
const Content = () =>{
    const {user} = useContext(StoreContext)

    const isUserLogged = Boolean(user)
    const isAdmin = user?.accessLevel === ADMIN_TYPE
    return (
		<main className={style()}>
			<Routes>
				<Route exact path="/" element ={<Courses/>} />

				{ isUserLogged && <Route exact path="/my-courses" element={<UserCourses/>} /> }

				{ isAdmin && <Route exact path="/manage-courses" element={<AdminPanel/>}  /> }
			</Routes>
		</main>
	);
}
export default Content
import React, { useContext } from "react";
import bemCssModules from 'bem-css-modules'
import {default as CourseStyles} from './Course.module.scss'
import request from "../../helpers/request";
import {useHistory, useNavigate} from 'react-router-dom'
import { StoreContext } from "../../store/storeProvider";

const Course = ({ authors, id, isUserContext = false, img, price, title}) => {
    const AllAuthors = authors.join(', ');
    const {user, setUser} = useContext(StoreContext);

    const history = useNavigate();
    const isUserLogged = Boolean(user)

    const handleOnClick = async () =>{
        try{
            const {data, status} = await request.patch('/users', {
                login: user.login,
                courseId: id,
            });
            if(status === 202){
                setUser(data.user);
                history('/my-courses')
            }
        }
        catch(error){
            console.warn(error)
        }
    }
    const style = bemCssModules(CourseStyles)
    const shouldBeBuyButtonVisible = isUserLogged && !isUserContext 

    return ( 
        <li>
        <article className={style()}>
             <h3 className={style('title')}>{title}</h3>
             <img src={img} alt={title} className={style('image')} />
                <p className={style('price')}> {`Koszt kursu ${price}`}</p>
                <p className={style('authors')}>{`Autorzy kursu: ${AllAuthors}`}</p>
                { shouldBeBuyButtonVisible ? <button onClick={handleOnClick}>Zakup ten kurs</button> : null}
        </article> 
        </li>);
}
 
export default Course;
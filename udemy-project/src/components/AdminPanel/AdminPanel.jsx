import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules'
import {default as AdminPanelStyle} from './AdminPanel.module.scss'
import { StoreContext } from '../../store/storeProvider';
import CourseDetails from './Subcomponents/CourseDetails';
import CoursePopup from './Subcomponents/CoursePopup';
const style = bemCssModules(AdminPanelStyle)
const AdminPanel = () => {
    const {courses} = useContext(StoreContext);
    const [isOpenPopup, setIsOpenPopUp] = useState(false);

    const showPopup = () => setIsOpenPopUp(true)
    const hidePopup = event => {
        if(event){
            event.preventDefault()
        }
        setIsOpenPopUp(false)
    }

    const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course}/>)
    return ( 
    <section>
        {coursesElements}
        <button onClick={showPopup}>Dodaj nowy kurs</button>
        <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup}/>
    </section> );
}
 
export default AdminPanel;
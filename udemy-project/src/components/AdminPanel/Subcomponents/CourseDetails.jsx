import React, { useContext, useState } from 'react';
import request from '../../../helpers/request';
import { StoreContext } from '../../../store/storeProvider';
import CoursePopup from './CoursePopup';
const CourseDetails = (props) => {
    const [isOpenPopup, setIsOpenPopUp] = useState(false);
    const {setCourses} = useContext(StoreContext)
    const showPopup = () => setIsOpenPopUp(true)
    const hidePopup = event => {
        if(event){
            event.preventDefault()
        }
        setIsOpenPopUp(false)
    }
    const handleDeleteCourse =  async () =>{
        try{
            const {status } = await request.delete(`/courses/${props.id}`)
            if(status === 200){
                setCourses(prev => prev.filter(course => course.id !== props.id))
            }
        }catch(error){
            console.warn(error)
        }
    }
    return ( 
    <details>
        <summary> {props.title} </summary>
        <button onClick={showPopup}>Edytuj</button>
        <button onClick={handleDeleteCourse}>Usuń</button>
        <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props}/>
    </details> );
}
 
export default CourseDetails;
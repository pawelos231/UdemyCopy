import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules'
import {default as CoursePopupStyles} from './CoursePopup.module.scss'
import Modal from '../../Modal/Modal';
import { StoreContext } from '../../../store/storeProvider';
import request from '../../../helpers/request';

const style = bemCssModules(CoursePopupStyles)
const CoursePopup = ({
    authors = [],
    hidePopup,
    isEditMode = true,
    isOpenPopup,
    id,
    img = '',
    price = 0,
    title = '',
}) => {
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setAuthor] = useState('')
    const [formImg, setFormImg] = useState(img)
    const [formPrice, setFormPrice] = useState(price)
    const [formTitle, setFormTitle] = useState(title)

    const {setCourses} = useContext(StoreContext);

    const handleOnChangeAuthor = event => {
        setAuthor(event.target.value)
    }
    const handleOnChangeImg = event => {
        setFormImg(event.target.value)
    }
    const handleOnChangePrice = event => {
        setFormPrice(event.target.value)
    }
    const handleOnChangeTitle = event => {
        setFormTitle(event.target.value)
    }

    const handleOnSubmit = async event => {
        event.preventDefault()
        const courseObject = {
            authors: formAuthors,
            id,
            img: formImg,
            price: formPrice,
            title: formTitle,
        }
        if(isEditMode){
            const {data, status} = await request.put(`/courses` , courseObject)

            if(status === 202){
                setCourses(data.courses)
            }
        }else{
            const {data, status} = await request.post('/courses', courseObject)
            if(status === 201){
                setCourses(data.courses)
            }
        }
        hidePopup(event);
    }
    const addAuthor = e =>{
        e.preventDefault();
        setFormAuthors(prev => [...prev, formAuthor])
        setAuthor("")
    }
    const deleteAuthor = event => {
        const authorToDelete = event.target.dataset.author
        setFormAuthors(prev => prev.filter(author => author !== authorToDelete))
    }

    const authorsElements = formAuthors.map(author => 
    <li key={author}>
        <p>{author}</p>
        <button data-author={author} onClick={deleteAuthor}> Usu?? </button>
    </li>)

    const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utw??rz kurs'
    return ( 
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
        <div className={style()}>
            <form className={style('form')} method='submit' onSubmit={handleOnSubmit}>

                <div className={style('form-row')}>
                    <label>
                        Autor: 
                        <input className={style('input')} type="text" value={formAuthor} onChange={handleOnChangeAuthor} />
                        <button onClick={addAuthor}>Dodaj Autora</button>
                    </label>
                </div>

                <div className={style('form-row')}>
                    <label>
                        imageUrl: 
                        <input className={style('input')} type="text" value={formImg} onChange={handleOnChangeImg} />
                    </label>
                </div>

                <div className={style('form-row')}>
                    <label>
                        Cena: 
                        <input className={style('input')}  type="number" value={formPrice} onChange={handleOnChangePrice} />         
                    </label>
                </div>

                <div className={style('form-row')}>
                    <label>
                        Tytu??: 
                        <input className={style('input')} type="text" value={formTitle} onChange={handleOnChangeTitle} />
                    </label>
                </div>

                <button type='submit'>{correctLabel}</button>
                <button onClick={hidePopup} type='button'>Anuluj</button>
            </form>
            <ul>
               {authorsElements}
            </ul>
        </div>
    </Modal> );
}
 
export default CoursePopup;
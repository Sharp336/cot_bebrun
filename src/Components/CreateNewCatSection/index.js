import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import React, {useContext, useState} from "react";
import {Context} from "../../App";
import Api from "../../api";

let showResult = function (response) {
    console.log(response)
}
let createNewCat = async function(user, id, name, rate, age, description, image, favourite){
    let data = {
        "id": id,
        "name": name,
        "rate": rate,
        "age": age,
        "description": description,
        "image": image,
        "favorite": favourite
    }
    await Api.addCat(user, data).then(a => showResult(a))
}

const CreateNewCatSection = () => {
    const context = useContext(Context)
    const [user, status, isCreateNewCatSectionOpened, setCreateNewCatSectionOpened] = [context.user, context.status, context.isCreateNewCatSectionOpened, context.setCreateNewCatSectionOpened]
    const [catId, setCatId] = useState(NaN)
    const [catName, setCatName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [catAge, setCatAge] = useState(NaN)
    const [catRate, setCatRate] = useState(NaN)
    const [catDesc, setCatDesc] = useState('')
    const [catIsFavourite, setCatIsFavourite] = useState(false)
    return status === "Offline" ? null :
        <div className="CreateNewCatSection">
            <div className="CreateNewCatSectionHeader">
                <span className="POSTlabel">
                    POST
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/add/`}</b>
                </span>

                <span className="OpenSection">
                    {!isCreateNewCatSectionOpened ?
                            <img className="arrow" id="ToggleCreateNewCatSection" src={ArrowDown} onClick={() => {
                                setCreateNewCatSectionOpened(true)
                                setCatName('')
                                setPhotoUrl('')
                                setCatAge(NaN)
                                setCatRate(NaN)
                                setCatDesc('')
                                setCatIsFavourite(false)
                            }} alt="Open"/>
                            :
                            <img className="arrow" id="ToggleCreateNewCatSection" src={ArrowUp} onClick={() => {setCreateNewCatSectionOpened(false)}} alt="Open"/>
                    }
                </span>
            </div>
            {!isCreateNewCatSectionOpened ? null :
                <div className="CreateNewCatSectionContent">
                    <h1>Добавить кота</h1>
                    <label htmlFor="id">ID</label>
                    <input className="CreateNewCatSectionContent" type="number" name="id" onChange={e => setCatId(parseInt(e.target.value))}/>
                    <label htmlFor="name">Имя кота</label>
                    <input className="CreateNewCatSectionContent" type="text" name="name" onChange={e => setCatName(e.target.value)}/>
                    <label htmlFor="image">Ссылка на фото</label>
                    <input className="CreateNewCatSectionContent" type="url" name="image" onChange={e => setPhotoUrl(e.target.value)}/>
                    <label htmlFor="age">Возраст</label>
                    <input className="CreateNewCatSectionContent" type="number" name="age" onChange={e => setCatAge(parseInt(e.target.value))}/>
                    <label htmlFor="rate">Рейтинг</label>
                    <input className="CreateNewCatSectionContent" type="number" name="rate" onChange={e => setCatRate(parseInt(e.target.value))}/>
                    <label htmlFor="description">Описание</label>
                    <input className="CreateNewCatSectionContent" type="text" name="description" onChange={e => setCatDesc(e.target.value)}/>
                    <label htmlFor="isfavourite">Топовый ли кот ?</label>
                    <input className="CreateNewCatSectionContent" type="checkbox" name="isfavourite" onChange={() => {setCatIsFavourite(!catIsFavourite)}}/>

                    <div className="CreateNewCatSectionContentButtonSector">
                        <button className="CreateNewCatSectionContentSubmitButton" type="submit" name="submit" value="add" onClick={() => {
                            createNewCat(user, catId, catName, catRate, catAge, catDesc, photoUrl, catIsFavourite)}
                        }>Добавить</button>
                    </div>
                </div>}
        </div>
}

export default CreateNewCatSection
import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import React, {useContext, useState} from "react";
import {Context} from "../../App";
import Api from "../../api";

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
    await Api.addCat(user, data).then(a => alert(a.message))
}

const CreateNewCatSection = () => {
    const context = useContext(Context)
    const [user, currentCat, status, setStatus, isCreateNewCatSectionOpened, setCreateNewCatSectionOpened, setShowAllCatsSectionOpened, setShowAllIdsSectionOpened, setDeleteCurrentCatSectionOpened, setEditCurrentCatSectionOpened] = [context.user, context.currentCat, context.status, context.setStatus, context.isCreateNewCatSectionOpened, context.setCreateNewCatSectionOpened, context.setShowAllCatsSectionOpened, context.setShowAllIdsSectionOpened, context.setDeleteCurrentCatSectionOpened, context.setEditCurrentCatSectionOpened]
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
                    <form className="CreateNewCatSectionContent" onSubmit={async (e) => {
                        e.preventDefault()
                        createNewCat(user, catId, catName, catRate, catAge, catDesc, photoUrl, catIsFavourite)
                        setShowAllCatsSectionOpened(false)
                        setShowAllIdsSectionOpened(false)
                        setCreateNewCatSectionOpened(false)
                        setEditCurrentCatSectionOpened(false)
                        setDeleteCurrentCatSectionOpened(false)

                        await Api.CheckCat(user, currentCat).then(a => setStatus(a))

                    }
                    }>
                        <label className="CreateNewCatSectionContent" htmlFor="id">ID</label><br/>
                        <input className="CreateNewCatSectionContent" type="number" name="id" onChange={e => setCatId(parseInt(e.target.value))} required={true} min={0} max={99}/><br/><br/>
                        <label className="CreateNewCatSectionContent" htmlFor="name">Имя кота</label><br/>
                        <input className="CreateNewCatSectionContent" type="text" name="name" onChange={e => setCatName(e.target.value)} required={true} maxLength={12}/><br/><br/>
                        <label className="CreateNewCatSectionContent" htmlFor="image">Ссылка на фото</label><br/>
                        <input className="CreateNewCatSectionContent" id="widerinpt" type="url" name="image" onChange={e => setPhotoUrl(e.target.value)} required={true} minLength={10}/><br/><br/>
                        <label className="CreateNewCatSectionContent" htmlFor="age">Возраст</label><br/>
                        <input className="CreateNewCatSectionContent" type="number" name="age" onChange={e => setCatAge(parseInt(e.target.value))} required={true} min={0} max={20}/><br/><br/>
                        <label className="CreateNewCatSectionContent" htmlFor="rate">Рейтинг</label><br/>
                        <input className="CreateNewCatSectionContent" type="number" name="rate" onChange={e => setCatRate(parseInt(e.target.value))} required={true} min={0} max={10}/><br/><br/>
                        <label className="CreateNewCatSectionContent" htmlFor="description">Описание</label><br/>
                        <input className="CreateNewCatSectionContent" id="widerinpt" type="text" name="description" onChange={e => setCatDesc(e.target.value)} required={true} maxLength={150}/><br/><br/>
                        <label className="CreateNewCatSectionContent" htmlFor="isfavourite">Топовый ли кот ?</label><br/>
                        <input className="CreateNewCatSectionContentCheckBox" type="checkbox" name="isfavourite" onChange={() => {setCatIsFavourite(!catIsFavourite)}}/><br/>

                        <button className="CreateNewCatSectionContentSubmitButton" type="submit" name="submit" value="add" onSubmit={(e)=> e.preventDefault()}>Добавить</button>
                    </form>
                </div>}
        </div>
}

export default CreateNewCatSection
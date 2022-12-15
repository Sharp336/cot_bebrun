import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import React, {useContext, useState} from "react";
import {Context} from "../../App";
import Api from "../../api";
import Cross from "../../images/cross.svg";

let EditCurrentCat = async function(user, id, name, rate, age, description, image, favourite){
    let data = {
        "name": name,
        "rate": rate,
        "age": age,
        "description": description,
        "image": image,
        "favorite": favourite
    }
    await Api.updateCat(user, id, data).then(a => alert(a.message))
}

const EditCurrentCatSection = () => {
    const context = useContext(Context)
    const [user, status, isEditCurrentCatSectionOpened, setEditCurrentCatSectionOpened, currentCat] = [context.user, context.status, context.isEditCurrentCatSectionOpened, context.setEditCurrentCatSectionOpened, context.currentCat]
    const [catName, setCatName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [catAge, setCatAge] = useState(NaN)
    const [catRate, setCatRate] = useState(NaN)
    const [catDesc, setCatDesc] = useState('')
    const [catIsFavourite, setCatIsFavourite] = useState(false)
    return status === "Offline" ? null :
        <div className="EditCurrentCatSection">
            <div className="EditCurrentCatSectionHeader">
                <span className="POSTlabel">
                    POST
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/update/`}</b>
                </span>

                <span className="OpenSection">


                    { status !== "Found" ?
                        <img className="cross" src={Cross} alt="Section Unavailable"/>
                        :
                        (!isEditCurrentCatSectionOpened ?
                                <img className="arrow" id="ToggleEditCurrentCatSection" src={ArrowDown} onClick={async () => {
                                    await Api.getSingle(user, currentCat).then((answer) => {
                                        setCatName(answer.name)
                                        setPhotoUrl(answer.image)
                                        setCatAge(answer.age)
                                        setCatRate(answer.rate)
                                        setCatDesc(answer.description)
                                        setCatIsFavourite(answer.favorite)

                                        setEditCurrentCatSectionOpened(true)
                                    })
                                }} alt="Open"/>
                                :
                                <img className="arrow" id="ToggleEditCurrentCatSection" src={ArrowUp} onClick={() => {setEditCurrentCatSectionOpened(false)}} alt="Open"/>
                        )
                    }
                </span>
            </div>
            {!isEditCurrentCatSectionOpened ? null :
                <div className="EditCurrentCatSectionContent">
                    <h1>Изменить кота</h1>
                    <form className="EditCurrentCatSectionContent" onSubmit={(e) => {
                        e.preventDefault()
                        EditCurrentCat(user, currentCat, catName, catRate, catAge, catDesc, photoUrl, catIsFavourite)}
                    }>
                        <label className="EditCurrentCatSectionContent" htmlFor="name">Имя кота</label><br/>
                        <input className="EditCurrentCatSectionContent" placeholder={catName} type="text" name="name" onChange={e => setCatName(e.target.value)} required={true} maxLength={12}/><br/><br/>
                        <label className="EditCurrentCatSectionContent" htmlFor="image">Ссылка на фото</label><br/>
                        <input className="EditCurrentCatSectionContent" placeholder={photoUrl} id="widerinpt" type="url" name="image" onChange={e => setPhotoUrl(e.target.value)} required={true} minLength={10}/><br/><br/>
                        <label className="EditCurrentCatSectionContent" htmlFor="age">Возраст</label><br/>
                        <input className="EditCurrentCatSectionContent" placeholder={catAge} type="number" name="age" onChange={e => setCatAge(parseInt(e.target.value))} required={true} min={0} max={20}/><br/><br/>
                        <label className="EditCurrentCatSectionContent" htmlFor="rate">Рейтинг</label><br/>
                        <input className="EditCurrentCatSectionContent" placeholder={catRate} type="number" name="rate" onChange={e => setCatRate(parseInt(e.target.value))} required={true} min={0} max={10}/><br/><br/>
                        <label className="EditCurrentCatSectionContent" htmlFor="description">Описание</label><br/>
                        <input className="EditCurrentCatSectionContent" placeholder={catDesc} id="widerinpt" type="text" name="description" onChange={e => setCatDesc(e.target.value)} required={true} maxLength={150}/><br/><br/>
                        <label className="EditCurrentCatSectionContent" htmlFor="isfavourite">Топовый ли кот ?</label><br/>
                        <input className="EditCurrentCatSectionContentCheckBox" checked={catIsFavourite} type="checkbox" name="isfavourite" onChange={() => {setCatIsFavourite(!catIsFavourite)}}/><br/>

                        <button className="EditCurrentCatSectionContentSubmitButton" type="submit" name="submit" value="edit" onSubmit={(e)=> e.preventDefault()}>Извенить</button>
                    </form>
                </div>}
        </div>
}

export default EditCurrentCatSection
import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import Cross from "../../images/cross.svg"
import React, {useContext} from "react";
import {Context} from "../../App";
import Api from "../../api";

let showResult = function (response) {

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
    return status === "Offline" ? null :
        <div className="CreateNewCatSection">
            <div className="CreateNewCatSectionHeader">
                <span className="POSTlabel">
                    POST
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/add/gg`}</b>
                </span>

                <span className="OpenSection">
                    {!isCreateNewCatSectionOpened ?
                            <img className="arrow" id="ToggleCreateNewCatSection" src={ArrowDown} onClick={() => {setCreateNewCatSectionOpened(true)}} alt="Open"/>
                            :
                            <img className="arrow" id="ToggleCreateNewCatSection" src={ArrowUp} onClick={() => {setCreateNewCatSectionOpened(false)}} alt="Open"/>
                    }
                </span>
            </div>
            {!isCreateNewCatSectionOpened ? null :
                <div className="CreateNewCatSectionContent">
                    JOPA
                </div>}
        </div>
}

export default CreateNewCatSection
import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import Cross from "../../images/cross.svg"
import React, {useContext} from "react";
import {Context} from "../../App";
import Api from "../../api";

let showAllIds = function (ids){
    console.log(typeof ids)
    document.getElementById("ShowAllIdsSectionContent").innerHTML = `<h2>Доступны коты с id: ${ids.join(', ')}<h2/>`
}
let getAllCats = async function(user){
    await Api.getIds(user).then(a => showAllIds(a))
}

const ShowAllIdsSection = () => {
    const context = useContext(Context)
    const [user, status, isShowAllIdsSectionOpened, setShowAllIdsSectionOpened] = [context.user, context.status, context.isShowAllIdsSectionOpened, context.setShowAllIdsSectionOpened]
    return status === "Offline" ? null :
        <div className="ShowAllIdsSection">
            <div className="ShowAllIdsSectionHeader">
                <span className="GETlabel">
                    GET
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/ids/`}</b>
                </span>

                <span className="OpenSection">
                    { status === "Empty" ?
                        <img className="cross" src={Cross} alt="Section Unavailable"/>
                        :
                        (!isShowAllIdsSectionOpened ?
                            <img className="arrow" id="ToggleShowAllSection" src={ArrowDown} onClick={() => {getAllCats(user); setShowAllIdsSectionOpened(true)}} alt="Open"/>
                            :
                            <img className="arrow" id="ToggleShowAllSection" src={ArrowUp} onClick={() => {setShowAllIdsSectionOpened(false)}} alt="Open"/>)
                    }
                </span>
            </div>
            {!isShowAllIdsSectionOpened ? null :
                <div className="ShowAllIdsSectionContent" id="ShowAllIdsSectionContent">

                </div>}
        </div>
}

export default ShowAllIdsSection
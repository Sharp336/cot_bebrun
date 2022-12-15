import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import React, {useContext} from "react";
import {Context} from "../../App";
import Api from "../../api";
import Cross from "../../images/cross.svg";

const DeleteCurrentCatSection = () => {
    const context = useContext(Context)
    const [user, status, setStatus, isDeleteCurrentCatSectionOpened, setDeleteCurrentCatSectionOpened, currentCat, setShowAllCatsSectionOpened, setShowAllIdsSectionOpened, setCreateNewCatSectionOpened, setEditCurrentCatSectionOpened] = [context.user, context.status, context.setStatus, context.isDeleteCurrentCatSectionOpened, context.setDeleteCurrentCatSectionOpened, context.currentCat, context.setShowAllCatsSectionOpened, context.setShowAllIdsSectionOpened, context.setCreateNewCatSectionOpened, context.setEditCurrentCatSectionOpened]
    return status === "Offline" ? null :
        <div className="DeleteCurrentCatSection">
            <div className="DeleteCurrentCatSectionHeader">
                <span className="DELETElabel">
                    DELETE
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/delete/${!isNaN(currentCat) ? currentCat : ''}`}</b>
                </span>

                <span className="OpenSection">


                    { status !== "Found" ?
                        <img className="cross" src={Cross} alt="Section Unavailable"/>
                        :
                        (!isDeleteCurrentCatSectionOpened ?
                                <img className="arrow" id="ToggleDeleteCurrentCatSection" src={ArrowDown} onClick={() => {setDeleteCurrentCatSectionOpened(true)}} alt="Open"/>
                                :
                                <img className="arrow" id="ToggleDeleteCurrentCatSection" src={ArrowUp} onClick={() => {setDeleteCurrentCatSectionOpened(false)}} alt="Open"/>
                        )
                    }
                </span>
            </div>
            {!isDeleteCurrentCatSectionOpened ? null :
                <div className="DeleteCurrentCatSectionContent">
                    <button className="DeleteCurrentCatButton" onClick={async () => {
                        await Api.deleteCat(user, currentCat).then(a => alert(a.message))

                        setShowAllCatsSectionOpened(false)
                        setShowAllIdsSectionOpened(false)
                        setCreateNewCatSectionOpened(false)
                        setEditCurrentCatSectionOpened(false)
                        setDeleteCurrentCatSectionOpened(false)

                        await Api.CheckCat(user, currentCat).then(a => setStatus(a))

                    }}>Удалить</button>
                </div>}
        </div>
}

export default DeleteCurrentCatSection
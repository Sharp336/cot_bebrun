import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import Cross from "../../images/cross.svg"
import React, {useContext} from "react";
import {Context} from "../../App";
import Api from "../../api";


const shaverma = "https://static.wixstatic.com/media/476659_4c2804147b9b481db39e85ff8f3dcb19~mv2.jpg/v1/crop/x_71,y_0,w_984,h_727/fill/w_612,h_452,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/img-1780536702_30486574001015641.jpg"
let infoBlock;

const getWord = function (n) {
    if (n % 100 < 11 || n % 100 > 14) {
        if (n % 10 === 1) {
            return "год";
        } else if (n % 10 >= 2 && n % 10 <= 4) {
            return "года";
        }
    }
    return "лет";
}

const getItem = function (data, main) {
    const fill = '<svg xmlns="http://www.w3.org/2000/svg" width="97%" height="97%" fill="currentColor" > <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>'
    const stroke = '<svg xmlns="http://www.w3.org/2000/svg" width="97%" height="97%" fill="none" stroke="white" > <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>'
    const item = `
        <div class="catcard">
            <div class="card-img" style="background-image: url(${data.image ?? shaverma})"></div>
            <h3>${data.name ?? "неизвестно"}</h3>
            <p class="rate">${fill.repeat(data.rate) + stroke.repeat(10-data.rate)}</p>
        </div>
    `
    main.innerHTML += item;
}

const showInfo = function (data) {
    console.log(data.image)
    sessionStorage.setItem("hi", data.name)
    infoBlock.classList.add("active");
    infoBlock.firstElementChild.innerHTML = `
        <img class="info-img" src="${data.image ?? shaverma}" alt="${data.name}"/>
        <div class="information">
            <h2>${data.id + ' - ' + (data.name ?? "неизвестно")}</h2>
            <h3>${data.age ?? "неизвестно"} ${getWord(data.age)}</h3>
            <p>${data.description ?? "описания нет"}</p>
        </div>
`;
    document.getElementById("fknclose").addEventListener("click", function () {infoBlock.classList.remove("active");})
}
let showCats = function (cats) {

    const main = document.getElementsByClassName("ShowAllSectionContent").item(0);
    if (cats.length > 1){
        cats.forEach(cat => {getItem(cat, main);});

        const cards = document.getElementsByClassName("catcard");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", function () {
                showInfo(cats[i]);
            })
        }
    }
    else {
        getItem(cats, main)
        const card = document.getElementsByClassName("catcard");
        card[0].addEventListener("click", function () {
            showInfo(cats)
        })
    }



    infoBlock = document.querySelector(".info-block");
}

let getAllCats = async function(user){
    await Api.getAll(user).then(a => showCats(a))
}

let getOneCat = async function(user, catId){
    await Api.getSingle(user, catId).then(a => showCats(a))
}

const ShowAllCatsSection = () => {
    const context = useContext(Context)
    const [user, status, isShowAllCatsSectionOpened, setShowAllCatsSectionOpened, currentCat] = [context.user, context.status, context.isShowAllCatsSectionOpened, context.setShowAllCatsSectionOpened, context.currentCat]
    return status === "Offline" ? null :
        <div className="ShowAllSection">
            <div className="ShowAllSectionHeader">
                <span className="GETlabel">
                    GET
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/show/${!isNaN(currentCat) ? currentCat : ''}`}</b>
                </span>

                <span className="OpenSection">
                    { status === "Empty" || status === "Not found" ?
                        <img className="cross" src={Cross} alt="Section Unavailable"/>
                        :
                        (!isShowAllCatsSectionOpened ?
                            <img className="arrow" id="ToggleShowAllSection" src={ArrowDown} onClick={() => {isNaN(currentCat) ? getAllCats(user) : getOneCat(user, currentCat); setShowAllCatsSectionOpened(true)}} alt="Open"/>
                            :
                            <img className="arrow" id="ToggleShowAllSection" src={ArrowUp} onClick={() => {setShowAllCatsSectionOpened(false)}} alt="Open"/>)
                    }
                </span>
            </div>
            {!isShowAllCatsSectionOpened ? null :
                <div className="ShowAllSectionContent">
                    <div className="info-block"><div className="info-wrapper" id="fknclose"/></div>
                </div>}
        </div>
}

export default ShowAllCatsSection
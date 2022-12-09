import "./style.css";
import ArrowDown from "../../images/arrow_down.svg"
import ArrowUp from "../../images/arrow_up.svg"
import React, {useContext, useState} from "react";
import {Context} from "../../App";
import Api from "../../api";



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
    const fill = '<svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="currentColor" > <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>'
    const stroke = '<svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="none" stroke="white" > <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>'
    const item = `
        <div class="catcard">
            <div class="card-img" style="background-image: url(${data.img_link})"></div>
            <h3>${data.name}</h3>
            <p class="rate">${fill.repeat(data.rate) + stroke.repeat(10-data.rate)}</p>
        </div>
    `
    main.innerHTML += item;
}

const showInfo = function (data) {
    infoBlock.classList.add("active");
    infoBlock.firstElementChild.innerHTML = `
        <img class="info-img" src="${data.img_link}" alt="${data.name}">
        <div class="information">
            <h2>${data.name}</h2>
            <h3>${data.age} ${getWord(data.age)}</h3>
            <p>${data.description}</p>
        </div>
`;
    document.getElementById("fknclose").addEventListener("click", function () {infoBlock.classList.remove("active");})
}
let bebra = async function (user) {
    let cats = await Api.getAll(user)
    const main = document.getElementsByClassName("ShowAllSectionContent").item(0);
    cats.forEach(cat => {
        getItem(cat, main);
    });

    const cards = document.getElementsByClassName("catcard");

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {
            showInfo(cats[i]);
        })
    }

    infoBlock = document.querySelector(".info-block");
}

const ShowAllSectionContent = (isSectionOpened, user, status) => {
    return !isSectionOpened ? null :
        <div className="ShowAllSectionContent">
            <button name="Execute" className="ExecuteButton" onClick={() => {
                bebra(user)
                alert("bebra")
            }}>Execute</button>
            <div className="info-block">
                <div className="info-wrapper" id="fknclose">

                </div>
            </div>
        </div>
}
const ShowAllSection = () => {
    const context = useContext(Context)
    const [user, status] = [context.user, context.status]
    let [isSectionOpened, setSectionOpened] = useState(false)
    return status !== "Online" ? null :
        <div className="ShowAllSection">
            <div className="ShowAllSectionHeader">
                <span className="GETlabel">
                    GET
                </span>

                <span className="SectionRequest">
                    <b>{`/api/single/${user}/show/`}</b>
                </span>

                <span className="OpenSection">
                    {!isSectionOpened ?
                        <img className="arrow" id="ToggleShowAllSection" src={ArrowDown} onClick={() => {setSectionOpened(true)}} alt="Open"/>
                    :
                        <img className="arrow" id="ToggleShowAllSection" src={ArrowUp} onClick={() => {setSectionOpened(false)}} alt="Open"/> }
                </span>
            </div>
            {ShowAllSectionContent(isSectionOpened,user, status)}
        </div>
}

export default ShowAllSection
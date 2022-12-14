import React, {useState} from "react";

import ShowAllCatsSection from "./Components/ShowAllCatsSection";
import ShowAllIdsSection from "./Components/ShowAllIdsSection";
import CreateNewCatSection from "./Components/CreateNewCatSection";
import EditCurrentCatSection from "./Components/EditCurrentCatSection";

import Api from "./api";

const Context = React.createContext({})
function DisplayStatus(status){
	switch (status){
		case "Online":
			return <b style={{color: "green"}}>{status}</b>
		case "Empty":
			return <b style={{color: "orange"}}>{status}</b>
		case "Found":
			return <b style={{color: "green"}}>{status}</b>
		case "Not found":
			return <b style={{color: "orange"}}>{status}</b>
		default:
			return <b style={{color: "red"}}>{status}</b>
	}
}

function App() {
	const [user, setUser] = useState("username")
	const [currentCat, setCurrentCat] = useState(NaN)
	const [status, setStatus] = useState("Offline");
	const [data, setData] = useState({})
	let [isShowAllCatsSectionOpened, setShowAllCatsSectionOpened] = useState(false)
	let [isShowAllIdsSectionOpened, setShowAllIdsSectionOpened] = useState(false)
	let [isCreateNewCatSectionOpened, setCreateNewCatSectionOpened] = useState(false)
	let [isEditCurrentCatSectionOpened, setEditCurrentCatSectionOpened] = useState(false)
	return (
		<Context.Provider value={{
			status : status,
			setStatus: setStatus,
			user:user,
			setUser:setUser,
			data:data,
			setData:setData,
			isShowAllCatsSectionOpened:isShowAllCatsSectionOpened,
			setShowAllCatsSectionOpened:setShowAllCatsSectionOpened,
			currentCat:currentCat,
			setCurrentCat:setCurrentCat,
			isShowAllIdsSectionOpened:isShowAllIdsSectionOpened,
			setShowAllIdsSectionOpened:setShowAllIdsSectionOpened,
			isCreateNewCatSectionOpened:isCreateNewCatSectionOpened,
			setCreateNewCatSectionOpened:setCreateNewCatSectionOpened,
			isEditCurrentCatSectionOpened:isEditCurrentCatSectionOpened,
			setEditCurrentCatSectionOpened:setEditCurrentCatSectionOpened
		}}>
		<main className="App" id="crack">
			<div className="UserSector">
				<span className="UserSector">
					User:  <input

					type="text"
					className="UserSector"
					placeholder="username"
					autoComplete="off"

					onChange={async (e) => {
						let tmps

						setUser(e.target.value)
						setCurrentCat(NaN)

						setShowAllCatsSectionOpened(false)
						setShowAllIdsSectionOpened(false)
						setCreateNewCatSectionOpened(false)
						setEditCurrentCatSectionOpened(false)

						await Api.CheckUser(e.target.value).then(a => {
							tmps = a;
							setStatus(a)
						})
						let idinputfield = document.getElementById("catidinput")
						idinputfield.value = ''
						idinputfield.disabled = tmps !== "Online"
					}}
				/> Cat: <input

					type="number"
					className="UserSector"
					placeholder="ID"
					autoComplete="off"
					id="catidinput"
					disabled={true}

					onChange={(e) => {
						setCurrentCat(parseInt(e.target.value))

						setShowAllCatsSectionOpened(false)
						setShowAllIdsSectionOpened(false)
						setCreateNewCatSectionOpened(false)
						setEditCurrentCatSectionOpened(false)

						if (e.target.value === '')  Api.CheckUser(user).then(a => setStatus(a))
						else Api.CheckCat(user, e.target.value).then(a => setStatus(a))
					}}
				/> Status: {DisplayStatus(status)}
				</span>
			</div>
			<ShowAllCatsSection/>
			<ShowAllIdsSection/>
			<CreateNewCatSection/>
			<EditCurrentCatSection/>
		</main>
		</Context.Provider>
	);
}


export {App, Context};
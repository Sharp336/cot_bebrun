import React, {useState} from "react";
import ShowAllSection from "./Components/ShowAllSection";
import Api from "./api";

const Context = React.createContext({})
function DisplayStatus(status){
	switch (status){
		case "Online":
			return <b style={{color: "green"}}>Online</b>
		case "Empty":
			return <b style={{color: "orange"}}>Empty</b>
		default:
			return <b style={{color: "red"}}>Offline</b>
	}
}

function App() {
	const [user, setUser] = useState("username")
	const [currentCat, setCurrentCat] = useState(NaN)
	const [status, setStatus] = useState("Offline");
	const [data, setData] = useState({})
	let [isShowAllSectionOpened, setShowAllSectionOpened] = useState(false)
	return (
		<Context.Provider value={{
			status : status,
			setStatus: setStatus,
			user:user,
			setUser:setUser,
			data:data,
			setData:setData,
			isShowAllSectionOpened:isShowAllSectionOpened,
			setShowAllSectionOpened:setShowAllSectionOpened,
			currentCat:currentCat,
			setCurrentCat:setCurrentCat
		}}>
		<main className="App" id="crack">
			<div className="UserSector">
				<span className="UserSector">
					User:  <input

					type="text"
					className="UserSector"
					placeholder="username"
					autoComplete="off"

					onChange={(e) => {
						setUser(e.target.value)
						setShowAllSectionOpened(false)
						Api.CheckUser(e.target.value).then(a => setStatus(a))
					}}
				/> Cat: <input

					type="number"
					className="UserSector"
					placeholder="ID"
					autoComplete="off"

					onChange={(e) => {
						setCurrentCat(parseInt(e.target.value))
						setShowAllSectionOpened(false)
					}}
				/> Status: {DisplayStatus(status)}
				</span>
			</div>
			<ShowAllSection></ShowAllSection>
		</main>
		</Context.Provider>
	);
}


export {App, Context};
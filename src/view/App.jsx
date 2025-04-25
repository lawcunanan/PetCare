import "../styles/App.css";
import SideRegister from "./component/sideRegister";
import SideMenu from "./component/SideMenu";
import Header from "./component/mainHeader";
import MainChat from "./component/MainChat";
import MainField from "./component/MainField";
import MainWelcome from "./component/MainWelcome";
import { MyContextProvider } from "../controller/myContext.jsx";

import React, { useContext, useEffect, useState } from "react";
import MyContext from "../controller/myContext";
import LoadingLottie from "./component/loadingLottie.jsx";

const AppContent = () => {
	const { chats } = useContext(MyContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="Loading">
					<LoadingLottie />
				</div>
			) : (
				<>
					<section className="sidebar">
						<SideRegister />
						<SideMenu />
					</section>
					<section className="main">
						<Header />
						<main>
							{chats.length === 0 ? <MainWelcome /> : <MainChat />}
							<MainField />
						</main>
					</section>
				</>
			)}
		</>
	);
};

function App() {
	return (
		<MyContextProvider>
			<AppContent />
		</MyContextProvider>
	);
}

export default App;

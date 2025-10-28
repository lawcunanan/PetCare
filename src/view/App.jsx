import "../styles/App.css";
import SystemRoute from "../view/pages/systemRoute.jsx";
import { UserProvider } from "../context/userContext.jsx";
import { ChatProvider } from "../context/chatContext.jsx";

function App() {
	return (
		<UserProvider>
			<ChatProvider>
				<SystemRoute />
			</ChatProvider>
		</UserProvider>
	);
}

export default App;

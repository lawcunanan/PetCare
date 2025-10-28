import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Chat from "../pages/chat";
import Home from "../pages/home";

const SystemRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/auth/chat" element={<Chat />} />
		</Routes>
	);
};

export default SystemRoute;

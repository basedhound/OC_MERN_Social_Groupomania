import React from "react";
import { useNavigate } from "react-router";
// Style
import notfound from "../../assets/not-found.png";
import "./notfound.css";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="notfound">
			<h1>Cette page n'existe pas.</h1>
			<img src={notfound} alt="not-found" />
			<button onClick={() => navigate("/")}>Go Home</button>
		</div>
	);
};

export default NotFound;

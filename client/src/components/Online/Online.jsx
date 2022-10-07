// React
import React from "react";
import { Link } from "react-router-dom";
// Redux
// Features
// Style
import { dp } from "../../assets";
import "./online.css";

const Online = () => {

	const allUsers = () => {
		return (
		<Link to="/">
				<div className="user">
					<div>
						<img src={dp} alt="utilisateur" className="roundimage" />
					</div>
					<h3>Username</h3>
				</div>
			</Link>           
		);      
	};

	return (
		<section className="online">
			<h2>Utilisateurs</h2>
			{allUsers()}
		</section>
	);
};

export default Online;

// Signup Page (src/pages/Signup.js)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/auth";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			navigate("/profile");
		} catch (error) {
			console.error("Signup Error:", error.message);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
			<div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold mb-4">Sign Up</h2>
				<form onSubmit={handleSignup}>
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 mb-4 bg-gray-700 rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 mb-4 bg-gray-700 rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" className="w-full bg-red-600 p-2 rounded">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;

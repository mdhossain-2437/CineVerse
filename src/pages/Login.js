// Login Page (src/pages/Login.js)
import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/profile");
		} catch (error) {
			console.error("Login Error", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
			<h1 className="text-3xl mb-6">Login</h1>
			<form onSubmit={handleLogin} className="flex flex-col gap-4">
				<input
					type="email"
					placeholder="Email"
					className="p-2 bg-gray-800"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="p-2 bg-gray-800"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="bg-red-600 px-4 py-2">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;

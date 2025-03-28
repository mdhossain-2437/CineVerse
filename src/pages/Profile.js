// Protected Profile Page (src/pages/Profile.js)
import React from "react";
import { auth, signOut } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		navigate("/");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
			<h1 className="text-3xl">Welcome to Your Profile</h1>
			<button onClick={handleLogout} className="bg-red-600 px-4 py-2 mt-4">
				Logout
			</button>
		</div>
	);
}

export default Profile;

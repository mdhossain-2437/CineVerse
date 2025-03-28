// User Dashboard (src/pages/Dashboard.js)
import React, { useEffect, useState } from "react";
import { auth } from "../api/auth";
import { db } from "../api/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const [user, setUser] = useState(null);
	const [subscription, setSubscription] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				navigate("/login");
				return;
			}
			setUser(currentUser);

			const docRef = doc(db, "subscriptions", currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setSubscription(docSnap.data());
			}
		};

		fetchUserData();
	}, []);

	return (
		<div className="min-h-screen bg-gray-900 text-white p-8">
			<h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
			{user && (
				<div className="mb-6">
					<p>
						<strong>Email:</strong> {user.email}
					</p>
					<p>
						<strong>Subscription:</strong>{" "}
						{subscription ? subscription.plan : "No Subscription"}
					</p>
					{subscription && (
						<p>
							<strong>Subscribed At:</strong>{" "}
							{new Date(subscription.subscribedAt).toLocaleDateString()}
						</p>
					)}
				</div>
			)}
			{!subscription && (
				<button
					onClick={() => navigate("/subscription")}
					className="bg-red-600 px-6 py-2 rounded"
				>
					Get Subscription
				</button>
			)}
		</div>
	);
}

export default Dashboard;

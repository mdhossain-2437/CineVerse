// Subscription Page (src/pages/Subscription.js)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../api/firestore";

function Subscription() {
	const [plan, setPlan] = useState("basic");
	const navigate = useNavigate();

	const handleSubscription = async () => {
		const user = auth.currentUser;
		if (!user) return;

		await setDoc(doc(db, "subscriptions", user.uid), {
			plan,
			subscribedAt: new Date().toISOString(),
		});

		navigate("/profile");
	};

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
			<h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>
			<div className="flex gap-4">
				<button
					className={`p-4 bg-gray-700 rounded ${
						plan === "basic" ? "border-2 border-red-500" : ""
					}`}
					onClick={() => setPlan("basic")}
				>
					Basic
				</button>
				<button
					className={`p-4 bg-gray-700 rounded ${
						plan === "premium" ? "border-2 border-red-500" : ""
					}`}
					onClick={() => setPlan("premium")}
				>
					Premium
				</button>
			</div>
			<button
				onClick={handleSubscription}
				className="mt-6 bg-red-600 px-6 py-2 rounded"
			>
				Subscribe
			</button>
		</div>
	);
}

export default Subscription;


// Subscription Page (src/pages/Subscription.js)
import React, { useEffect, useState } from "react";
import { auth } from "../api/auth";
import { db } from "../api/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Subscription() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSubscription = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/login");
        return;
      }
      setUser(currentUser);
      const docRef = doc(db, "subscriptions", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlan(docSnap.data().plan);
      }
    };
    fetchUserSubscription();
  }, []);

  const subscribe = async (selectedPlan) => {
    if (!user) return;
    await setDoc(doc(db, "subscriptions", user.uid), {
      plan: selectedPlan,
      subscribedAt: Date.now()
    });
    setPlan(selectedPlan);
    alert("Subscription successful!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Subscription Plans</h1>
      {plan ? (
        <p>You are subscribed to the {plan} plan.</p>
      ) : (
        <div>
          <button onClick={() => subscribe("Basic")} className="bg-blue-600 px-6 py-2 rounded mr-4">Basic Plan</button>
          <button onClick={() => subscribe("Premium")} className="bg-green-600 px-6 py-2 rounded">Premium Plan</button>
        </div>
      )}
    </div>
  );
}

export default Subscription;


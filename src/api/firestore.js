// Firebase Firestore (src/api/firestore.js)
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { auth } from "./auth";

const db = getFirestore();

export const addToWatchlist = async (movie) => {
	const user = auth.currentUser;
	if (!user) return;

	const userRef = doc(db, "watchlists", user.uid);
	const docSnap = await getDoc(userRef);

	if (!docSnap.exists()) {
		await setDoc(userRef, { movies: [movie] });
	} else {
		await updateDoc(userRef, { movies: arrayUnion(movie) });
	}
};

export const removeFromWatchlist = async (movie) => {
	const user = auth.currentUser;
	if (!user) return;
	const userRef = doc(db, "watchlists", user.uid);
	await updateDoc(userRef, { movies: arrayRemove(movie) });
};

export const getWatchlist = async () => {
	const user = auth.currentUser;
	if (!user) return [];
	const userRef = doc(db, "watchlists", user.uid);
	const docSnap = await getDoc(userRef);
	return docSnap.exists() ? docSnap.data().movies : [];
};

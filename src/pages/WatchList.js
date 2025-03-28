// Watchlist Page (src/pages/Watchlist.js)
import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../api/firestore";

function Watchlist() {
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		getWatchlist().then(setWatchlist);
	}, []);

	return (
		<div className="bg-gray-900 text-white p-8 min-h-screen">
			<h1 className="text-3xl font-bold">My Watchlist</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{watchlist.map((movie) => (
					<div key={movie.id} className="cursor-pointer">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="rounded-lg"
						/>
						<p className="mt-2">{movie.title}</p>
						<button
							onClick={() => removeFromWatchlist(movie)}
							className="bg-red-600 px-4 py-2 mt-2"
						>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Watchlist;


// Watchlist Page (src/pages/Watchlist.js)
import React, { useEffect, useState } from "react";
import { auth } from "../api/auth";
import { db } from "../api/firestore";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "watchlist"));
      const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWatchlist(movies);
    };
    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "watchlist", id));
    setWatchlist(watchlist.filter(movie => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <ul>
          {watchlist.map(movie => (
            <li key={movie.id} className="flex justify-between items-center bg-gray-800 p-4 rounded mb-2">
              <span>{movie.title}</span>
              <button onClick={() => removeFromWatchlist(movie.id)} className="bg-red-600 px-4 py-2 rounded">Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies in your watchlist.</p>
      )}
    </div>
  );
}

export default Watchlist;

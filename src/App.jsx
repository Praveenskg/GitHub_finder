import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";
const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error(
          `GitHub API returned ${response.status} - ${response.statusText}`
        );
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingScreen />
      <div className="flex flex-col items-center h-[100vh]">
        <h1 className="text-4xl font-semibold mb-4">GitHub User Finder</h1>

        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            required
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Search
          </button>
        </form>
        {isLoading && (
          <div className="relative flex w-64 animate-pulse gap-2 p-4">
            <div className="h-12 w-12 rounded-full bg-slate-400"></div>
            <div className="flex-1">
              <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
              <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
            </div>
            <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
          </div>
        )}
        {user && !isLoading && (
          <div className="">
            <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 text-slate-900 dark:!shadow-none">
              <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                  className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                />
                <div className="absolute -bottom-12 flex  h-[150px] w-[150px]  items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img
                    className="h-full w-full rounded-full"
                    src={user.avatar_url}
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 text-slate-900">
                  {user.name}
                </h4>
                <p className="text-base font-normal text-gray-600">
                  {user.bio}
                </p>
              </div>
              <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 text-stone-900">
                    {user.public_repos}
                  </p>
                  <p className="text-sm font-normal text-gray-600">Repos</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 text-slate-900">
                    {user.followers}
                  </p>
                  <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 text-slate-900">
                    {user.following}
                  </p>
                  <p className="text-sm font-normal text-gray-600">Following</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <a
                  className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                  href={user.html_url}
                  target="_blank"
                >
                  Folow
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

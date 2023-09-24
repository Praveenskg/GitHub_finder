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
      <div className="  bg-gray-100 overflow-hidden h-[100vh] ">
        <div className="">
          <h1 className=" text-3xl md:text-4xl   shadow-blue-200 lg:text-5xl text-center font-bold text-dark ">
            Github Finder
          </h1>
          <div className="flex w-full items-center justify-center m-4">
            <form
              className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white"
              onSubmit={handleSearch}
            >
              <div className="my-8 flex">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="text"
                  className="w-full border rounded-md p-3"
                  placeholder="Enter GitHub Username"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-3 px-6 rounded mx-3 hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {isLoading && (
          <div className="flex w-full items-center justify-center m-4">
            <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
              <div className=" flex w-64 animate-pulse gap-2 p-4">
                <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                <div className="flex-1">
                  <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                  <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                </div>
                <div className="bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
              </div>
            </div>
          </div>
        )}
        {user && !isLoading && (
          <div className="flex   w-full items-center justify-center m-4">
            <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="grid-cols-1 lg:col-span-3">
                  <div className="mx-auto flex h-[150px] w-[150px] max-w-full items-center justify-center rounded-full bg-blue-100 p-4">
                    <img
                      alt="..."
                      src={user.avatar_url}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-9">
                  <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-zinc-700">
                      {user.name}
                    </h2>
                    <p className="mt-2 font-semibold text-zinc-700">
                      @{user.login}
                    </p>
                    <p className="mt-4 text-zinc-500">{user.bio}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left">
                    <div>
                      <p className="font-bold text-zinc-700">
                        {user.public_repos}
                      </p>
                      <p className="text-sm font-semibold text-zinc-700">
                        Repos
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-zinc-700">
                        {user.followers}
                      </p>
                      <p className="text-sm font-semibold text-zinc-700">
                        Followers
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-zinc-700 ">
                        {user.following}
                      </p>
                      <p className="text-sm font-semibold text-zinc-700">
                        Following
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">
                        Follow
                      </button>
                    </a>

                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">
                        View Profile
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

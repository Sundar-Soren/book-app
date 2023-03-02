import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const Layout = () => {
    const [fetchedBooks, setFetchedBooks] = useState({});
    const [searchBySubject, setSearchBySubject] = useState("");
    const [loading, setLoading] = useState(true);

    const [queryParameters] = useSearchParams();
    const queryValue = queryParameters.get("search");
    const page = queryParameters.get("page") || 0;
    const getBooksAPI = async () => {
      setLoading(true);
      try {
        const data_title = await axios.get(
          `https://openlibrary.org/search.json?q=${queryValue}&limit=10&offset=${
            page * 10
          }`
        );
        console.log(data_title);
        setFetchedBooks(data_title.data.docs);
        if (data_title.data.docs.length == 0) {
          const data_author = await axios.get(
            `https://openlibrary.org/search.json?author=${queryValue}&limit=10&offset=${
              page * 10
            }`
          );
          setFetchedBooks(data_author.data.docs);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
      if (queryValue?.length >= 1) {
        getBooksAPI();
      }
    }, [page]);
    console.log(loading);
    return (
      <div className="flex bg-gray-500">
        <div className="w-96 h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="w-screen">
          <Navbar getBooksAPI={getBooksAPI} />
          {!loading ? (
            <HomePage fetchedBooks={fetchedBooks} getBooksAPI={getBooksAPI} />
          ) : (
            <div className="px-10">
              <div
                role="status"
                class="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>

                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <LoadingComponent />
                <LoadingComponent />
                <LoadingComponent />
                <LoadingComponent />
                <LoadingComponent />
                <LoadingComponent />
                <LoadingComponent />
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: "",
        //   element: <Contact />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

const LoadingComponent = () => {
  return (
    <div class="flex items-center justify-between pt-5">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>

      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
  );
};

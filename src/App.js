import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
  useSearchParams,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Loading } from "./helper";
import { setBookList, setBooksLoading } from "./redux/data_slice";

const App = () => {
  const Layout = () => {
    const dispacth = useDispatch();
    const [fetchedBooks, setFetchedBooks] = useState({});
    const [queryParameters] = useSearchParams();
    const queryValue = queryParameters.get("search");
    const page = queryParameters.get("page") || 0;

    const loading = useSelector((state) => state.books_list.loading);

    const getBooksAPI = async () => {
      dispacth(setBooksLoading(true));
      try {
        const data_title = await axios.get(
          `https://openlibrary.org/search.json?q=${queryValue}&limit=10&offset=${
            page * 10
          }`
        );
        setFetchedBooks(data_title.data.docs);
        dispacth(
          setBookList({
            type: "Author_or_Title",
            payload: data_title.data.docs,
          })
        );
        if (data_title.data.docs.length == 0) {
          const data_author = await axios.get(
            `https://openlibrary.org/search.json?author=${queryValue}&limit=10&offset=${
              page * 10
            }`
          );
          setFetchedBooks(data_author.data.docs);
          dispacth(
            setBookList({
              type: "Author_or_Title",
              payload: data_author.data.docs,
            })
          );
        }
        dispacth(setBooksLoading(false));
      } catch (error) {
        dispacth(setBooksLoading(false));
        console.log(error.message);
      }
    };

    useEffect(() => {
      if (queryValue?.length >= 1) {
        getBooksAPI();
      }
    }, [page]);
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
            <Loading />
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
        {
          path: "/subject/:subject",
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

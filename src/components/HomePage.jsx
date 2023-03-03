import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Loading } from "../helper";
import { setBookList } from "../redux/data_slice";

const HomePage = () => {
  const loading = useSelector((state) => state.books_list.loading);

  const [searchParams, setSearchParams] = useSearchParams();
  const booksList = useSelector((state) => state.books_list);
  const [subjectOffset, setSubjectOffset] = useState(0);
  const dispacth = useDispatch();

  const { subject } = useParams();
  useEffect(() => {
    if (subject?.length > 1) getBooksBySubject();
  }, [subject, subjectOffset]);

  const getBooksBySubject = async () => {
    try {
      const books_data = await axios.get(
        `https://openlibrary.org/subjects/${subject}.json?offset=${subjectOffset}&limit=10`
      );
      dispacth(
        setBookList({
          type: "Subject",
          payload: books_data.data.works,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {booksList.book_data_list?.length > 0 && !loading ? (
        <div className="px-8 pb-7">
          <div className="relative md:flex overflow-hidden">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title and Sub Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Latest Publish Year
                  </th>
                  <th scope="col" className="px-6 py-3">
                    First Publish Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {booksList.book_data_list?.length > 0 &&
                  booksList.book_data_list.map((data, key) => (
                    <tr className="bg-white dark:bg-gray-800" key={key}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.title}
                      </th>
                      <td className="px-6 py-4">
                        {booksList?.booksType == "Subject"
                          ? data.authors[0]?.name && data?.authors[0].name
                          : data.author_name && data?.author_name[0]}
                      </td>

                      <td className="px-6 py-4">
                        {" "}
                        {booksList?.booksType == "Subject"
                          ? data.first_publish_year
                          : data.publish_year && data.publish_year[0]}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        {booksList?.booksType == "Subject"
                          ? data.first_publish_year
                          : data.publish_year &&
                            data.publish_year[data.publish_year.length - 1]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-row mt-2 w-max ml-auto">
            <button
              type="button"
              className={
                parseInt(searchParams.get("page")) >= 1 || subjectOffset >= 1
                  ? `bg-blue-800 text-white font-semibold rounded mr-1  py-2 hover:bg-blue-500 hover:text-white px-3`
                  : ` text-white opacity-60 bg-blue-700 rounded focus:outline-none font-semibold rounded-l-md border-r  py-2 px-3`
              }
              disabled={
                !(parseInt(searchParams.get("page")) >= 1 || subjectOffset >= 1)
              }
              onClick={() => {
                if (booksList.booksType == "Subject") {
                  setSubjectOffset((state) => state - 1);
                  return;
                }
                setSearchParams(
                  createSearchParams({
                    search: searchParams.get("search"),
                    page: (parseInt(searchParams.get("page")) || 0) - 1,
                  })
                );
              }}
            >
              <div className="flex flex-row align-middle">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <button
              type="button"
              className={
                booksList.book_data_list?.length < 10
                  ? ` text-white opacity-60 bg-blue-700 rounded focus:outline-none font-semibold border-r  py-2 px-3`
                  : `bg-blue-800 text-white font-semibold rounded  py-2 hover:bg-blue-500 hover:text-white px-3`
              }
              onClick={() => {
                if (booksList.booksType == "Subject") {
                  setSubjectOffset((state) => state + 1);
                  return;
                }

                setSearchParams(
                  createSearchParams({
                    search: searchParams.get("search"),
                    page: (parseInt(searchParams.get("page")) || 0) + 1,
                  })
                );
              }}
              disabled={booksList.book_data_list?.length < 10}
            >
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg
                  className="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <h1 className="h-96 text-yellow-50 text-center text-6xl justify-center font-bold flex items-center">
          Search Something
        </h1>
      )}
    </div>
  );
};

export default HomePage;

import React, { useEffect } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

const HomePage = ({ fetchedBooks }) => {
  console.log(fetchedBooks);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="px-8 pb-7">
      <div class="relative md:flex overflow-hidden">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Title and Sub Title
              </th>
              <th scope="col" class="px-6 py-3">
                Author
              </th>
              <th scope="col" class="px-6 py-3">
                Latest Publish Year
              </th>
              <th scope="col" class="px-6 py-3">
                First Publish Year
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedBooks.length > 0 &&
              fetchedBooks.map((data) => (
                <tr class="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.title}
                  </th>
                  <td class="px-6 py-4">{data.author_name[0]}</td>
                  <td class="px-6 py-4">
                    {data.publish_year[data.publish_year.length - 1]}
                  </td>
                  <td class="px-6 py-4"> {data.publish_year[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div class="flex flex-row mt-2 w-max ml-auto">
        <button
          type="button"
          class={
            !parseInt(searchParams.get("page")) >= 1
              ? ` text-white opacity-60 bg-blue-700 rounded focus:outline-none font-semibold rounded-l-md border-r  py-2 px-3`
              : `bg-blue-800 text-white font-semibold rounded mr-1  py-2 hover:bg-blue-500 hover:text-white px-3`
          }
          disabled={!parseInt(searchParams.get("page")) >= 1}
          onClick={() => {
            setSearchParams(
              createSearchParams({
                search: searchParams.get("search"),
                page: (parseInt(searchParams.get("page")) || 0) - 1,
              })
            );
          }}
        >
          <div class="flex flex-row align-middle">
            <svg
              class="w-5 mr-2"
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
            <p class="ml-2">Prev</p>
          </div>
        </button>
        <button
          type="button"
          class={
            parseInt(searchParams.get("page")) >= 20
              ? ` text-white opacity-60 bg-blue-700 rounded focus:outline-none font-semibold border-r  py-2 px-3`
              : `bg-blue-800 text-white font-semibold rounded  py-2 hover:bg-blue-500 hover:text-white px-3`
          }
          onClick={() => {
            setSearchParams(
              createSearchParams({
                search: searchParams.get("search"),
                page: (parseInt(searchParams.get("page")) || 0) + 1,
              })
            );
          }}
        >
          <div class="flex flex-row align-middle">
            <span class="mr-2">Next</span>
            <svg
              class="w-5 ml-2"
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
  );
};

export default HomePage;

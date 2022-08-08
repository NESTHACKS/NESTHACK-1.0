import { Popover } from "@headlessui/react";
import { FaList, FaTh, FaUpload } from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";
import Prompt from "../components/UploadPrompt";
import Pagination from "../components/Pagination";

const LandingPage = ({ connectWallet, currentAccount, data }) => {
  let PageSize = 12;
  const [listView, setListView] = useState(false);
  const [uploadPrompt, setUploadPrompt] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [files, setFiles] = useState(data);

  const searchFile = files.filter((f) =>
    f.title.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchField(event.target.value);
  };

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchFile.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  // useEffect(() => {
  //   setFiles(data);
  //   console.log(currentPageData);
  // }, [currentAccount, currentPageData]);

  return (
    <>
      <div className="relative bg-white overflow-hidden z-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="pt-6 px-4 sm:px-6 lg:px-8 ">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <div href="#">
                        <span className="sr-only">NestCoin</span>
                        <h1 className="h-8 w-auto sm:h-10 text-indigo-600 text-3xl font-extrabold">
                          NestCoin
                        </h1>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </Popover>
            {!currentAccount && (
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block text-gray-600 xl:inline">
                      NestCoin Library
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    A highly competitive game competition focusing on blockchain
                    technology and how to leverage it for solving real life
                    problems.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <button className="w-full outline-none flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                        Get started
                      </button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        onClick={() => connectWallet()}
                        className="w-full flex outline-none items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
        {!currentAccount && (
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              alt="Library"
              src="https://media.istockphoto.com/photos/filing-in-file-cabinet-picture-id618963716?b=1&k=20&m=618963716&s=170667a&w=0&h=DEsyMypk5YyCtXKOXE3XIbwjkbVJXY8ykco3ip-Y6mA="
            />
          </div>
        )}
      </div>
      <div className="antialiased font-sans ">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="px-4 md:px-10 py-4 md:py-7">
              <div className="flex items-center justify-between">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
                >
                  Files
                </p>
                <div className="flex">
                  <div className="py-3 px-4 mr-2 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <p>Sort By:</p>
                    <select
                      aria-label="select"
                      className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                    >
                      <option className="text-sm text-indigo-800">
                        Latest
                      </option>
                      <option className="text-sm text-indigo-800">
                        Oldest
                      </option>
                    </select>
                  </div>
                  <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    {listView ? (
                      <FaTh
                        className="h-6 w-6"
                        onClick={() => setListView(false)}
                      />
                    ) : (
                      <FaList
                        className="h-6 w-6"
                        onClick={() => setListView(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 flex justify-center sm:flex-row flex-col">
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  onChange={(e) => handleSearch(e)}
                  className="appearance-none rounded  border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <button
                onClick={() => setUploadPrompt(true)}
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 mb-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <FaUpload className="text-white h-3 w-3 mr-1" />
                <p className="text-sm font-medium leading-none text-white">
                  Upload File
                </p>
              </button>
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                {listView && (
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Files
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          size
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchFile.map((f) => (
                        <tr key={f.title + f._id}>
                          <td
                            className={`px-5 py-5 border-b  bg-white text-sm bg-clip-padding bg-opacity-60 border border-gray-200`}
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-md"
                                  src={f.imageUrl}
                                  alt={f.title}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {f.title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {f.description}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {f.size}kb
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Activo</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {!listView && (
                  <div className="flex items-center justify-center">
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
                      {searchFile.map((f) => (
                        <div
                          className="flex flex-col gap-1"
                          key={f.title + f._id}
                        >
                          <div href="" className="bg-indigo-500">
                            <img
                              src={f.imageUrl}
                              alt={f.title}
                              className="hover:translate-x-1 h-56 w-48 md:h-64 md:w-48   hover:-translate-y-1 delay-50 duration-100"
                            />
                          </div>

                          <div className="hover:text-purple-500 text-gray-800 font-semibold">
                            {" "}
                            {f.title}{" "}
                          </div>

                          <div
                            href="#"
                            className="hover:text-purple-500 text-sm text-gray-400 -mt-1"
                          >
                            {" "}
                            {f.size}kb{" "}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Pagination */}
                <Pagination
                  itemsCount={searchFile.length}
                  pageSize={PageSize}
                  onNext={() => setCurrentPage(currentPage + 1)}
                  onPrevious={() => setCurrentPage(currentPage - 1)}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Prompt
        handleOpenClose={uploadPrompt}
        onClose={() => setUploadPrompt(false)}
      />
    </>
  );
};

export default LandingPage;

import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

const Nav = ({ address }) => {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: 'Markets' },
    { title: 'Guides' },
    { title: 'Partners' },
  ];
  return (
    <nav className="bg-[#011936]  pt-6">
      <div className="items-center px-4  mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="text-white hover:text-[#BD1E51] font-extrabold text-4xl">
            bitSpine
          </div>
          <div className="md:hidden">
            <button
              className="text-white outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-white hover:text-[#BD1E51]">
                  <div>{item.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden md:inline-block">
          <div className="py-3 px-4 text-white bg-gray-700 hover:bg-white hover:text-black rounded-md shadow">
            {address &&
              address.slice(0, 5) +
                '...' +
                address.slice(address.length - 4, address.length)}
            {/* 0x86...43e4 */}
          </div>
        </div>
        <div className="hidden md:inline-block bg-gray-700 hover:text-black rounded-md p-2 ml-1 cursor-pointer ">
          <FaCog className="h-6 w-6 text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;

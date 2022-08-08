/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

const Prompt = (props) => {
  const cancelButtonRef = useRef(null);
  const {
    heading,
    subheading,
    onClose,
    onSubmit,
    button,
    show,
    onChangeAmount,
    placeholder,
  } = props;

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => false}
      >
        <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-slate-600 rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg  sm:w-full ">
              <div
                className="h-10 w-10 flex absolute right-2 top-2 items-center justify-center text-center  "
                onClick={onClose}
              >
                <FaTimes className="h-5 w-5 text-white " />
              </div>
              <div className="bg-slate-600 pt-5 pb-4 sm:p-8 sm:pb-4">
                <div className="flex justify-center ">
                  <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-white"
                    >
                      {heading}
                    </Dialog.Title>
                    <div className="mt-2 text-center">
                      <p className="text-sm text-gray-50">{subheading}</p>
                    </div>

                    <form
                      className="mt-8 w-full space-y-6"
                      action="#"
                      method="POST"
                    >
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-1">
                          <label htmlFor="amount" className="sr-only">
                            Amount
                          </label>
                          <input
                            id="amount"
                            name="amount"
                            type="number"
                            required
                            onChange={onChangeAmount}
                            className="appearance-none bg-slate-500 relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-200 text-gray-100 rounded focus:outline-none focus:ring-white focus:border-white  focus:z-10 sm:text-sm"
                            placeholder={placeholder}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 ">
                <button
                  type="button"
                  className="w-full outline-none inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onSubmit}
                >
                  {button}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Prompt;

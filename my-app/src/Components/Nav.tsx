import { Fragment } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const state = useSelector((state: any) => state.cartReducer);
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.reload();

  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link to={'/cart'} className=' text-white font-bold text-xl relative '>
                      Cart
                      <p className='absolute top-[-12px] right-[-10px] '>{state?.cart?.length}</p>
                    </Link>
                    {
                      !localStorage.getItem("token")
                        ? <Link to={'/login'} className='text-white font-bold text-xl'>Sign In</Link> : <button onClick={handleLogout}>Logout</button>
                    }
                    <Link to={'/'} className=' text-white font-bold text-xl relative '>
                      Home
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                </button>


              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link to={'/cart'} className=' text-white font-bold text-xl relative '>
                Cart
                <p className='absolute top-[-12px] right-[-10px] '>{state?.cart?.length}</p>
              </Link>
                    {
                !localStorage.getItem("token")
                  ? <Link to={'/login'} className='text-white font-bold text-xl'>Sign In</Link> : <button onClick={handleLogout}>Logout</button>
              }
              <Link to={'/'} className=' text-white font-bold text-xl relative '>
                Home
              </Link>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

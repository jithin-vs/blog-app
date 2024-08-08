import Image from "next/image";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { RiAccountCircleLine ,RiSettings3Fill} from "react-icons/ri";
 
const SideBar = ({ image }) => {
  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <a href="#" className="mx-auto">
        {image&&<Image
          className="w-auto h-6 sm:h-7"
          src={image}
          alt="next.svg"
          width={500}
          height={300}
        />
        }
      </a>

      <div className="flex flex-col items-center mt-6 -mx-2">
        {image && <Image
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src={image}
          alt="avatar"
          width={500}
          height={300}
        />}
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
          John Doe
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          john@example.com
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <a
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
            href="#"
          >
            <RxDashboard size={24}/>
            <span className="mx-4 font-medium">Dashboard</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
               <RiAccountCircleLine size={24} />

            <span className="mx-4 font-medium">Accounts</span>
          </a>
 

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <RiSettings3Fill size={24}/>

            <span className="mx-4 font-medium">Settings</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;

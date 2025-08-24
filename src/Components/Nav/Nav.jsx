import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './../../Contexts/UserContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function Nav() {

  
  let{token,changeToken,setuserId,id}=useContext(userContext);
  let queryClient = useQueryClient();
  const navigate = useNavigate();
  let [showNavDropDown,setShowNavDropDown] = useState(false);
  let navDropDownRef = useRef(null);
  
  let {error,isError,data,isLoading} = useQuery({
    queryKey:['currentData'],
    queryFn:()=>axios.get('https://linked-posts.routemisr.com/users/profile-data',{headers:{token}}),
    select:(data)=>data.data.user
  })

useEffect(() => {
    function handleClickOutside(e) {
      if (navDropDownRef.current && !navDropDownRef.current.contains(e.target)) {
        setShowNavDropDown(false);
      }
    }

    if (showNavDropDown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNavDropDown]);

  function handleLogout(){
    changeToken(null);
    setuserId(null);
    queryClient.removeQueries({ queryKey: ['currentData'] });
    navigate('/login')
  }

  useEffect(()=>{
    !id&&data&&setuserId(data._id);
  },[data?._id])

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Social Media</span>
        </Link>
        <div className="flex gap-3">
        {token?(<>
          <div className="flex items-center relative md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          
            <button ref={navDropDownRef} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={(e) => { setShowNavDropDown((prev) => !prev); e.stopPropagation(); }} >
              <img className="w-8 h-8 rounded-full" src={data?.photo} alt="user photo" />
            </button>
            {/* Dropdown menu */}
            {showNavDropDown && <div className="z-50  absolute top-8  right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{data?.name}</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{data?.email}</span>
              </div>
              <ul className="py-2">
                <li>
                  <span onClick={()=>{navigate('/profile');}}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</span>
                </li>
                <li>
                  <span onClick={()=>{navigate('/settings');}}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">User Settings</span>
                </li>
                <li>
                  <span onClick={handleLogout}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
                </li>
              </ul>
            </div>}
          </div>
          </>):
          (<>
            <Link className='text-black dark:text-white' to="/login">Login</Link>
            <Link className='text-black dark:text-white' to="/signup">Signup</Link>
           </>)} 
        </div>
      
      </div>
    </nav>

  )
}

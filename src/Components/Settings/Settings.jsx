import React, { useContext, useState } from 'react'
import style from './Settings.module.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { userContext } from '../../Contexts/UserContext'

export default function Settings() {

  let queryClient = useQueryClient();
  let {token, changeToken} = useContext(userContext);
  
  let[isChangePasswordLoading,setIsChangePasswordLoading] = useState(false);

  let {error,isError,data,isloading} = useQuery({
    queryKey:['currentData'],
    queryFn:()=>axios.get('https://linked-posts.routemisr.com/users/profile-data',{headers:{token}}),
    select:(data)=>data.data.user
  })

  console.log(data)

  const changePassForm = useForm({
        defaultValues:{
          password:"",
          newPassword:"",
      }
    });
  
    const {formState, register, handleSubmit, reset:resetPassForm} = changePassForm;

    function handleChangePassword(data){
    setIsChangePasswordLoading(true);
    axios.patch('https://linked-posts.routemisr.com/users/change-password',data,{headers:{token}}
    ).
    then(response => {
      changeToken(response.data.token)
      resetPassForm();
      toast.success('password changed successfuly')
      console.log(response)
    }).catch(error=>{
      toast.error('Can\'t change the password')
      console.log(error)
    }).finally(()=>{
        setIsChangePasswordLoading(false);
      })
  }
  function handleChangeImg(e){
    let changePhotoImg = new FormData();
    changePhotoImg.append('photo',e.target.files[0]);
    axios.put('https://linked-posts.routemisr.com/users/upload-photo',changePhotoImg,{headers:{token}}
    ).
    then(response => {
      toast.success('photo changed successfuly');
      queryClient.invalidateQueries({queryKey:['currentData']});
    }).catch(error=>{
      toast.error('Can\'t change the photo');
    })
  }

  return (
    <div className='w-full md:w-[80%] mx-auto border-2 border-slate-800 rounded-lg p-4 mt-6 bg-sky-100'>
        <div className="flex flex-wrap h-[80vh]">
          <div className='md:w-1/2 w-full flex  justify-center items-center '>
            <div className='w-fit h-fit relative'>
              <label htmlFor="change-img">
                <img className='size-[400px] rounded-full border-2 border-sky-950' src={data?.photo} alt="user photo"/>
                <div className="cursor-pointer absolute bottom-1/8 right-1/8  size-[50px] translate-1/2 bg-slate-100 border-2 border-sky-400 rounded-full flex justify-center items-center">
                  <i className="cursor-pointer fa-solid fa-pencil fa-lg"></i>
                </div>
              </label> 
              <input id='change-img' className='hidden' type="file" accept="image/*" onChange={handleChangeImg}/>
            </div>
          </div>
          <div className='md:w-1/2 w-full flex  justify-center items-center'>
            <form onSubmit={handleSubmit(handleChangePassword)} className="mx-auto my-5 lg:w-[70%] ">
              <div className="relative z-0 w-full mb-10 group">
                <input type="password" {...register('password')} id="password" className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current Password</label>
              </div>
              <div className="relative z-0 mb-10 w-fullgroup">
                <input type="password" {...register('newPassword')} id="newPassword" className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
              </div>

              <div className='text-center'>
                <button type="submit" disabled={isChangePasswordLoading}  className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isChangePasswordLoading?<i className='fas fa-spinner fa-spin'></i>:'Change Password'}</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

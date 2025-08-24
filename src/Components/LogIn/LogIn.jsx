import React, { useContext, useState } from 'react'
import style from './LogIn.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import axios  from 'axios';
import { useNavigate } from 'react-router-dom'
import  '@fortawesome/fontawesome-free/css/all.css'
import { userContext } from './../../Contexts/UserContext';
import { QueryClient, useQueryClient } from '@tanstack/react-query'
export default function Login() {

  let{changeToken}=useContext(userContext)
  let[apiErrorResp,setApiErrorResp] = useState(null);
  let[isLoading,setIsLoading] = useState(false);
  let queryClient = useQueryClient();
  const navigate = useNavigate();

  const schema = z.object({
      email:z.email("invalid Email"),
      password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password should contain atleast one capital and one small letter and one sympol'#?!@$%^&*-'"),
      })  
    const regForm = useForm({
      defaultValues:{
        email:"",
        password:"",
    },
    resolver: zodResolver(schema)
  });

  const {formState, register, handleSubmit} = regForm;
  function handleSignIn(data){
    setIsLoading(true);
    axios.post('https://linked-posts.routemisr.com/users/signin',data).
    then(response => {
      changeToken(response.data.token);
      queryClient.invalidateQueries({queryKey:['currentData']});
      navigate('/');
    }).catch(error=>{
      setApiErrorResp(error.response.data.error)
    }).finally(()=>{
        setIsLoading(false);
      })
  }

  return (
    <>
      {apiErrorResp?(<div className="p-4 mb-5 text-xl font-bold text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         {apiErrorResp}
      </div>): null}
      <form onSubmit={handleSubmit(handleSignIn)} className="md:max-w-md w-[70%] mx-auto my-5">
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" {...register('email')} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
        </div>
        {formState.errors.email && formState.touchedFields.email?(<div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formState.errors.email.message}
        </div>): null}
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" {...register('password')} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
        </div>
        {formState.errors.password && formState.touchedFields.password?(<div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formState.errors.password.message}
        </div>): null}

      
        <button type="submit" disabled={isLoading}  className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Log In'}</button>
      </form>
    </>
  )
}

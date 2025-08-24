import React, { useState } from 'react'
import style from './SignUp.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import axios  from 'axios';
import { useNavigate } from 'react-router-dom'
import  '@fortawesome/fontawesome-free/css/all.css'
export default function SignUp() {
  
  let[apiErrorResp,setApiErrorResp] = useState(null);
  let[isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
      name: z.string().min(3,"should be from 3 to 15 letters").max(15,"should be from 3 to 15 letters"),
      email:z.email("invalid Email"),
      password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password should contain atleast one capital and one small letter and one sympol'#?!@$%^&*-'"),
      rePassword:z.string(),
      dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((data)=>{
        return new Date(data) < Date.now();
      },'can\'t be a future value'),
      gender : z.enum(['male','female'],'gender must be male or female')
  }).refine(obj=>{return obj.rePassword === obj.password},{path:['rePassword'],error:'password and repassword don\'t match'})
  const regForm = useForm({
    defaultValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      dateOfBirth:"",
      gender:""
    },
    resolver: zodResolver(schema)
  });

  const {formState, register, handleSubmit} = regForm;
  function handleRegister(data){
    setIsLoading(true);
    axios.post('https://linked-posts.routemisr.com/users/signup',data).
    then(response => {
      navigate('/login')
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
      <form onSubmit={handleSubmit(handleRegister)} className="md:max-w-md w-[70%] mx-auto my-5">
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" {...register('name')} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
        </div>
        {formState.errors.name && formState.touchedFields.name?(<div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formState.errors.name.message}
        </div>): null}
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
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" {...register('rePassword')}  id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
        </div>
        {formState.errors.rePassword && formState.touchedFields.rePassword?(<div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formState.errors.rePassword.message}
        </div>): null}
        <div className="relative z-0 w-full mb-5 group">
          <input type="date" {...register('dateOfBirth')} id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">dateOfBirth</label>
        </div>
        {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth?(<div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formState.errors.dateOfBirth.message}
        </div>): null}
        <div className="flex item-center gap-4 mb-2">
            <div className="flex items-center">
              <input id="male" type="radio" value="male"   {...register('gender')}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
            </div>
            <div className="flex items-center">
              <input  id="female" value="female" type="radio"  {...register('gender')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
            </div>
        </div>
        {formState.errors.gender && formState.touchedFields.gender?(<div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formState.errors.gender.message}
        </div>): null}

      
        <button type="submit" disabled={isLoading} className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'SignUp'}</button>
      </form>
    </>
  )
}

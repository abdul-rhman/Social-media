import React, { useContext } from 'react'
import style from './Profile.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { userContext } from './../../Contexts/UserContext';
import UserPosts from './../UserPosts/UserPosts';

export default function Profile() {

  let {token} = useContext(userContext);
  let {error,isError,data,isLoading} = useQuery({
    queryKey:['currentData'],
    queryFn:()=>axios.get('https://linked-posts.routemisr.com/users/profile-data',{headers:{token}}),
    select:(data)=>data.data.user
  })
  return (
    <>
      <div className='w-full md:w-[80%] lg:wd:w-[60%] mx-auto text-center border-2 border-slate-800 rounded-lg p-4'>
        <img src={data?.photo} className='size-[64px] rounded-full mx-auto border-2 border-transparent hover:border-slate-900' alt="" />
        <p>Name: {data?.name}</p>
        <p>Gender: {data?.gender}</p>
        <p>E-mail: {data?.email}</p>
        <p>BirthDay: {data?.dateOfBirth}</p>
      </div>
      {data?<UserPosts userId={data?._id}/>:null}
    </>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios';
import { userContext } from '../../Contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import Comment from './../Comment/Comment';
import { useNavigate } from 'react-router-dom';

export default function Home() {

let {token} = useContext(userContext);

let {data, error, isError, isLoading} = useQuery({
  queryKey: ['postsQuery'],
  queryFn:_=>  axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
      headers:{
        token
      }
    })
})

  let navigate = useNavigate();
  return (
    <>
      {isLoading?(<div className=" flex h-screen w-full justify-center items-center"><div className='lds-spinner'><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div></div>
):
      (data.data.posts.map(post=>
        <div key={post.id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 text-slate-900 mx-auto p-4 mb-5'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center  gap-3'>
              <img src={post.user.photo} className="size-[36px] rounded-full" alt="" />
              <p className='font-bold text-cyan-800'>{post.user.name}</p>
            </div>
            <div>
              <p className='text-xs text-slate-400'>{post.createdAt}</p>
            </div>
          </div>
          <div className='cursor-pointer' onClick={()=>{navigate(`/postDetails/${post._id}`)}}>
            <h2 className='mb-4'>{post.body}</h2>
            <img src={post.image} className='w-full rounded-md' alt="" />
          </div>
          <Comment comment={post.comments[0]}/>
        </div>
      ))}
    </>
  )
}

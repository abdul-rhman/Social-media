import React, { useContext, useEffect } from 'react'
import style from './SinglePost.module.css'
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../../Contexts/UserContext';
import axios from 'axios';
import Comment from './../Comment/Comment';
import { useParams } from 'react-router-dom';
import AddComment from '../AddComment/AddComment';

export default function SinglePost() {
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
let {token} = useContext(userContext);
let {id}=useParams();

let {data, error, isError, isLoading} = useQuery({
  queryKey: [`SinglPostQuery${id}`],
  queryFn:_=>  axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers:{
        token
      }
    }),
  select:(data)=>data.data.post
})

  return (
    <>
      {isLoading?(<div className=" flex h-screen w-full justify-center items-center"><div className='lds-spinner'><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div></div>
):
      
        <div key={data.id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 text-slate-900 mx-auto p-4 mb-5'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center  gap-3'>
              <img src={data.user.photo} className="size-[36px] rounded-full" alt="" />
              <p className='font-bold text-cyan-800'>{data.user.name}</p>
            </div>
            <div>
              <p className='text-xs text-slate-400'>{data.createdAt}</p>
            </div>
          </div>
          <h2 className='mb-4'>{data.body}</h2>
          <img src={data.image} className='w-full rounded-md' alt="" />
          {data.comments.map(comment=><Comment key={comment._id} comment={comment}/>)}
          
          <AddComment postId={data.id}/>
        </div>
      }
    </>
  )
}

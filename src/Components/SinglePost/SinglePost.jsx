import React, { useContext, useEffect } from 'react'
import style from './SinglePost.module.css'
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../../Contexts/UserContext';
import axios from 'axios';
import Comment from './../Comment/Comment';
import { useParams } from 'react-router-dom';
import AddComment from '../AddComment/AddComment';
import PostCard from './../postCard/postCard';

export default function SinglePost() {
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
let{token} = useContext(userContext);
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
      
        <div key={data._id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 text-slate-900 mx-auto p-4 mb-5'>
          <PostCard post={data}/>
          {data.comments.map(comment=><Comment key={comment._id} comment={comment}/>)}
          <AddComment postId={data._id}/>
        </div>
      }
    </>
  )
}

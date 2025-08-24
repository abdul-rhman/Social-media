import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios';
import { userContext } from '../../Contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import Comment from './../Comment/Comment';
import { useNavigate } from 'react-router-dom';
import AddComment from './../AddComment/AddComment';
import AddPost from '../AddPost/AddPost';
import PostCard from '../postCard/postCard';

export default function Home() {

let{token} = useContext(userContext);

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
      <>
      <AddPost/>
      {(data.data.posts.map(post=>
      
        <div key={post._id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 text-slate-900 mx-auto p-4 mb-5'>
          <PostCard post={post} />
          {post.comments.length>0 && <Comment comment={post.comments[0]}/>}
          <AddComment postId={post._id}/>
        </div>
      ))}
      </>
      }
    </>
  )
}

import style from './UserPosts.module.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { userContext } from '../../Contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import Comment from './../Comment/Comment';
import { useNavigate } from 'react-router-dom';
import  '@fortawesome/fontawesome-free/css/all.css'
import EditPostDialog from '../EditPostDialog/EditPostDialog';
import PostCard from '../postCard/postCard';
import AddComment from '../AddComment/AddComment';


export default function UserPosts(props) {
  
  let{token} = useContext(userContext);
  let {data, error, isError, isLoading} = useQuery({
      queryKey: [`userPosts`],
      queryFn:_=>  axios.get(`https://linked-posts.routemisr.com/users/${props.userId}/posts`,{
          headers:{
            token
          }
        })
    })



  // function handleshowPostOptions(){
  //   if(!showPostOptions){
  //     setShowPostOptions(true);
  //     document.addEventListener('click',handleHidePostOptions);
  //   }
  // }
  // function handleHidePostOptions(){
  //   setShowPostOptions(false);
  //   document.removeEventListener('click',handleHidePostOptions);
  // }
  return (
    <>
    

      {isLoading?(<div className=" flex h-screen w-full justify-center items-center"><div className='lds-spinner'><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div></div>
):
      (data.data.posts.map(post=>
        <div  key={post._id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 text-slate-900 mx-auto p-4 mb-5'>
      <PostCard post={post}/>
       {post.comments.length>0 && <Comment comment={post.comments[0]}/>}
          <AddComment postId={post._id}/>
      </div>)
      )}
    </>
  )
}

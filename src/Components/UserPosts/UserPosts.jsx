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


export default function UserPosts(props) {
  
  let {token} = useContext(userContext);
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
      (data.data.posts.map(post=><PostCard post={post} key={post.id}/>)
      )}
    </>
  )
}

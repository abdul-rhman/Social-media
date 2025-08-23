import style from './PostCard.module.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Comment from './../Comment/Comment';
import { useNavigate } from 'react-router-dom';
import  '@fortawesome/fontawesome-free/css/all.css'
import EditPostDialog from '../EditPostDialog/EditPostDialog';

export default function PostCard({post}) {

  
  let [postToEdit,setPostToEdit]=useState(null);
  let optionsIconRef = useRef(null);
  let [showPostOptions,setShowPostOptions] = useState(false);
  
  let navigate = useNavigate();
  function handleEditPost(post){
    setPostToEdit(post)
  }

   useEffect(() => {
      function handleClickOutside(e) {
        if (optionsIconRef.current && !optionsIconRef.current.contains(e.target)) {
          setShowPostOptions(false);
        }
      }
  
      if (showPostOptions) {
        document.addEventListener("click", handleClickOutside);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [showPostOptions]);
  

  return (
    <div>
      {postToEdit && <EditPostDialog post={postToEdit} closeDialog={()=>{handleEditPost(null)}}/>}
        <div className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 text-slate-900 mx-auto p-4 mb-5'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center  gap-3'>
              <img src={post.user.photo} className="size-[36px] rounded-full" alt="" />
              <p className='font-bold text-cyan-800'>{post.user.name}</p>
            </div>
            <div className='flex items-center gap-1'>
              <p className='text-xs text-slate-400'>{post.createdAt}</p>
              <div className='relative'>
                <i ref={optionsIconRef} className="cursor-pointer fa-solid fa-ellipsis-vertical" onClick={(e) => { setShowPostOptions((prev) => !prev); e.stopPropagation(); }}></i>
                  
              {showPostOptions &&  <ul className="py-2 absolute top-6 left-6  bg-gray-200 dark:bg-gray-700 w-[150px]">
                  <li>
                    <span onClick={()=>handleEditPost(post)}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</span>
                  </li>
                  <li>
                    <span onClick={()=>{}}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</span>
                  </li>
                </ul>}
              </div>  
            </div>
          </div>
          <div className='cursor-pointer' onClick={()=>{navigate(`/postDetails/${post._id}`)}}>
            <h2 className='mb-4'>{post.body}</h2>
            <img src={post.image} className='w-full rounded-md' alt="" />
          </div>
          {post.comments.length>0 && <Comment comment={post.comments[0]}/>}
        </div>
      </div>
  )
}

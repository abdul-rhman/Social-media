import style from './Comment.module.css'
import { userContext } from '../../Contexts/UserContext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import  '@fortawesome/fontawesome-free/css/all.css'
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';


export default function Comment(prop) {
  let {commentCreator, createdAt, content,_id,post} = prop.comment;
  let queryClient =useQueryClient()
  let [isLoading,setIsLoading]=useState(false);
  let optionsIconRef = useRef(null);
  let [showCommentOptions,setShowCommentOptions] = useState(false);
  let{id,token} = useContext(userContext);
  let location = useLocation();
  let [edit,setEdit]= useState(false);
  let {register,handleSubmit,reset} = useForm({
    defaultValues:{content}
  })

  useEffect(() => {
    function handleClickOutside(e) {
      if (optionsIconRef.current && !optionsIconRef.current.contains(e.target)) {
        setShowCommentOptions(false);
      }
    }

    if (showCommentOptions) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCommentOptions]);

  
  function handleEditComment(data){
    if(!isLoading){
      setIsLoading(true)
      axios.put(`https://linked-posts.routemisr.com/comments/${_id}`,data,{
        headers:{token}
      }).
        then(response => {
        toast.success('Comment Edited Successfuly');
        if(location.pathname.includes('postDetails')){
          queryClient.invalidateQueries({queryKey:[`SinglPostQuery${post}`]});
        }
        queryClient.invalidateQueries({queryKey:[`userPosts`]});
        queryClient.invalidateQueries({queryKey:[`postsQuery`]});
        reset(data);
        setIsLoading(false);
        setEdit(false);
        }).catch(error=>{
          
          console.log(error)
          toast.error('can\'t edit this comment');
        }).finally(()=>{
        setIsLoading(false);
        })
      }
  }

  function handleDeleteComment(id){
    axios.delete(`https://linked-posts.routemisr.com/comments/${_id}`,{headers:{token}}
    ).
    then(response => {
      toast.success('comment deleted successfuly');
      if(location.pathname.includes('postDetails')){
         queryClient.invalidateQueries({queryKey:[`SinglPostQuery${post}`]});
      }
      queryClient.invalidateQueries({queryKey:[`userPosts`]});
      queryClient.invalidateQueries({queryKey:[`postsQuery`]});
    }).catch(error=>{
      toast.error('Can\'t delete the comment ');
    })
  }
    
  return ( 
    <div className='my-1  mx-auto p-2 rounded-sm border-slate-800 bg-slate-400 text-slate-950'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src={commentCreator.photo}  onError={(e) => {
    e.target.src = "https://linked-posts.routemisr.com/uploads/default-profile.png";
  }} className='size-[20px] rounded-full' alt="" />
          <p className='text-cyan-800'>{commentCreator.name}</p>
        </div>
        <div className='flex gap-1 items-center'>
          <span>{createdAt.split('T')[0]}</span>
          {id == commentCreator._id && (<div className='relative'>
                <i ref={optionsIconRef} className="cursor-pointer fa-solid fa-ellipsis-vertical" onClick={(e) => { setShowCommentOptions((prev) => !prev); e.stopPropagation(); }}></i>
                  
              {showCommentOptions &&  <ul className="py-2 absolute top-6 right-6 z-10 bg-gray-200 dark:bg-gray-700 w-[150px]">
                  <li>
                    <span onClick={()=>setEdit(true)}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</span>
                  </li>
                  <li>
                    <span onClick={()=>{handleDeleteComment(_id)}}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</span>
                  </li>
                </ul>}
              </div>)}  
        </div>
      </div>
       {edit? <div className='p-4'><form onSubmit={handleSubmit(handleEditComment)}><input className='w-full bg-slate-200' type="text" {...register('content')} id="editCommentInput" /></form> <p onClick={()=>{isLoading || setEdit(false) }} className=' text-sm text-slate-700 cursor-pointer hover:underline'>cancel</p> </div> : <div className='p-4'>{content}</div>}
    </div>
  )
}

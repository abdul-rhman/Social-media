import React, { useContext, useRef, useState } from 'react'
import style from './AddPost.module.css'
import { useForm } from 'react-hook-form';
import { userContext } from '../../Contexts/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AddPost() {

  
  let queryClient = useQueryClient()
  let{token}=useContext(userContext)
  let[isLoading,setIsLoading] = useState(false);
  let[image,setImage] = useState(null);
  let inputImage = useRef();

  const PostForm = useForm({
    defaultValues:{
      body:"",
  }
  });

  const {formState, register, handleSubmit, reset} = PostForm;

  function handleAddImg(e){
    setImage(e.target.files[0])
  }
  function handleAddPost(data){
    let formData = new FormData()
    formData.append('body',data.body);
    formData.append('image',image);
    axios.post('https://linked-posts.routemisr.com/posts',formData,{headers:{token}}
    ).
    then(response => {
      toast.success('Post added successfuly');
      queryClient.invalidateQueries({queryKey:[`userPosts`]});
      reset();
      setImage(null);
      inputImage.current.value=null;
    }).catch(error=>{
      toast.error('some data are missing');
    })
  }

  return (
    <>
      <div className='my-4 bg-slate-100 shadow-md shadow-sky-100 shadow-blur  w-[80%] md:w-[80%] lg:w-[60%] mx-auto rounded-xl'>
        <form onSubmit={handleSubmit(handleAddPost)} className=" p-6 mx-auto">
          <div className="relative z-0 w-full mb-2 group">
            <textarea type="text" {...register('body')} id="body" className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-slate-50 rounded-sm border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" What's on your mind? 🤔" />
          </div>

          <div className='flex justify-between items-center px-4'>
            <div className='flex gap-2 justify-start'>
              <label htmlFor='post-img'><i className="cursor-pointer fa-solid fa-images"></i></label>
              <input ref={inputImage} id='post-img' className='hidden' type="file" accept="image/*" onChange={handleAddImg}/>
              {image?.name && 
              <>
                <p className=' text-blue-900'>{image?.name} 
                <i className="fa-solid fa-xmark size-[20px] text-slate-500 cursor-pointer" onClick={()=>setImage(null)}></i></p>
              </>}
            </div>
            <button type="submit" disabled={isLoading}  className="ms-auto cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Post'}</button>
          </div>
        </form>
      </div>
    </>
  )
}

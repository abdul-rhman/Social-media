import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './EditPostDialog.module.css'
import { useForm } from 'react-hook-form';
import { userContext } from '../../Contexts/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';


export default function EditPostDialog({post ,closeDialog}) {

  let queryClient = useQueryClient()
  let{token}=useContext(userContext)
  let[isLoading,setIsLoading] = useState(false);
  let prevImage = useRef({img:"",path:post.image});
  let[image,setImage] = useState({...prevImage.current,path:post.image});
  let inputImage = useRef();
  let{pathname}=useLocation();
  const PostForm = useForm({
    defaultValues:{
      body:post.body,
      image:"",
  }
  });

  

  useEffect(()=>{
    if (post?.image) {
    const fetchImage = async () => {
      try {
        const response = await axios.get(post.image, {
          responseType: "blob"
        });

        const file = new File([response.data], "post-image.jpg", {
          type: response.data.type,
        });
        
        prevImage.current = {...prevImage.current,img:file};
        setImage(prevImage.current)
      } catch (err) {
      }
    };

    fetchImage();
  }
  },[])

  const {formState, register, handleSubmit, reset} = PostForm;

  function handleAddImg(e){
    setImage({img:e.target.files[0] ,path:URL.createObjectURL(e.target.files[0])})
  }
  
  function handleUpdatePost(data){
    let formData = new FormData()
    formData.append('body',data.body);
    image.img && formData.append('image',image.img);
    axios.put(`https://linked-posts.routemisr.com/posts/${post._id}`,formData,{headers:{token}}
    ).
    then(response => {
      toast.success('Post updated successfuly');
      queryClient.invalidateQueries({queryKey:[`userPosts`]});
      if(pathname.includes('postDetails')){
        queryClient.invalidateQueries({queryKey: [`SinglPostQuery${post._id}`]})
      }
      closeDialog();
    }).catch(error=>{
      toast.error('some data are missing');
    })
  }

  return (
    <div className='fixed w-screen h-screen bg-[rgb(0,0,0,0.6)] z-100 top-0 bottom-0 right-0 left-0'>

      <div className='flex justify-center items-center h-full'  onClick={(e)=>{ if (e.target === e.currentTarget) closeDialog();}}>
        <div className='my-4 bg-slate-100 shadow-sm shadow-sky-100 shadow-blur  w-[80%] md:w-[80%] lg:w-[60%] mx-auto rounded-xl'>
          <form onSubmit={handleSubmit(handleUpdatePost)} className=" p-6 mx-auto">
            <div className="relative z-0 w-full mb-2 group">
              <textarea type="text" {...register('body')} id="edit-body" className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-slate-50 rounded-sm border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" What's on your mind? 🤔" />
            </div>
            <div className='mb-4'>
              <img className='max-h-[50vh] w-full object-contain' src={image.path} alt="" />  
            </div>
            <div className='flex justify-between items-center px-4'>
              <div className='flex gap-2 justify-start'>
                <label htmlFor='edit-post-img'><i className="cursor-pointer fa-solid fa-images"></i></label>
                <input ref={inputImage} id='edit-post-img' className='hidden' type="file" accept="image/*" onChange={handleAddImg}/>
                {image.img?.name && image!=prevImage.current && 
                <>
                  <p className=' text-blue-900'>{image.img?.name} 
                  <i className="fa-solid fa-xmark size-[20px] text-slate-500 cursor-pointer" onClick={()=>setImage(prevImage.current)}></i></p>
                </>}
              </div>
              <div className='ms-auto gap-1 flex md:flex-row flex-col'>
                <button type="submit" disabled={isLoading}  className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Edit Post'}</button>
                <button type="button" disabled={isLoading}  className="cursor-pointer text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" onClick={closeDialog}>cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

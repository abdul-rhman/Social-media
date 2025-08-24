import style from './AddComment.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import axios  from 'axios';
import { useNavigate } from 'react-router-dom'
import  '@fortawesome/fontawesome-free/css/all.css'
import { useContext, useState } from 'react';
import { userContext } from './../../Contexts/UserContext';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AddComment(props) {

  let queryClient = useQueryClient();
  let[isLoading,setIsLoading] = useState(false);
  let{token}=useContext(userContext);
  const schema = z.object({
  content: z.string().regex(/^(?!\s*$).+$/, "Comment cannot be empty or spaces only"),
  post:z.string()
})
    const commentForm = useForm({
      defaultValues:{
        content:"",
        post:props.postId,
    },
    resolver: zodResolver(schema)
  });

  const {formState, register, handleSubmit ,reset} = commentForm;
  function handleAddComment(data){
    setIsLoading(true);
    axios.post('https://linked-posts.routemisr.com/comments',data,{
      headers:{token}
    }).
      then(response => {
      toast.success('Comment Added Successfuly');
      queryClient.invalidateQueries({queryKey: [`SinglPostQuery${props.postId}`]});
      queryClient.invalidateQueries({queryKey:['postsQuery']});
      queryClient.invalidateQueries({queryKey:['userPosts']});
      reset();
      }).catch(error=>{
      }).finally(()=>{
      setIsLoading(false);
      })
    }

  return (
    <>
      <form onSubmit={handleSubmit(handleAddComment)} className="">
        <div className='flex flex-wrap items-center justify-around  w-full my-3'>
          <div className="relative z-0 group w-full lg:w-5/6">
            <input type="text" {...register('content')} id="content" className="block h-12 w-full text-sm text-gray-900 bg-slate-50 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <input type="hidden" value={props.postId} {...register('post')} id="post" className="block h-12 w-full text-sm text-gray-900 bg-slate-50 border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          </div>
          <button disabled={isLoading} type="submit" className="w-full lg:w-1/6 h-12 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm  px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Comment'}</button>
        </div>
      </form>
    </>
  )
}

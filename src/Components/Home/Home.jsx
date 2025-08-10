import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import img from '../../assets/Infographic_CH08_Browser Object Model (BOM).jpg'
import axios from 'axios';
import { userContext } from '../../Contexts/UserContext';

export default function Home() {

let {token} = useContext(userContext);
console.log(token)

let [posts,setPosts] = useState([{id:123,
    body:'how to get out of here',
    img,
    user:{photo:img,
      name:'ay 7aga'
    },
    createdAt:'2024/01/05'
  }])

  useEffect(()=>{
    axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
      headers:{
        token
      }
    }).then((response)=>{
      setPosts(response.data.posts);
    })
  },[])
  return (
    <>
      {posts.map(post=>
        <div key={post.id} className='w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 mx-auto p-4 mb-5'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center  gap-3'>
              <img src={post.user.photo} className="size-[36px] rounded-full" alt="" />
              <p>{post.user.name}</p>
            </div>
            <div>
              <p className='text-xs text-slate-400'>{post.createdAt}</p>
            </div>
          </div>
          <h2 className='mb-4'>{post.body}</h2>
          <img src={post.image} className='w-full rounded-md' alt="" />
        </div>
      )}
    </>
  )
}

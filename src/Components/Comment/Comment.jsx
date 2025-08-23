import React from 'react'
import style from './Comment.module.css'

export default function Comment(prop) {
  let {commentCreator, createdAt, content} = prop.comment;
  commentCreator.photo.endsW
  return ( 
    <div className='my-1  mx-auto p-2 rounded-sm border-slate-800 bg-slate-400 text-slate-950'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src={commentCreator.photo}  onError={(e) => {
    e.target.src = "https://linked-posts.routemisr.com/uploads/default-profile.png";
  }} className='size-[20px] rounded-full' alt="" />
          <p className='text-cyan-800'>{commentCreator.name}</p>
        </div>
        <span>{createdAt}</span>
      </div>
        <p className='p-4'>{content}</p>
    </div>
  )
}

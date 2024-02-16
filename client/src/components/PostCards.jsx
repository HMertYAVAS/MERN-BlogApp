import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCards({ post }) {
    return (
        <div className='group relative w-full border-opacity-25 border-orange-500 border-2 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[350px] transition-all'>
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image}
              alt='post cover'
              className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
            />
          </Link>
          <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
            <div className=' flex justify-between'>
            <span className='italic text-sm'>{post.category}</span>
            <span className='text-sm'>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <Link
              to={`/post/${post.slug}`}
              className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-orange-500 text-orange-500 hover:bg-orange-400 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
            >
              Read article
            </Link>
          </div>
        </div>
      );
}

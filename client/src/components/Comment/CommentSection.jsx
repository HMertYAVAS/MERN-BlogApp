import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment'

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in')
        return
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT'
      })
      if (res.ok) {
        const data = await res.json()
        setComments(
          comments.map((comment) => 
            comment._id === commentId ?
              {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length
              }
              : comment
          )
        )
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div>
          <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} alt={currentUser.username} className='w-5 h-5 object-cover rounded-full' />
            <Link to={'/dashboard?tab=profile'} className='text-xs hover:underline text-orange-500 '>
              @{currentUser.username}
            </Link>
          </div>
          <form onSubmit={handleSubmit} className='border border-orange-500 p-3 rounded-md'>
            <Textarea
              placeholder='Add a comment'
              rows={'3'}
              maxLength={'200'}
              className='focus:border-orange-500'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
              <p>{200 - comment.length} character remaining</p>
              <Button type='submit' gradientDuoTone={'pinkToOrange'}>Submit</Button>
            </div>
            {
              commentError && (

                <Alert color={'failure'} className='mt-5'>{commentError}</Alert>
              )
            }
          </form>
        </div>
      )
        :
        (
          <div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be signed in comment.
            <Link to={'/sign-in'} className='text-sm text-blue-500 ml-5'>Sign In</Link>
          </div>
        )
      }

      {comments === 0 ?
        (<p className='text-sm my-5'>No comment yet!</p>)
        :
        (<>
          <div className='flex gap-1 items-center my-5 text-sm'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {
            comments.map(comment => (
              <Comment key={comment._id}
                comment={comment}
                onLike={handleLike} />
            ))
          }
        </>)}
    </div>
  )
}

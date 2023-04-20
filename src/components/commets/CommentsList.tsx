import React from 'react'
import { useDeleteCommentMutation, useFetchAllCommentsQuery } from '../../store/Slices/commentApi'
import './comment.css'
import { useShowAlert } from '../../hooks/useShowAlert';

export const CommentsList = (props: any) => {
  const { data: comments } = useFetchAllCommentsQuery(props.prodId);
  const [deleteCom] = useDeleteCommentMutation();
  const name = sessionStorage.getItem('user');

  const alert = useShowAlert();

  return (
    <div>
      <div className='rate'>Отзывы</div>
      <div className='comCommets'>
        {comments?.map((comment: any) => (
          <div key={comment.id} className='comWrapper'>
            <div className='text'>
              <div className='username'>{comment.username} <span className='date'>{comment.created}</span></div>
              <div className='commentMessage'>{comment.message}</div>
            </div>
            <div className='deleteX'>
              {comment.username === name && <div onClick={() => deleteCom(comment.id).then((data) => alert(data))}>&#x2715;</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

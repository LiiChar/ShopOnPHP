import React from 'react'
import { useDeleteUserMutation, useGetUserByIdQuery } from '../../store/Slices/userApi'
import './user.css'
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from './UpdateUser';

export const User = () => {
  const id = Number(sessionStorage.getItem('user_id'));
  const { data: user } = useGetUserByIdQuery(id);
  const [deleteUser] = useDeleteUserMutation()
  const navigate = useNavigate()

  const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

  const exitUserHandler = () => {
    sessionStorage.clear()
    window.location.reload();
    navigate('/')
  }

  const deleteUserHandler = async () => {
    deleteUser(id).then(() => {
      sessionStorage.clear()
      navigate('/')
    })
  }

  const updateUserHandler = () => {
    setIsUpdate(prev => !prev)
  }

  return (
    <div className='userWrapperer'>
      <div className='userer'>
        <div className='usernameer'>{user?.username}</div>
        <div className='actionser'>
          <button onClick={updateUserHandler}>Изменить</button>
          {isUpdate && <UpdateUser id={id} user={user} />}
          <button onClick={deleteUserHandler}>Удалить</button>
          <button onClick={exitUserHandler}>Выйти</button>
        </div>
      </div>
    </div>
  )
}

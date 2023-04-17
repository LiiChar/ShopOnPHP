import React from 'react'
import { useGetUserByIdQuery } from '../../store/Slices/userApi'

export const User = () => {
  const id = Number(sessionStorage.getItem('user_id'));
  const { data: user } = useGetUserByIdQuery(id);
  return (
    <div>
      <div>
      </div>
    </div>
  )
}

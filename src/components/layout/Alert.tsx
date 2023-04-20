import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './alert.css'

export const Alert: React.FC = () => {
  const data = useSelector((state: RootState) => state.setUser.user)
  return (
    <div className='alert'>
        {data.map((mes) => (
            <div key={mes.id} onClick={(e: any) => e.target.style.display = 'none'} className='message'>
                {mes.message}
            </div>
        ))}
    </div>
  )
}

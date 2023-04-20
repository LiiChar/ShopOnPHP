import React from 'react'
import { Link } from 'react-router-dom'
import './header.css';
import { useGetUserByIdQuery } from '../../store/Slices/userApi';

export const Header = React.memo(function Header() {
    const id = Number(sessionStorage.getItem('user_id'));
    const name = sessionStorage.getItem('user');
    const {data:user} = useGetUserByIdQuery(id);
    return (
        <div className='headerWrappe'>
            <div>
                <Link to={'/'}>Oven</Link>
            </div>
            {user?.ROLE === 'ADMIN'?
                <div>
                     <Link to={`/admin`}>Панель администратора</Link>
                </div>
                :
                <div>
                    {!name && <Link to={`/login`}>Войти</Link>}
                </div>
            }
            <div className='user'>
                <div>
                    <Link to={`/user/${id}`}>{name}</Link>
                </div>
                <div>
                    <Link to={`/busket/${id}`}>🛒</Link>
                </div>
            </div>
        </div>
    )
})

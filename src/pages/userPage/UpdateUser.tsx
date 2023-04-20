import React from 'react'
import './updateUs.css'
import { useChangeUserMutation } from '../../store/Slices/userApi';

export const UpdateUser = (props: any) => {
    const user = props.user;
    const [username, setUsername] = React.useState<string>();
    const [passwordOld, setOldPassword] = React.useState<string>();
    const [passwordNew, setNewPassword] = React.useState<string>();
    const [role, setRole] = React.useState<string>();

    const [changeUser] = useChangeUserMutation()


    React.useEffect(() => {
        setUsername(user.username)
        setRole(user.ROLE)
    }, [user])

    const updateUserHandler = () => {
        const data = {
            id: props.id,
            username,
            passwordOld,
            passwordNew,
            role
        }
        changeUser(data).then((data:any) => {
            if (data?.error) {
                
            } else if (data?.data) {
                sessionStorage.setItem('user', data?.data)

            }
        })
    }

    return (
        <div className='updateWrapper'>
            <input type="text" placeholder='Измените имя' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" value={passwordOld} placeholder='Введите старый  пароль' onChange={(e) => setOldPassword(e.target.value)} />
            <input type="text" value={passwordNew} placeholder='Введите новый пароль' onChange={(e) => setNewPassword(e.target.value)} />
            {user.ROLE === "ADMIN" &&
                <div>
                    <label id='label1'>
                        <input type="checkbox" className='input2' checked={role === "USER"} onChange={() => setRole("USER")} />
                        USER
                    </label>
                    <label id='label1'>
                        <input type="checkbox" className='input2' checked={role === "ADMIN"} onChange={() => setRole("ADMIN")} />
                        ADMIN
                    </label>
                </div>}
            <div className='sendButton'>
                <button onClick={updateUserHandler}>Изменить</button>
            </div>
        </div>
    )
}

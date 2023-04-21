import React from 'react'
import { useChangeRoleMutation } from '../../store/Slices/userApi'
import { TopDownList } from '../forms/TopDownList'
import { useShowAlert } from '../../hooks/useShowAlert'

export const ChangeRole = (props: any) => {
    const [user, setUsers] = React.useState<string>()
    const [role, setRole] = React.useState<string>()
    const ref = React.useRef<HTMLUListElement>();
    const alert = useShowAlert()

    const [changeRole] = useChangeRoleMutation()

    const handleSubmit = () => {
        const data = { user, role }
        changeRole(data).then((data: any) => {
                alert(data)
        });
    }
    

    const handleRef = () => {
        if (ref) {
            if (ref.current) {
                if (ref.current.style.display === 'block') {
                    ref.current.style.display = 'none'
                } else {
                    ref.current.style.display = 'block'
                }

            }
        }
    }

    return (
        <div>
            <div>
                <input type="text" className='input1' placeholder='Введите имя пользователя' onClick={handleRef} onChange={(e) => setUsers(e.target?.value)} value={user} />
                {props.users && <TopDownList setRef={ref} list={props.users} selectElem={(name: any) => setUsers(name.value)} />}
                <label id='label1'>
                    <input type="checkbox" className='input1' checked={role === "USER"} onChange={() => setRole("USER")} />
                    USER
                </label>
                <label id='label1'>
                    <input type="checkbox" className='input1' checked={role === "ADMIN"} onChange={() => setRole("ADMIN")} />
                    ADMIN
                </label>
                <button className='btn1' onClick={handleSubmit} >Сменить роль</button>
            </div>
        </div>
    )
}

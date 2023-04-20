import React from 'react'
import { useDeleteUserMutation } from '../../store/Slices/userApi';
import { TopDownList } from '../forms/TopDownList';
import { useShowAlert } from '../../hooks/useShowAlert';

export const DeleteUser = (props: any) => {
    const [name, setName] = React.useState<string>();

    const [delUser] = useDeleteUserMutation()
    const ref = React.useRef<HTMLUListElement>();
    const alert = useShowAlert()


    const handleSubmit = () => {
        delUser(name).then((data) => {
            alert(data)
            setName('')
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
        <input type="text" placeholder='Введите имя пользователя' className='input1' onClick={handleRef} onChange={(e) => setName(e.target?.value)} value={name}/>
        {props.users && <TopDownList setRef={ref} list={props.users} selectElem={(name: any) => setName(name.value)} />}
        <button className='btn1' onClick={handleSubmit} >Удалить пользователя</button>
    </div>
  )
}

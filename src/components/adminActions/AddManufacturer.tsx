import React from 'react'
import { useShowAlert } from '../../hooks/useShowAlert'
import { useAddManufacturerMutation } from '../../store/Slices/manufacturerApi'

export const AddManufacturer = (props: any) => {
    const [name, setName] = React.useState<string>('')

    const [addManuf] = useAddManufacturerMutation()
    const ref = React.useRef<HTMLUListElement>();

    const alert = useShowAlert()

    const onSubmit = () => {
        if (name) {
            addManuf(name).then((data) => {
                alert(data);
                setName('');
            })
        }
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
        <div style={{ height: 'minContent' }}> 
            <div style={{ height: '20px' }}>
                <input className='input1' onClick={handleRef} type="text" placeholder='Введите название производителя' onChange={(e) => setName(e.target?.value)} value={name} />
            </div>
            <button className='btn1' onClick={onSubmit}>Отправить</button>
        </div>
    )
}

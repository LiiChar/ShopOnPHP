import React from 'react'
import { useAddManufacturerMutation } from '../../store/Slices/productApi'

export const AddManufacturer = () => {
    const [name, setName] = React.useState<string>()

    const [addManuf] = useAddManufacturerMutation()

    const onSubmit = () => {
        if (name) {
            const data = addManuf(name)
        }
    }

  return (
    <div style={{height: 'minContent'}}>
    <div style={{height: '20px'}}>
        <input className='input1' type="text" placeholder='Введите название производителя' onChange={(e) => setName(e.target?.value)} value={name} />
    </div>
    <button onClick={onSubmit}>Отправить</button>
</div>
  )
}

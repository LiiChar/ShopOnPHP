import React from 'react'
import { useDeleteProductMutation } from '../../store/Slices/productApi';
import { TopDownList } from '../forms/TopDownList';

export const DeleteProduct = (props: any) => {
    const [name, setName] = React.useState<string>();

    const [delProd] = useDeleteProductMutation()
    const ref = React.useRef<HTMLUListElement>();

    const handleSubmit = () => {
        delProd(name);
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
        <input type="text" placeholder='Введте название продукта' className='input1' onClick={handleRef} onChange={(e) => setName(e.target?.value)} value={name}/>
        {props.products && <TopDownList setRef={ref} list={props.products} selectElem={(name: any) => setName(name.value)} />}
        <button className='btn1' onClick={handleSubmit} >Удалить продукт</button>
    </div>
  )
}

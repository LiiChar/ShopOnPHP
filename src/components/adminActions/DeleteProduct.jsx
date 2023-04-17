import React from 'react'
import { useDeleteProductMutation } from '../../store/Slices/productApi';

export const DeleteProduct = () => {
    const [name, setName] = React.useState();

    const {data:product} = useFetchAllProductsQuery()
    const [delProd] = useDeleteProductMutation()

    const handleSubmit = () => {
        delProd(name);
    }

  return (
    <div>
        <input type="text" />
        <button onClick={handleSubmit} onChange={(e) => setName(e.target?.value)} value={name}></button>
    </div>
  )
}

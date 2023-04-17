import React from 'react'
import { useFetchAllProductsQuery } from '../../store/Slices/productApi'
import { Product } from '../../components/product/Product';
import './products.css'


export const Products = () => {
  const {data: products} = useFetchAllProductsQuery();
  
  return (
    <div className='productsWrapper'>
      {products?.map((prod) => (
        <Product key={prod.id} product={prod}/>
      ))}
    </div>
  )
}

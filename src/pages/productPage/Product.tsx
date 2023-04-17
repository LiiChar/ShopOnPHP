import React from 'react'
import { IProducts } from '../../types/types'
import './product.css'
import { useAddBusketMutation } from '../../store/Slices/busketApi'
import { useGetProductByIdQuery } from '../../store/Slices/productApi'
import { useParams } from 'react-router-dom'

export const Product: React.FC = () => {
    const user_id = Number(sessionStorage.getItem('user_id'));
    const {id} = useParams()
    const {data: product} = useGetProductByIdQuery(id)
    const [addBusket, { data, error: addError }] = useAddBusketMutation()
    const [error, setError] = React.useState();

    const addHandleBusket = async () => {
        const dat: string | any = await addBusket({ user_id: user_id, product_id: product.id })

        if (dat.error) {
            setError(dat.error.data);
        } else if (dat.data) {
            setError(dat.data);
        }
    }

    return (
        <div className='productWrapper'>
            <div className='product'>
                <div>
                    {product?.name} {product?.rate}
                </div>
                <div className='commonDesc'>
                    <div className='image'>
                        <img width='100%' height='100%' src={product?.image} alt="image" />
                    </div>
                    <div>
                        <div>
                            <span>Цена </span>{product?.sale}
                        </div>
                        <div>
                            <span>Производитель </span>{product?.manufacturer}
                        </div>
                        <div>
                            <span>Категория </span>{product?.categories}
                        </div>
                    </div>

                </div>

                <div className='description'>
                    <div>
                        Описание
                    </div>
                    <div>
                        {product?.description}
                    </div>
                </div>
                <div>
                    <span>поместить в корзину за {product?.sale}</span>
                    <button onClick={addHandleBusket}>Добавить в корзину</button>
                    <div>{error}</div>
                </div>
            </div>
        </div>

    )
}

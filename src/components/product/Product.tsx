import React from 'react'
import { IProducts } from '../../types/types'
import './producte.css'
import { useAddBusketMutation } from '../../store/Slices/busketApi'
import { useNavigate } from 'react-router-dom'

interface Props {
    product: IProducts
}
export const Product: React.FC<Props> = ({ product }) => {
    const user_id = Number(sessionStorage.getItem('user_id'));
    const [addBusket, { data, error: addError }] = useAddBusketMutation()
    const navigate = useNavigate()

    const addHandleBusket = async () => {
        const dat: string | any = await addBusket({ user_id: user_id, product_id: product.id })
    }

    return (
        <div className="row">
            <div className="el-wrapper">
                <div className="box-up">
                    <img onClick={() => navigate(`/product/${product.id}`)} className="img" src={product.image} alt="" />
                    <div className="img-info">
                        <div className="info-inner">
                            <span className="p-name">{product.name}</span>
                            <span className="p-company">{product.manufacturer}</span>
                            <span className="p-company">{product.rate}</span>
                        </div>
                    </div>
                </div>

                <div className="box-down">
                    <div className="h-bg">
                        <div className="h-bg-inner"></div>
                    </div>

                    <a className="cart" href="#">
                        <span className="price">{product.sale}</span>
                        <span className="add-to-cart">
                            <span onClick={addHandleBusket} className="txt">Add in cart</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>

    )
}
import React from 'react'
import { useDeleteBusketMutation, useFetchBusketQuery } from '../../store/Slices/busketApi'
import './busket.css'
import { useNavigate } from 'react-router-dom';
import { useShowAlert } from '../../hooks/useShowAlert';

export const Busket = () => {
  const [sale, setSale] = React.useState<number>(0);
  const id = Number(sessionStorage.getItem('user_id'));
  const { data: products } = useFetchBusketQuery(id);

  const navigate = useNavigate();

  React.useEffect(() => {
    setSale(products?.reduce((acc, prod) => acc + prod.sale, 0))
  }, [products])

  const alert = useShowAlert();

  const [deleteBusItem] = useDeleteBusketMutation()
  
  return (
    <>
      <div className='busket'>Корзина</div>
      <div className='basWrapper'>
        <div className='bas'>
          <div className='cardProd'>
            {products ? 
              products?.map((prod) => (
                <div key={prod.id} className='prod'>
                  <img onClick={() => navigate(`/product/${prod.product_id}`)} className='img' src={prod.image} alt="image" />
                  <div className='info'>
                    <div className='name'>
                      {prod.name}
                    </div>
                    <div className='sale'>
                      Цена: {prod.sale}
                    </div>
  
                  </div>
                  <div onClick={() => deleteBusItem(prod.id).then((data) => alert(data))} className='cross'>
                    &#10006;
                  </div>
                </div>
              ))
            : 
                <div>
                  Ваша козина пуста
                </div>
            }
            
          </div>
          <div className='order'>
              <button className='confirm'>
                Перейти к оформлению
              </button>
              <div className='comSaleWrapper'>
                <div>
                  Общая стоимость:
                </div>
                <div>
                  <span className='commonSale'> {sale}</span>
                </div>
              </div>
          </div>
        </div>

      </div>
    </>
  )
}

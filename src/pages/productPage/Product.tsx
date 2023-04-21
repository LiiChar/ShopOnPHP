import React from 'react'
import './product.css'
import { useAddBusketMutation } from '../../store/Slices/busketApi'
import { useGetProductByIdQuery } from '../../store/Slices/productApi'
import { useParams } from 'react-router-dom'
import { CommentsList } from '../../components/commets/CommentsList'
import { useCreateCommentMutation  } from '../../store/Slices/commentApi'
import StarRatings from 'react-star-ratings';
import { useShowAlert } from '../../hooks/useShowAlert'
import { useCreateRateMutation, useGetRateByIdQuery, useUpdateRateMutation } from '../../store/Slices/rateApi'

export const Product: React.FC = () => {
    const user_id = Number(sessionStorage.getItem('user_id'));
    const { id } = useParams()
    const { data: product, refetch } = useGetProductByIdQuery(id)
    const [addBusket] = useAddBusketMutation()
    const [comment, setComment] = React.useState<string>('');
    const [addComment] = useCreateCommentMutation()
    const [star, setStar] = React.useState<number>(0);
    const { data: rate, isSuccess } = useGetRateByIdQuery({ user_id, prod_id: id })
    const [createRate] = useCreateRateMutation()
    const [updateRate] = useUpdateRateMutation()

    React.useEffect(() => {
        if (isSuccess) {
            setStar(Number(rate?.rate) || 0);
        }
    }, [isSuccess,rate])

    const alert = useShowAlert()

    const addHandleBusket = async () => {
        addBusket({ user_id: user_id, product_id: product.id }).then((data) => alert(data))
    }

    const handleAddComment = () => {
        addComment({ prod_id: id, user_id, comment })
    }

    return (
        <div className='productWrapper'>
            <div className='product'>
                <div>
                    <span className='name'>{product?.name}</span>
                    <StarRatings rating={Number(product?.rate) || 0}
                        starDimension='20px'
                        starRatedColor="#1D766F "
                        starSpacing='5px'
                        numberOfStars={5}
                        name='rating' />
                </div>
                <div className='commonDesc'>
                    <div className='image'>
                        <img width='100%' height='100%' src={product?.image} alt="image" />
                    </div>
                    <div className='commonInfo'>
                        <div>
                            <span>Цена: </span>{product?.sale}
                        </div>
                        <div>
                            <span>Производитель: </span>{product?.manufacturer}
                        </div>
                        <div>
                            <span>Категория: </span>{product?.categories}
                        </div>
                    </div>

                </div>

                <div className='description'>
                    <div>
                        <span>Описание</span>
                    </div>
                    <div>
                        <p>{product?.description}</p>
                    </div>
                </div>
                <div>
                    <button className='confirm' onClick={addHandleBusket}>поместить в корзину за {product?.sale}</button>
                </div>
                <div className='otsiv'>
                    <div className='mesOtsiv'>
                        <div>
                            Ваш отзыва
                        </div>
                        <div>
                            <StarRatings rating={star}
                                starDimension='20px'
                                starRatedColor="#1D766F "
                                starSpacing='5px'
                                changeRating={(star: number) => {
                                    if (rate?.rate) {
                                        updateRate({ prod_id: id, user_id, star }).then((data) => {
                                            alert(data)
                                            refetch();
                                            setStar(star)
                                        })
                                    } else {
                                        createRate({ prod_id: id, user_id, star }).then((data) => {
                                            alert(data)
                                            refetch();

                                            setStar(star)
                                        })
                                    }
                                }
                                }
                                numberOfStars={5}
                                name='rating' />
                        </div>
                    </div>
                    <div>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='textar'></textarea>
                        <button onClick={handleAddComment} style={{ height: '22px' }} className='confirm'>Отправить</button>
                    </div>
                </div>
                <div>
                    <CommentsList prodId={id} />
                </div>

            </div>
        </div>

    )
}

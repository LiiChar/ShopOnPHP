import React from 'react'
import { useGetProductIdMutation, useUpdateProductMutation } from '../../store/Slices/productApi'
import { TopDownList } from '../forms/TopDownList';
import { useShowAlert } from '../../hooks/useShowAlert';

export const UpdateProduct = (props: any) => {
    const [id, setId] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [sale, setSale] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [company, setCompany] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const [image, setImage] = React.useState<any>();
    const [isFind, setIsFind] = React.useState<boolean>(false);

    const [updateProduct] = useUpdateProductMutation()
    const [getById] = useGetProductIdMutation()
    const alert = useShowAlert()

    const ref1 = React.useRef<HTMLUListElement>();
    const ref2 = React.useRef<HTMLUListElement>();
    const ref3 = React.useRef<HTMLUListElement>();

    const onSubmit = () => {
        const data = new FormData();
        if (image) {
            console.log(image);
            
            for (let i = 0; i < image?.length; i++) {
                data.append("file[]", image[i]);
            }
        } else {
            data.append('file[]', '')
        }
        if (name && sale && description && company && category) {

            data.append('id', id)
            data.append("name", name);
            data.append("sale", sale);
            data.append("description", description);
            data.append("company", company);
            data.append("category", category);
            updateProduct(data).then((data) => alert(data))
            setName('')
            setSale('')
            setDescription('')
            setCompany('')
            setCategory('')
            setImage(null)
            setIsFind(false);
        }
    }

    const handleRef = (num: number) => {
        if (num === 1) {
            if (ref1) {
                if (ref1.current) {
                    if (ref1.current.style.display === 'block') {
                        ref1.current.style.display = 'none'
                    } else {
                        ref1.current.style.display = 'block'
                    }

                }
            }
        } else if (num === 2) {
            if (ref2) {
                if (ref2.current) {
                    if (ref2.current.style.display === 'block') {
                        ref2.current.style.display = 'none'
                    } else {
                        ref2.current.style.display = 'block'
                    }

                }
            }
        } else {
            if (ref3) {
                if (ref3.current) {
                    if (ref3.current.style.display === 'block') {
                        ref3.current.style.display = 'none'
                    } else {
                        ref3.current.style.display = 'block'
                    }

                }
            }
        }
    }

    const filterMam = props?.manufacturer?.filter((manufact: string) => manufact[0]?.toLocaleLowerCase()?.includes(company))
    const filterCat = props?.categories?.filter((category: string) => category[0]?.toLocaleLowerCase()?.includes(category))
    const filterProd = props?.products?.filter((category: any) => category.name?.toLocaleLowerCase()?.includes(name))

    const selProd = async (name: any) => {
        if (filterProd.some((e: any) => e.id !== name.id)) {
            getById(name.id).then((data: any) => {
                setId(name.id);
                setName(data.data.name)
                setSale(data.data.sale)
                setDescription(data.data.description)
                setCompany(data.data.manufacturer)
                setCategory(data.data.categories)
                setIsFind(true)
            })

        }
    }
    return (
        <div style={{ height: 'minContent' }}>
            <div style={{ height: '20px' }}>
                <input className='input1' type="text" onClick={() => handleRef(3)} placeholder='Введите название' onChange={(e) => setName(e.target?.value)} value={name} />
            </div>
            {filterProd && <TopDownList setRef={ref3} list={filterProd} selectElem={(name: any) => selProd(name)} />}
            {isFind &&
                <>
                    <div style={{ height: '20px' }}>
                        <input className='input1' type="number" placeholder='Введите цену' onChange={(e) => setSale(e.target?.value)} value={sale} />
                    </div>
                    <div style={{ height: '20px' }}>
                        <input className='input1' type="text" placeholder='Введите описание' onChange={(e) => setDescription(e.target?.value)} value={description} />
                    </div>
                    <div style={{ height: '20px' }}>
                        <input className='input1' type="text" onClick={() => handleRef(1)} placeholder='Выберите компанию' onChange={(e) => setCompany(e.target?.value)} value={company} />
                    </div>
                    {filterMam && <TopDownList setRef={ref1} list={filterMam} selectElem={(name: string) => setCategory(name)} />}
                    <div style={{ height: '20px' }}>
                        <input className='input1' type="text" onClick={() => handleRef(2)} placeholder='Выберите категорию' onChange={(e) => setCategory(e.target.value)} value={category} />
                    </div>
                    {filterCat && <TopDownList setRef={ref2} list={filterCat} selectElem={(name: string) => setCompany(name)} />}
                    <div  style={{ height: '30px', display: 'none' }}>
                        <input className='input1' type="file" placeholder='Выберите файл' onChange={(e) => setImage(e.target.files)} />
                    </div>
                    <button className='btn1' onClick={onSubmit}>Отправить</button>
                </>
            }
        </div>
    )
} 

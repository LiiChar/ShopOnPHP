import React from 'react'
import { useCreateProductMutation } from '../../store/Slices/productApi'
import { TopDownList } from '../forms/TopDownList'

export const AddProduct = (props: any) => {
    const [name, setName] = React.useState<string>('')
    const [sale, setSale] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')
    const [company, setCompany] = React.useState<string>('')
    const [category, setCategory] = React.useState<string>('')
    const [image, setImage] = React.useState<FileList | null>()

    const ref1 = React.useRef<HTMLUListElement>();
    const ref2 = React.useRef<HTMLUListElement>();

    

    const [createProduct] = useCreateProductMutation()

    const onSubmit = () => {
        const data = new FormData();
        if (image) {
            for (let i = 0; i < image?.length; i++) {
                data.append("file[]", image[i]);
            }
        }
        if (name && sale && description && company && category) {
            
            data.append('name', name);
            data.append('sale', sale);
            data.append('description', description);
            data.append('company', company);
            data.append('category', category);
            createProduct(data)
            setName('')
            setSale('')
            setDescription('')
            setCompany('')
            setCategory('')
            setImage(null)
        }
    }

    
    
    const filterMam = props?.manufacturer?.filter((manufact: string) => manufact[0]?.toLocaleLowerCase()?.includes(company))
    const filterCat = props?.categories?.filter((category: string) => category[0]?.toLocaleLowerCase()?.includes(category))
    
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
        } else {
            if (ref2) {
                if (ref2.current) {
                    if (ref2.current.style.display === 'block') {
                        ref2.current.style.display = 'none'
                    } else {
                        ref2.current.style.display = 'block'
                    }

                }
            }
        }

    }

    return (
        <div style={{ height: 'minContent' }}>
            <div style={{ height: '20px' }}>
                <input className='input1' type="text" placeholder='Введите название' onChange={(e) => setName(e.target?.value)} value={name} />
            </div>
            <div style={{ height: '20px' }}>
                <input className='input1' type="number" placeholder='Введите цену' onChange={(e) => setSale(e.target?.value)} value={sale} />
            </div>
            <div style={{ height: '20px' }}>
                <input className='input1' type="text" placeholder='Введите описание' onChange={(e) => setDescription(e.target?.value)} value={description} />
            </div>
            <div style={{ height: '20px' }}>
                <input className='input1' type="text" onClick={() => handleRef(1)} placeholder='Выберите компанию' onChange={(e) => setCompany(e.target?.value)} value={company} />
            </div>
            {filterCat && <TopDownList setRef={ref1} list={filterMam} selectElem={(name: any) => setCompany(name.value)} />}
            <div style={{ height: '20px' }}>
                <input className='input1' type="text" onClick={() => handleRef(2)} placeholder='Выберите категорию' onChange={(e) => setCategory(e.target.value)} value={category} />
            </div>
            {filterMam && <TopDownList setRef={ref2} list={filterCat} selectElem={(name: any) => setCategory(name.value)} />}
            <div style={{ height: '30px' }}>
                <input className='input1' type="file" placeholder='Выберите файл' onChange={(e) => setImage(e.target.files)} />
            </div>
            <button className='btn1' onClick={onSubmit}>Отправить</button>
        </div>
    )
}

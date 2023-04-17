import React from 'react'
import { useCreateProductMutation } from '../../store/Slices/productApi'

export const AddProduct = () => {
    const [name, setName] = React.useState<string>()
    const [sale, setSale] = React.useState<string>()
    const [description, setDescription] = React.useState<string>()
    const [company, setCompany] = React.useState<string>()
    const [category, setCategory] = React.useState<string>()
    const [image, setImage] = React.useState<FileList | null>()

    const [createProduct] = useCreateProductMutation()

    const onSubmit = () => {
        const data = new FormData();
        if (image) {
            for (let i = 0; i < image?.length; i++) {
                data.append("file[]", image[i]);
              }
        }
        if (name && sale && description && company && category ) {
            
            data.append("name", name );
            data.append("sale", sale );
            data.append("description", description );
            data.append("company", company );
            data.append("category", category );
            createProduct(data)
        }

    }

    return (
        <div style={{height: 'minContent'}}>
            <div style={{height: '20px'}}>
                <input className='input1' type="text" placeholder='Введите название' onChange={(e) => setName(e.target?.value)} value={name} />
            </div>
            <div style={{height: '20px'}}>
                <input className='input1' type="text" placeholder='Введите цену' onChange={(e) => setSale(e.target?.value)} value={sale} />
            </div>
            <div style={{height: '20px'}}>
                <input className='input1' type="text" placeholder='Введите описание'  onChange={(e) => setDescription(e.target?.value)} value={description} />
            </div>
            <div style={{height: '20px'}}>
                <input className='input1' type="text" placeholder='Выберите компанию'  onChange={(e) => setCompany(e.target?.value)} value={company} />
            </div>
            <div style={{height: '20px'}}>
                <input className='input1' type="text" placeholder='Выберите категорию'  onChange={(e) => setCategory(e.target.value)} value={category} />
            </div>
            <div style={{height: '30px'}}>
                <input className='input1' type="file" placeholder='Выберите файл' onChange={(e) => setImage(e.target.files)} />
            </div>
            <button onClick={onSubmit}>Отправить</button>
        </div>
    )
}

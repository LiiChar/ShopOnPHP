import React from 'react'
import './admin.css'
import { AddProduct } from '../../components/adminActions/AddProduct'
import { AddCategory } from '../../components/adminActions/AddCategory'
import { DeleteProduct } from '../../components/adminActions/DeleteProduct'
import { ChangeRole } from '../../components/adminActions/ChangeRole'
import { DeleteUser } from '../../components/adminActions/DeleteUser'
import { AddManufacturer } from '../../components/adminActions/AddManufacturer'
import { UpdateProduct } from '../../components/adminActions/UpdateProduct'
import { useFetchAllUsersQuery } from '../../store/Slices/userApi'
import { useFetchAllProductsQuery } from '../../store/Slices/productApi'
import { useFetchManufacturersQuery } from '../../store/Slices/manufacturerApi'
import { useFetchCategoryQuery } from '../../store/Slices/categoryApi'

export const Admin = () => {
  const { data: users } = useFetchAllUsersQuery()
  const {data:products} = useFetchAllProductsQuery({page: 0, category: '', manufacturer: ''})
  const {data:manufacturer} = useFetchManufacturersQuery()
  const {data:categories} = useFetchCategoryQuery()

  return (
    <div  className="navigaonusing">
      <div className="gaonutosal">
        <div key={1} className="pesontedan">
          <input id="pesontedan-one" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-one">Добавить продукт</label>
          <div className="pesontedan-content">
            <AddProduct manufacturer={manufacturer} categories={categories}/>
          </div>
        </div>
        <div key={2} className="pesontedan">
          <input id="pesontedan-two" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-two">Изменить продукт</label>
          <div className="pesontedan-content">
            <UpdateProduct products={products?.products} manufacturer={manufacturer} categories={categories}/>
          </div>
        </div>
        <div key={3} className="pesontedan">
          <input id="pesontedan-three" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-three">Добавить производителя</label>
          <div className="pesontedan-content">
           {manufacturer && <AddManufacturer manufacturer={manufacturer}/>}
          </div>
        </div>
        <div key={4} className="pesontedan">
          <input id="pesontedan-four" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-four">Добавить категорию</label>
          <div className="pesontedan-content">
            {categories && <AddCategory categories={categories}/>}
          </div>
        </div>
        <div key={5} className="pesontedan">
          <input id="pesontedan-five" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-five">Удалить продукт</label>
          <div className="pesontedan-content">
            <DeleteProduct products={products?.products}/>
          </div>
        </div>
        <div key={6} className="pesontedan">
          <input id="pesontedan-six" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-six">Изменить роль пользователя</label>
          <div className="pesontedan-content">
            <ChangeRole users={users}/>
          </div>
        </div>
        <div key={7} className="pesontedan">
          <input id="pesontedan-seven" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-seven">Удалить пользователя</label>
          <div className="pesontedan-content">
            <DeleteUser users={users}/>
          </div>
        </div>

      </div>
    </div>
  )
}

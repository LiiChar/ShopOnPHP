import React from 'react'
import './admin.css'
import { AddProduct } from '../../components/adminActions/AddProduct'
import { AddManufacturer } from '../../components/adminActions/addManufacturer'
import { UpdateProduct } from '../../components/adminActions/updateProduct'
import { AddCategory } from '../../components/adminActions/AddCategory'

export const Admin = () => {
  return (
    <div  className="navigaonusing">
      <div className="gaonutosal">
        <div key={1} className="pesontedan">
          <input id="pesontedan-one" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-one">Добавить продукт</label>
          <div className="pesontedan-content">
            <AddProduct/>
          </div>
        </div>
        <div key={2} className="pesontedan">
          <input id="pesontedan-two" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-two">Изменить продукт</label>
          <div className="pesontedan-content">
            <UpdateProduct/>
          </div>
        </div>
        <div key={3} className="pesontedan">
          <input id="pesontedan-three" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-three">Добавить производителя</label>
          <div className="pesontedan-content">
            <AddManufacturer/>
          </div>
        </div>
        <div key={4} className="pesontedan">
          <input id="pesontedan-four" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-four">Добавить категорию</label>
          <div className="pesontedan-content">
            <AddCategory/>
          </div>
        </div>
        <div key={5} className="pesontedan">
          <input id="pesontedan-five" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-five">Удалить продукт</label>
          <div className="pesontedan-content">
            <p>Третье описание по материалу</p>
          </div>
        </div>
        <div key={6} className="pesontedan">
          <input id="pesontedan-six" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-six">Изменить роль пользователя</label>
          <div className="pesontedan-content">
            <p>Третье описание по материалу</p>
          </div>
        </div>
        <div key={7} className="pesontedan">
          <input id="pesontedan-seven" type="checkbox" name="pesontedans" />
          <label htmlFor="pesontedan-seven">Удалить пользователя</label>
          <div className="pesontedan-content">
            <p>Третье описание по материалу</p>
          </div>
        </div>

      </div>
    </div>
  )
}

import React from 'react'
import { useForm } from 'react-hook-form'
import '../loginPage/login.css'
import {Link, useNavigate} from 'react-router-dom'
import { useCreateUsersMutation } from '../../store/Slices/userApi';

interface UserInput {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

export const Registration = () => {
  const { register, handleSubmit} = useForm<UserInput>()
  const [error, setError] = React.useState<string>();
  const navigate = useNavigate();

  const [createUser] = useCreateUsersMutation();

  const onSubmitHandler = async (value: UserInput) => {
    if (value.password !== value.repeatPassword) {
      setError('пароли не совпадают')
      return
    }
    const data: string | any = await createUser(value);
    
    if (data.error) {
      setError(data.error.data);
    } else if (data.data) {
      sessionStorage.setItem('user', data.data.username);
      sessionStorage.setItem('user_id', data.data.user_id);
      navigate('/login');
    }
    
  }

  return (
    <div className='wrapper'>
      <div className='formWrap'>
        <h4>Login</h4>
        <form className='form' onSubmit={handleSubmit(onSubmitHandler)}>
          <input autoFocus {...register('username', { required: 'username is require', minLength: 3, })} placeholder="Username" />
          <input type='password' {...register('password', { required: 'password is require'})} placeholder="Password" />
          <input type='password' {...register('repeatPassword', { required: 'repeatPassword is require' })} placeholder="Repeat password" />
          <input type='email' {...register('email', { required: false , validate: {isEmail: v => v.includes('@') && v.includes('.')}})} placeholder="email" />
          <button type="submit">Submit </button> <span>{error ?? error}</span>
          <div><p>Если вы зарегестрированы, <Link to={'/login'}>войдите</Link> </p></div>
        </form>
      </div>

    </div>
  );
}
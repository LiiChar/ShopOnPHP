
import React from 'react'
import { useForm } from 'react-hook-form'
import './login.css'

import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../store/Slices/userApi';

interface UserInput {
  username: string;
  password: string;
  repeatPassword: string;
}

export const Login = () => {
  const { register, handleSubmit} = useForm<UserInput>()
  const [error, setError] = React.useState<string>();
  const navigate = useNavigate();

  const [login] = useLoginUserMutation();

  React.useEffect(() => {
    if (sessionStorage.getItem('user')) {
      navigate('/')
    }
  })

  const onSubmitHandler = async (value: UserInput) => {
    if (value.password !== value.repeatPassword) {
      setError('пароли не совпадают')
      return
    }
    let input: any = {
      password: value.password
    }
    if (value.username.includes('@') && value.username.includes('.')) {
      input.email = value.username
    } else {
      input.username = value.username
    }
    const data: string | any = await login(input);
    
    if (data?.error) {
      setError(data?.error.data);
    } else if (data?.data){
      sessionStorage.setItem('user', data.data.username);
      sessionStorage.setItem('user_id', data.data.user_id);
      
      navigate('/');
    }
  }

  return (
    <div className='wrapper'>
      <div className='formWrap'>
        <h4>Signup</h4>
        <form className='form' onSubmit={handleSubmit(onSubmitHandler)}>
          <input autoFocus {...register('username', { required: 'username is require', minLength: 3, })} placeholder="Username" />
          <input type='password' {...register('password', { required: 'password is require' })} placeholder="Password" />
          <input type='password' {...register('repeatPassword', { required: 'repeatPassword is require' })} placeholder="Repeat password" />
          <button type="submit">Submit </button> <span>{error ?? error}</span>
          <div><p>Если вы не  зарегестрированы, <Link to={'/register'}>зарегестрируйтесь</Link> </p></div>
          <div>Если вы хотите зайти от админа то логин: LiiChar, пароль: qwe</div>
        </form>
      </div>

    </div>
  );
}

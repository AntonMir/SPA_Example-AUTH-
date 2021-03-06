import React, { useState, useEffect, useContext } from 'react'
// castom hook
import { useHttp } from '@hooks/http.hook.js'
import { useMessage } from '@hooks/message.hook.js'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// config
import config from '@config/config.js'
// styled
import styled from 'styled-components'

export default function Login() {
    // используем контекст кторый создали (AuthContext)
    // это нужно, чтобы воспользоваться методом login
    const auth = useContext(AuthContext)

    // кастомный хук для вывоа ошибки
    const message = useMessage()

    // кастомный хук для отправки данных
    const { loading, error, request, clearError } = useHttp()

    // state для email и pass
    const [form, setForm] = useState({ email: '', password: '' })

    // обработаем ошибку
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // сохраняем в наш state email и password
    const changeUserData = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // вызывает хук useHttp, отправляет запрос на сервер,
    // получает ответ в виде промиса и выводит его на экран
    // при авторизации
    const loginHandler = async () => {
        try {
            const data = await request(`${config.AuthServerURL}/api/auth/login`, 'POST', { ...form })
            auth.login(data.token, data.userId, data.userName)
        } catch (e) {}
    }

    return (
        <LoginWrapper>
            <LoginForm>
                <Input
                    placeholder="Email"
                    id="login-email"
                    type="text"
                    name="email"
                    onChange={changeUserData}
                    autoComplete="off"
                    required
                />
                <Input
                    placeholder="Password"
                    id="login-password"
                    type="password"
                    name="password"
                    onChange={changeUserData}
                />
                <Button onClick={loginHandler} disabled={loading}>
                    Войти
                </Button>
            </LoginForm>
        </LoginWrapper>
    )
}

const LoginWrapper = styled.div`
    padding: 30px 50px 30px;
    width: 100%;
    box-shadow: 2 2 5px #000;
    border: 1px #aaa solid;
    border-top: none;

    border-radius: 0 0 10px 10px;
    -webkit-border-radius: 0 0 10px 10px;
    -moz-border-radius: 0 0 10px 10px;
    -ms-border-radius: 0 0 10px 10px;
    -o-border-radius: 0 0 10px 10px;
`

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    margin-bottom: 30px !important;
    background-color: rgba(00, 00, 00, 0);
    color: #fff;
    height: 30px;
    width: 100%;
`

const Button = styled.button`
    padding: 5px 25px 10px;
    margin: 15px 0 0 0;
    font-size: 20px;
    background-color: rgba(00, 00, 00, 0);
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border: 1px #00b5d6 solid;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #00b5d6;
    }
`

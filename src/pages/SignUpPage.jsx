import { useState, useEffect, useContext } from "react";
import api from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputMask from "react-input-mask";

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [confPass, setConfP] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    const handleForm = (event, qual) => {
        qual(event.target.value);
    }

    function cadastrar(event) {
        event.preventDefault();
        if (!name || !email || !password || !confPass || !phone || !cpf) {
            alert('Preencha todos os campos!');
            return;
        }
        if (password !== confPass) {
            alert('As senhas não coincidem!');
            return;
        }

        const objt = {
            name,
            email,
            password,
            confirmPassword: confPass,
            phone,
            cpf
        }

        api.post(`/signup`, objt)
            .then((res) => {
                alert('Conta cadastrada com sucesso!');
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <Body>
            <SideBarr>
                <h1>Cadastre-se e venha aproveitar o desapego</h1>
                <img />
            </SideBarr>
            <Container>
                <Form onSubmit={event => cadastrar(event)}>
                    <Input
                        required
                        type="text"
                        placeholder="Digite seu nome"
                        name="name"
                        value={name}
                        onChange={(event) => handleForm(event, setName)}
                    />

                    <Input
                        required
                        type="email"
                        placeholder="Digite seu e-mail"
                        autoComplete="username"
                        name="email"
                        value={email}
                        onChange={(event) => handleForm(event, setEmail)}
                    />

                    <Input
                        required
                        type="password"
                        placeholder="Digite sua senha"
                        autoComplete="new-password"
                        name="password"
                        value={password}
                        onChange={(event) => handleForm(event, setPass)}
                    />

                    <Input
                        required
                        type="password"
                        placeholder="Confirme sua senha"
                        autoComplete="new-password"
                        name="password"
                        value={confPass}
                        onChange={(event) => handleForm(event, setConfP)}
                    />
                    <Input
                        required
                        type="text"
                        placeholder="CPF"
                        name="cpf"
                        value={cpf}
                        onChange={(event) => handleForm(event, setCpf)}
                    />
                    <InputMask
                        mask="(99) 99999-9999"
                        placeholder="(xx) 9xxxx-xxxx"
                        value={phone}
                        onChange={(event) => handleForm(event, setPhone)}
                    />                    
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to={"/"}>
                    <p>Já possui uma conta? Faça login!</p>
                </Link>
            </Container>
        </Body>
    )
}

const Body = styled.div`
    width: 100%;
    height: 100vh; /* Usando a altura da janela (viewport) */
    background-color: #D8BFD8;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    width: 100%; /* Alterado para ocupar toda a largura da tela */
    height: 100%; /* Alterado para ocupar toda a altura da tela */
    background-color: #FFF0F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 2rem; /* Adicionado espaçamento interno para o conteúdo */

    & p{
        color: #8B008B;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 12px;
        text-decoration: underline;
        margin-top: 15px;
    }
`

const Form = styled.form`
    width: 300px;
    box-sizing: border-box;
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    margin-bottom: 7px;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    padding-left: 10px;
    font-family: 'Mulish', sans-serif;
`
const Button = styled.button`
    width: 100%;
    height: 35px;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    background-color: #DDA0DD;
    font-family: 'Mulish', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 5px;
`

const SideBarr = styled.div`
    width: 100%; /* Alterado para ocupar toda a largura da tela */
    height: 200px;
    margin-right: 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h1{
        font-family: 'Mulish', sans-serif;
        font-size: 50px;
        color: #FFFFFF;
        margin-bottom: 15px;
    }
`

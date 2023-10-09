import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../axiosConfig';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

export default function AddProduct() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user?.token}` } };

    try {
      const response = await api.post('/products', formData, config);
      console.log(response.data);
      // Redirecionar para a página de detalhes do produto após a criação bem-sucedida
      navigate(`/product/${response.data.product.id}`);
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar o produto.');
    }
  };

  useEffect(() => {
    // Verificar se o usuário não está logado e redirecionar para a página de login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="price"
            placeholder="Preço"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            name="image_url"
            placeholder="URL da imagem"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
              }}
            >
            <option value="">Selecione uma categoria</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="roupas">Roupas</option>
            <option value="moveis">Móveis</option>
            <option value="livros">Livros</option>
            <option value="veiculos">Veículos</option>
            <option value="musicas">Músicas</option>
            <option value="esportes">Esportes</option>
            <option value="brinquedos">Brinquedos</option>
            <option value="ferramentas">Ferramentas</option>
            <option value="artes">Artes</option>
        </select>
          <Button type="submit">Adicionar Produto</Button>
        </Form>
      </FormContainer>
    </>
  );
}

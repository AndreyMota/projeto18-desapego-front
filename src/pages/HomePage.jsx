import React from 'react';
import styled from 'styled-components';
import Produto from '../components/Produto';
import api from '../axiosConfig';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start; /* Alinhar os produtos no início verticalmente */
`;

const ProdutoComEspacamento = styled(Produto)`
  margin-right: 100px; /* Espaçamento entre os produtos */
  margin-bottom: 10px;
`;

export default function Home() {
    const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [prods, setProds] = useState([]);
  useEffect(() => { if (!user) { navigate("/") } }, []);
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };
  useEffect(() => {
    api.get('/products', config)
      .then((res) => {
        console.log(res);
        setProds(res.data.rows);
        console.log(res.data.rows);
      })
      .catch(err => alert(err.response.request.responseText));
  }, []);

  return (
    <>
      <ProductGrid>
        {prods.map((product) => (
          <ProdutoComEspacamento
            key={product.id}
            quei={product.id}
            title={product.name}
            price={product.price}
            category={product.category}
            imageMain={product.image_url}
          />
        ))}
      </ProductGrid>
    </>
  );
}

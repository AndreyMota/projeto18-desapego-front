import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../axiosConfig';
import UserContext from '../contexts/userContext';

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProdutoComEspacamento = styled.div`
  min-width: 210px;
  max-width: 210px;
  max-height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ProductName = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const ProductPrice = styled.span`
  font-size: 18px;
  color: #007bff;
`;

const ProductCategory = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const BuyButton = styled.button`
  background-color: #ff85a2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff6b8e;
  }
`;

const ProductImageStyled = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
`;

export default function MyProds() {
  const { user } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (user) {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      api.get('/user/products', config)
        .then((res) => {
          setUserProducts(res.data.rows);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  const handleMarkAsSold = (productId) => {
    api
      .delete(`/products/${productId}`)
      .then(() => {
        setUserProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Meus Produtos</h1>
      <ProductGrid>
        {userProducts.map((product) => (
          <ProdutoComEspacamento key={product.id}>
            <ProductImageStyled src={product.image_url} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>R$ {(product.price / 100).toFixed(2).replace('.', ',')}</ProductPrice>
            <ProductCategory>{product.category}</ProductCategory>
            <BuyButton onClick={() => handleMarkAsSold(product.id)}>Vendido</BuyButton>
          </ProdutoComEspacamento>
        ))}
      </ProductGrid>
    </>
  );
}



/* const handleMarkAsSold = (productId) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    api.delete(`/products/${productId}`, config)
      .then(() => {
        // Remova o produto da lista de produtos do usuário após a exclusão bem-sucedida.
        setUserProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error(error);
      });
  }; */
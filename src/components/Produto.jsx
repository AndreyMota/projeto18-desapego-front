import React, { useContext } from "react";
import UserContext from "../contexts/userContext";
import api from "../axiosConfig";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Novo componente ProductImage
function ProductImage({ imageMain }) {
  return <ProductImageStyled src={imageMain} />;
}

export default function Produto({ title, price, category, imageMain, quei }) {
    const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  function handleBuyClick() {
    navigate('/product/' + quei);
  }

  return (
    <>
        <ProductContainer>
        {/* Adicione o componente ProductImage aqui */}
        <ProductImage imageMain={imageMain} />

        <ProductName>{title}</ProductName>
        <ProductPrice>R$ {(price / 100).toFixed(2).replace('.', ',')}</ProductPrice>
        <ProductCategory>{category}</ProductCategory>
        <BuyButton onClick={handleBuyClick}>Comprar</BuyButton>
        </ProductContainer>
    </>
  );
}

const ProductContainer = styled.div`
  min-width: 210px;
  max-width: 210px;
  max-height: 440px; /* Aumentado em 50 pixels */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
  height: 200px; /* Tamanho fixo para a imagem */
  object-fit: cover;
`;

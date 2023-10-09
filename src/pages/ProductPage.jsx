import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ImageList = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinhamento à esquerda para comportamento de scroll horizontal */
  overflow-x: auto; /* Habilitar o scroll horizontal */
  width: 300px; /* Largura fixa do ImageList */
  max-width: 100%; /* Para que não ultrapasse o tamanho do contêiner pai */
`;

const ImageContainer = styled.div`
  flex-shrink: 0; /* Impedir que as imagens encolham */
  width: 200px; /* Largura fixa de cada imagem */
  margin-right: 10px; /* Espaçamento entre as imagens */
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 600px; /* Aumentei o tamanho máximo para 600px */
  height: auto;
`;

const ProductInfo = styled.div`
  text-align: center;
`;

export default function Product() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.produto);
        console.log(res.data.produto);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <>
      <ProductContainer>
      <ImageList>
        {product.images && product.images.length > 0 && (
          product.images.map((image, index) => (
            <ImageContainer key={image.id}>
              <Image src={image.image_url} alt={`Imagem ${index + 1}`} />
            </ImageContainer>
          ))
        )}
      </ImageList>
      <ProductInfo>
        <h1>{product.name}</h1>
        <p>Preço: R$ {(product.price / 100).toFixed(2).replace('.', ',')}</p>
        <p>Descrição: {product.description}</p>
        <p>Categoria: {product.category}</p>
        <p>Contato: {product.contact_info}</p>
      </ProductInfo>
    </ProductContainer>
    </>
    
  );
}


/* {
  "produto": {
    "id": 3,
    "user_id": 2,
    "contact_info": "(65) 98465-2118",
    "name": "uepa",
    "price": 200,
    "description": "cabalo",
    "category": "roupas",
    "images": [
      {
        "id": 4,
        "image_url": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR6ewajy7RRJr6cy1b28UG3V7At78DaYU15XSMrwni_UzFzDTGvay7JKlYxYH8LAlwZ",
        "is_main_image": false
      },
      {
        "id": 5,
        "image_url": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR6ewajy7RRJr6cy1b28UG3V7At78DaYU15XSMrwni_UzFzDTGvay7JKlYxYH8LAlwZ",
        "is_main_image": false
      },
      {
        "id": 3,
        "image_url": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR6ewajy7RRJr6cy1b28UG3V7At78DaYU15XSMrwni_UzFzDTGvay7JKlYxYH8LAlwZ",
        "is_main_image": false
      },
      {
        "id": 6,
        "image_url": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR6ewajy7RRJr6cy1b28UG3V7At78DaYU15XSMrwni_UzFzDTGvay7JKlYxYH8LAlwZ",
        "is_main_image": true
      }
    ]
  }
} */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  background-color: #333;
  color: white;
  padding: 20px;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
  p:hover {
    cursor: pointer;
  }
`;

export default function Reader() {
    const navigate = useNavigate();
    return (
        <Header><p onClick={() => navigate('/home')}>Me Cansei!</p> <p onClick={() => navigate('my-products')}>Meus Desapegos</p> <p onClick={() => navigate('/add-product')}>Desapegar</p>
        </Header>   
    )
}
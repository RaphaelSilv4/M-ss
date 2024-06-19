import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CgArrowLeftO } from "react-icons/cg";

const DivMainContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000 !important; 

    button {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 20px;
    background: transparent;
    color: #fdf2f2;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease-in-out;
    }

`;

const MenssageErr = styled.div`
   background-color: #0d0d0d;
   display: flex;
   justify-content: center;
   align-items: center;

   h1 {
    color: wheat;
    font-weight: bold;
   }

`;

function NotFound() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <DivMainContainer>
            <button onClick={handleGoBack}><CgArrowLeftO size={20} />Voltar</button>
            <MenssageErr>
                <h1>Página Não Encontrada </h1>
            </MenssageErr>
        </DivMainContainer>
    );
}

export default NotFound;

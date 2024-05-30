import styled from "styled-components";

const DivMainContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b38d95;
`;

const DivContainerLoginCadastro = styled.div`
    width: 55vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d3cbcb;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0px rgb(110, 104, 104);
`;

const DivContainerLogin = styled.div`
    width: 30vw;
    height: 90vh;    

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("/src/assets/Rectangle\ 2.png ");
    border-radius: 10px 0px 0px 10px;
`;

const DivContainerCadastro = styled.div`
    width: 70vw;
    height: 90vh;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const CriarConta = styled.h1`
    height: 50%;
    display: flex;
    justify-content: center;
    color: #bd1313;
    font-weight: 700;
    margin: 0;
`;

const SubMenssagem = styled.h4`
    height: 50%;
    display: flex;
    justify-content: center;
    color: #a88989;
    font-size: 12pt;
    margin: 0;
`;

const DivTextFild = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 10px;
`;

const DivTextFildInput = styled.input`
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 15px;
    background-color: rgb(211, 162, 162);
    color: #8d7070;
    font-size: 12pt;
    box-shadow: 0px 5px 20px #ce1a1a;
    outline: none;
    box-sizing: border-box;
`;

const DivBtn = styled.div`
    width: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    width: 50%;
    height: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 16px 0px;
    margin: 25px;
    border: none;
    border-radius: 20px;
    outline: none;
    font-weight: 800;
    letter-spacing: 2px;
    color: #3a2123;
    background: #ca1a29;
    cursor: pointer;
    box-shadow: 0px 10px 40px -12px #111111;
`;

export {
    DivMainContainer,
    DivContainerLoginCadastro,
    DivContainerLogin,
    DivContainerCadastro,
    CriarConta,
    SubMenssagem,
    DivTextFild,
    DivTextFildInput,
    DivBtn,
    Button}

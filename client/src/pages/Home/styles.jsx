import styled from 'styled-components';

const DivMainContainer = styled.div`
    height: 100%;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    background: #000000 !important;
    overflow-x: hidden; 
`;

const Container = styled.div`
    max-width: 1200px;
    flex-wrap: nowrap;
    margin: 0 auto;
    padding: 1rem;
    box-sizing:  border-box;
    width: 100%;
    min-height: 580px;
    margin-top: 0px;
    position: relative;

    background: rgba(15, 15, 15, .9);
    backdrop-filter: saturate(180%) blur(10px);
    border-bottom: solid 1px rgba(255, 255, 255, .07);
    border-top: solid 1px rgba(255, 255, 255, .07);
    border-radius: 0 0 1rem 1rem;
  
    @media (max-width: 768px) {
        padding: 1rem;
        font-size: 8pt;
    }

    h1 {
        border-width: 1px;
        border-style: solid;
        border-color: #c2182b;
        color: #d1c5c6df;
        margin-top: 10px;
        margin-bottom: 4px;
        border-radius: 6px;
        box-shadow: 0px 0px 4px 0px #222d34;
    }

    p {
        border-width: 1px;
        border-style: solid;
        border-color: #c2182b;
        color: #d1c5c6df;
        margin-top: 10px;
        margin-bottom: 4px;
        border-radius: 6px;
        box-shadow: 0px 0px 4px 0px #222d34;
    }
`;

const MovieList = styled.ul`
    list-style: none;
    
`;

const Movie = styled.li`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    img {
        width: 185px;
        height: auto;
        display:flex;
        padding: 10px;
        border-radius: 1rem;
        margin-bottom: 1rem;
    }

    span {
        color: #D3D3D3;
        font-size: 1.2rem;
        font-style: italic;
        text-align: right;
    }

    a {
        transition: all 0.3s;
    }

    a:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        img {
            width: 130px;
        }
        span {
            font-size: 0.8rem;
        }
        a {
            transform: scale(1);
        }
    }

`;

const ButtonLR = styled.button`
    background-color: #c03333;
    border-radius: 0.5rem;
    margin: 0.2rem;
    border: none;
    cursor: pointer;

    @media (max-width: 768px) {
        margin: 0.1rem;
        font-size: 8pt;
        padding: 0.2rem;
        width: 40px;
    }
`;

export { ButtonLR }
export { Movie }
export { Container }
export { MovieList }
export { DivMainContainer }

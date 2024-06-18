import styled from "styled-components";

const DivMainContainer = styled.div`
    height: 100%;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    background: #000000 !important;
    
`;

const Container = styled.div`
    max-width: 1000px;
    flex-wrap: nowrap;
    margin: 0 auto;
    padding: 1rem;
    
    width: 100%;
    min-height: 812px;
    margin-top: 0px;
    position: relative;

    background: rgba(15, 15, 15, .9);
    backdrop-filter: saturate(180%) blur(10px);
    border-bottom: solid 1px rgba(255, 255, 255, .07);
    border-top: solid 1px rgba(255, 255, 255, .07);
    border-radius: 0 0 1rem 1rem;
  
    @media (max-width: 768px) {
        padding: 1rem;
    }

    h2 {
        border-width: 1px;
        border-style: solid;
        border-color: #c2182b;
        color: #d1c5c6df;
        margin-top: 10px;
        margin-bottom: 4px;
        border-radius: 6px;
        box-shadow: 0px 0px 4px 0px #222d34;
    }
    button {
    background: transparent;
    color: #fdf2f2;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease-in-out;
  }
  select {
    transition: transform 0.3s ease-in-out;
    color: #fdf2f2;
    cursor: pointer;
    border: none;
    opacity: .97;
    margin-bottom: 15px;
    border-radius: 3px;

    font-family: "font awesome 5 pro";
    font-style: normal;
    font-weight: 900;
    margin-left: 10px;
    font-size: 14px;
     

    &::after{
    background: rgba(12, 0, 0, 0.9);
    backdrop-filter: saturate(180%) blur(10px);
    border-bottom: solid 1px rgba(255, 255, 255, .07);
    border-top: solid 1px rgba(255, 255, 255, .07);
    opacity: .97;
    border-radius: 3px;
}

    &:hover {
    background: rgba(12, 0, 0, 0.98);
  }

    &:focus {
    outline: none;
    border: none;
  }
    option {
    background-color: #000000;
    color: #fdf2f2;
  }
  }
  
`;

const List = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

const Midia = styled.li`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;

    img {
        width: 180px;
        padding: 10px;
        border-radius: 1rem;
        margin-bottom: 2rem;
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
`;


export { Midia }
export { Container }
export { List }
export { DivMainContainer }
import styled from 'styled-components';

const DivMainContainer = styled.div`
    height: 100vh;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    background: #000000 !important;
    
`;

const ButtonBack = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  position: relative;
  z-index: 2;
  background: transparent;
  color: #fdf2f2;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 50px auto;
  color: #fff;

  h1 {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #c0bebe;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  color: #fff;
  font-size: 400;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #a12525;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background: #942d2d;
  }
`;

export {DivMainContainer, SettingsContainer, Form, FormGroup, Label, Input, Button,ButtonBack };

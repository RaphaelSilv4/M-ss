import React, { useState,useContext } from 'react';
import api from '../../services';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

import { DivMainContainer, SettingsContainer, Button, Form, FormGroup, Input, Label, ButtonBack } from './UserSettingsStyles';
import { useNavigate } from 'react-router-dom';
import { CgArrowLeftO } from "react-icons/cg";

const Settings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);   

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { name, email, password };

        try {
            const response = await api.put(`/routes/client/${userId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                navigate('/login');
            }else {
                console.error('Erro ao atualizar cliente:', response.data.message);
            }

            

        } catch (error) {
            console.error('Erro ao atualizar cliente:', error.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <DivMainContainer>
            <ButtonBack onClick={handleGoBack}><CgArrowLeftO size={20} /></ButtonBack>
            <SettingsContainer>
                <h1>Atualizar Dados</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Nome:</Label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">E-mail:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Senha:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <Button type="submit">Atualizar</Button>
                </Form>
            </SettingsContainer>
        </DivMainContainer>
    );
};

export default Settings;

import React from 'react';
import { Container, ContainerLoading } from './styles';

function Loader() {
    return (

        <Container>
            <ContainerLoading >
                <h1>Carregando...</h1>
            </ContainerLoading>
        </Container>
        
    )
}

export default Loader;
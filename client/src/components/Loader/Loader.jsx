import React from 'react';
import { Container, ContainerLoading } from './LoaderStyles';

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
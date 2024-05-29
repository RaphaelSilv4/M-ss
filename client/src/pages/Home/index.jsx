import styled from './home.module.css'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <>
            <div className={styled.main}>
                <h1 className={styled.HomePage}>Home Page</h1>
                <Link to={'/register'} className={styled.cadastro}>cadastro</Link>
            </div>

        </>
    )
}

export default HomePage
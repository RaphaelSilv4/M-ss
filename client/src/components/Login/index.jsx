import styles from './login.module.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.containerMenssagem}>
                    <div className={styles.textSigla}>
                        <span className="sigla">M & S</span>
                    </div>
                    <div className={styles.textMenssagem}>
                        <span className="menssagem">Bem-vindo de volta!</span>
                    </div>
                    <div className={styles.subMenssagem}>
                        <span className="menssagem-login">Faça seu login ao lado.</span>
                    </div>
                </div>
                <div className={styles.containerLogin}>
                    <form className={styles.loginForm}>
                        <h1 className={styles.loginMenssage}>Faça seu Login</h1>
                        <div className={styles.textfild}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='Email' />
                        </div>
                        <div className={styles.textfild}>
                            <label htmlFor="senha">Senha</label>
                            <input type="password" name='senha' placeholder='Senha' />
                        </div>
                        <div className={styles.containerLoginFormBtn}>
                            <Link to='/home' className={styles.loginBtn}>ENTRAR</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;

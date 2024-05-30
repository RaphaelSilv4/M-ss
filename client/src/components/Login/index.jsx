import { useNavigate,Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import api from '../../services';
import  AuthContext  from '../../contexts/AuthContext';
import styles from './login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    async function onSubmitHandler(event) {
        event.preventDefault();

        const validationErrors = {};

        // Verificar se todos os campos estão preenchidos
        if (!email.trim()) {
            validationErrors.email = 'Por favor, preencha este campo.';
        }

        if (!senha.trim()) {
            validationErrors.senha = 'Por favor, preencha este campo.';
        }

        // Verificar se o email é válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            validationErrors.email = 'Por favor, insira um email válido.';
        }

        if (senha.trim().length < 4) {
            validationErrors.senha = 'A senha deve ter no mínimo 4 caracteres.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await api.post('/login/', {
                email,
                senha
            });

            if (response.status === 200) {
                // Login bem-sucedido
                navigate('/home');
                context.setIsAuthenticated(true);
            } else {
                // Exibir mensagem de erro de login
                console.error('Erro ao fazer login');
            }
        } catch (error) {
            // Exibir mensagem de erro
            console.error('Erro ao fazer login:', error);
            setSubmitError('Email ou senha incorretos');
        }
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                
                <div className={styles.containerMenssagem}>
                    <div className={styles.textSigla}>
                        <span>M & S</span>
                    </div>
                    <div className={styles.textMenssagem}>
                        <span >Seja Bem-vindo!</span>
                    </div>
                    <div className={styles.textMenssagem2}>
                        <span >Crie sua conta</span>
                    </div>
                    <Link to='/register' className={styles.buttonCadastro} >Cadastrar</Link>
                </div>

                <div className={styles.containerLogin}>

                    <form className={styles.loginForm} onSubmit={onSubmitHandler}>
                        <h1 className={styles.loginMenssage}>Faça Seu Login</h1>
                        <div className={styles.textfild}>
                            <input type="email"
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                            
                        </div>
                        <div className={styles.textfild}>
                            <input type="password"
                                name='password'
                                placeholder='Senha'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} />
                            {errors.senha && <p className={styles.error}>{errors.senha}</p>}
                            
                        </div>
                        <div className={styles.containerLoginFormBtn}>
                            <button className={styles.loginBtn} type='submit'>Entrar</button>
                        </div>
                    </form>
                    {/* Se houver um erro de envio, exibir mensagem de erro */}
                    {submitError && <div className={styles.errorCadastro}>{submitError}</div>}
                </div>
                
            </div>
        </div>
    )
}

export default Login;


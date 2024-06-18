import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import api from '../../services';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import styles from './login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    async function onSubmitHandler(event) {
        event.preventDefault();

        const validationErrors = {};

        
        if (!email.trim()) {
            validationErrors.email = 'Por favor, preencha este campo.';
        }

        if (!password.trim()) {
            validationErrors.password = 'Por favor, preencha este campo.';
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            validationErrors.email = 'Por favor, insira um email válido.';
        }

        if (password.trim().length < 4) {
            validationErrors.password = 'A senha deve ter no mínimo 4 caracteres.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await api.post('/login/', {
                email,
                password
            });

            console.log(response.status)
            
            if (response.status === 200) {
               
                localStorage.setItem('token', response.data.access_token);

                const user = response.data.user;
                login(user);
                navigate('/home');
            } else {
                
                console.error('Erro ao fazer login');
                setSubmitError('Email ou senha incorretos');
            }
        } catch (error) {
            
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
                        <span>Seja Bem-vindo!</span>
                    </div>
                    <div className={styles.textMenssagem2}>
                        <span>Crie sua conta</span>
                    </div>
                    <Link to='/register' className={styles.buttonCadastro}>Cadastrar</Link>
                </div>

                <div className={styles.containerLogin}>

                    <form className={styles.loginForm} onSubmit={onSubmitHandler}>
                        <h1 className={styles.loginMenssage}>Faça Seu Login</h1>
                        <div className={styles.textfild}>
                            <input 
                                type="email"
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                        <div className={styles.textfild}>
                            <input 
                                type="password"
                                name='password'
                                placeholder='Senha'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            {errors.password && <p className={styles.error}>{errors.password}</p>}
                        </div>
                        <div className={styles.containerLoginFormBtn}>
                            <button className={styles.loginBtn} type='submit'>Entrar</button>
                        </div>
                    </form>
                    {submitError && <div className={styles.errorCadastro}>{submitError}</div>}
                </div>
                
            </div>
        </div>
    )
}

export default Login;

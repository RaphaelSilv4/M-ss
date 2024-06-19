import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services';

import styles from './register.module.css';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();

    const validationErrors = {};

    // Verificar se todos os campos estão preenchidos
    if (!email.trim()) {
      validationErrors.email = 'Por favor, preencha este campo.';
    }

    if (!name.trim()) {
      validationErrors.name = 'Por favor, preencha este campo.';
    }

    if (!password.trim()) {
      validationErrors.password = 'Por favor, preencha este campo.';
    }

    // Verificar se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      validationErrors.email = 'Por favor, insira um email válido.';
    }

    // Verificar se a senha tem no mínimo 8 caracteres
    if (password.trim().length < 4) {
      validationErrors.password = 'A senha deve ter no mínimo 4 caracteres.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post('/routes/client', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);

      // Redirecionar para a página home após o cadastro bem-sucedido
      navigate('/login');
    } catch (error) {
      console.error(error);
      setSubmitError('Ocorreu um erro ao processar o cadastro. Por favor, tente novamente mais tarde.');
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerLoginCadastro}>
        <div className={styles.containerLogin}>
          <div className={styles.textSigla}>
            <span className="sigla">M & S</span>
          </div>
          <div className={styles.textMenssagem}>
            <span className="menssagem">Bem-vindo de volta!</span>
          </div>
          <div className={styles.textMenssagem2}>
            <span className="menssagem-login">Acesse sua conta</span>
          </div>
          <div className={styles.containerLoginFormBtn}>
            <Link to='/login' className={styles.linkloginBtn}>Entrar</Link>
          </div>
        </div>
        <div className={styles.containerCadastro}>
          <div className={styles.cadastro}>
            <form className={styles.cadastroForm} onSubmit={onSubmitHandler}>
              <h1 className={styles.criarConta}>Criar Conta</h1>
              <h1 className={styles.subMenssagem}>Cadastre-se com seu email</h1>
              <div className={styles.textfild}>
                <input
                  type="email"
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className={styles.error}>{errors.email}</div>}
              </div>
              <div className={styles.textfild}>
                <input
                  type="text"
                  name='name'
                  placeholder='Nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className={styles.error}>{errors.name}</div>}
              </div>
              <div className={styles.textfild}>
                <input
                  type="password"
                  name='password'
                  placeholder='Senha'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className={styles.error}>{errors.password}</div>}
              </div>
              <div className={styles.containerCadastroFormBtn}>
                <button className={styles.buttonCadastro} type='submit'>Cadastrar</button>
              </div>
            </form>
          </div>
          {/* Se houver um erro de envio, exibir mensagem de erro */}
          {submitError && <div className={styles.errorCadastro}>{submitError}</div>}
        </div>
      </div>
    </div>
  );
}

export default Register;

import { Link } from 'react-router-dom';
import styles from './register.module.css'


function Register() {

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
            <span className="menssagem-login">Faça seu login abaixo.</span>
          </div>
          <div className={styles.containerLoginFormBtn}>
            <Link to='/' className={styles.linkloginBtn}>ENTRAR</Link>
          </div>
        </div>
        <div className={styles.containerCadastro}>
          <div className={styles.cadastro}>
            <form className={styles.cadastroForm}>
              <h1 className={styles.criarConta}>Criar Conta</h1>
              <h1 className={styles.subMenssagem}>Cadastre-se com seu email</h1>
              <div className={styles.textfild}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email' />
              </div>
              <div className={styles.textfild}>
                <label htmlFor="usuario">Usuário</label>
                <input type="text" name='usuario' placeholder='Usuário' />
              </div>
              <div className={styles.textfild}>
                <label htmlFor="usuario">Senha</label>
                <input type="password" name='senha' placeholder='Senha' />
              </div>
              <div className={styles.containerCadastroFormBtn}>
                <Link to='/home' className={styles.linkButton}>CADASTRAR</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register

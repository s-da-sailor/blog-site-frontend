import Illustration from '../Illustration';
import loginImagePath from '../../assets/images/login.svg';
import LoginForm from '../LoginForm';

export default function Login() {
  return (
    <>
      <h1>Log in to your account</h1>

      <div className="column">
        <Illustration>
          <img src={loginImagePath} alt="Login" />
        </Illustration>
        <LoginForm />
      </div>
    </>
  );
}

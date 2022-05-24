import Form from '../Form';
import Illustration from '../Illustration';
import classes from '../../styles/Login.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import loginImagePath from '../../assets/images/login.svg';

export default function Login() {
  return (
    <>
      <h1>Log in to your account</h1>

      <div className="column">
        <Illustration>
          <img src={loginImagePath} alt="Login" />
        </Illustration>
        <Form className={`${classes.login}`}>
          <TextInput type="text" placeholder="Enter username" icon="person" />

          <TextInput type="password" placeholder="Enter password" icon="lock" />

          <Button>Submit Now</Button>

          <div className="info">
            Don't have an account? <a href="signup.html">Signup</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
}

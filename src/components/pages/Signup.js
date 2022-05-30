import Illustration from '../Illustration';
import signupImagePath from '../../assets/images/signuppic.svg';
import SignupForm from '../SignupForm';

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration>
          <img src={signupImagePath} alt="Signup" />
        </Illustration>
        <SignupForm />
      </div>
    </>
  );
}

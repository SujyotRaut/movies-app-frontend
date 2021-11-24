import { FormEventHandler, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register } = useRegister();
  const { login } = useLogin();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler: FormEventHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      const email = emailInputRef.current?.value ?? '';
      const password = passwordInputRef.current?.value ?? '';
      login(email, password);
    } else {
      const name = nameInputRef.current?.value ?? '';
      const email = emailInputRef.current?.value ?? '';
      const password = passwordInputRef.current?.value ?? '';
      register(name, email, password);
    }
  };

  return (
    <Container>
      <Form>
        {!isLogin && (
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameInputRef} type='text' placeholder='Name' />
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailInputRef}
            type='email'
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInputRef}
            type='password'
            placeholder='Password'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check
            checked={isLogin}
            onChange={() => setIsLogin(!isLogin)}
            type='checkbox'
            label={isLogin ? 'Login' : 'Register'}
          />
        </Form.Group>

        <Button type='submit' onClick={submitHandler}>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

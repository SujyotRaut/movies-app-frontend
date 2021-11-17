import { useMutation } from '@apollo/client';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { authContext } from '../App';
import { LOGIN, REGISTER } from '../graphql/mutations';

const Login: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const [isLogin, setIsLogin] = useState(true);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [register] = useMutation(REGISTER, {
    variables: {
      name: nameInputRef.current?.value ?? '',
      email: emailInputRef.current?.value ?? '',
      password: passwordInputRef.current?.value ?? '',
    },
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.register.accessToken);
      localStorage.setItem('refreshToken', data.register.refreshToken);
      setIsAuthenticated!(true);
    },
    onError: (error) => {
      localStorage.setItem('accessToken', '');
      console.log('error login');
    },
  });

  const [login] = useMutation(LOGIN, {
    variables: {
      email: emailInputRef.current?.value ?? '',
      password: passwordInputRef.current?.value ?? '',
    },
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.login.accessToken);
      localStorage.setItem('refreshToken', data.login.refreshToken);
      setIsAuthenticated!(true);
    },
    onError: (error) => {
      localStorage.setItem('accessToken', '');
      console.log('error login');
    },
  });

  const submitHandler: FormEventHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      login({
        variables: {
          email: emailInputRef.current?.value ?? '',
          password: passwordInputRef.current?.value ?? '',
        },
      });
    } else {
      register({
        variables: {
          name: nameInputRef.current?.value ?? '',
          email: emailInputRef.current?.value ?? '',
          password: passwordInputRef.current?.value ?? '',
        },
      });
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

import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { authLogin, authLogout } from '../actions/auth-action';
import { REGISTER } from '../graphql/mutations';
import store from '../store';

const useRegister = () => {
  const [registerMutation, { data, loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      const { accessToken, refreshToken, currentUser } = data.register;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      store.dispatch(authLogin(currentUser));
    },
    onError: (error) => {
      store.dispatch(authLogout());
    },
  });

  const register = (name: string, email: string, password: string) =>
    registerMutation({
      variables: {
        name,
        email,
        password,
      },
    });

  return {
    register,
    data,
    loading,
  };
};

export default useRegister;

import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { authLogin, authLogout } from '../actions/auth-action';
import { LOGIN } from '../graphql/mutations';
import store from '../store';

const useLogin = () => {
  const [loginMutation, { data, loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const { accessToken, refreshToken, currentUser } = data.login;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      store.dispatch(authLogin(currentUser));
    },
    onError: (error) => {
      store.dispatch(authLogout());
    },
  });

  const login = (email: string, password: string) =>
    loginMutation({
      variables: {
        email,
        password,
      },
    });

  return {
    login,
    data,
    loading,
  };
};

export default useLogin;

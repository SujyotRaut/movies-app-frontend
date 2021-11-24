import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { authLogin, authLogout } from '../actions/auth-action';
import { LOGIN } from '../graphql/mutations';
import store from '../store';

const useLogin = () => {
  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const { accessToken, refreshToken, currentUser } = data.login;
      store.dispatch(authLogin(accessToken, refreshToken, currentUser));
    },
    onError: () => {
      store.dispatch(authLogout());
    },
  });

  const login = (email: string, password: string) => {
    return loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return {
    login,
    loading,
  };
};

export default useLogin;

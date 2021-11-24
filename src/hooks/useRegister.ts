import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { authLogin, authLogout } from '../actions/auth-action';
import { REGISTER } from '../graphql/mutations';
import store from '../store';

const useRegister = () => {
  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      const { accessToken, refreshToken, currentUser } = data.register;
      store.dispatch(authLogin(accessToken, refreshToken, currentUser));
    },
    onError: (error) => {
      store.dispatch(authLogout());
    },
  });

  const register = (name: string, email: string, password: string) => {
    return registerMutation({
      variables: {
        name,
        email,
        password,
      },
    });
  };

  return {
    register,
    loading,
  };
};

export default useRegister;

import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { authLogout } from '../actions/auth-action';
import { LOGOUT } from '../graphql/mutations';
import store from '../store';

const useLogout = () => {
  const [logoutMutation, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      store.dispatch(authLogout());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logout = () => logoutMutation();

  return {
    logout,
    loading,
  };
};

export default useLogout;

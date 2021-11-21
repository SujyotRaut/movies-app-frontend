import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { authLogout } from '../actions/auth-action';
import { LOGOUT } from '../graphql/mutations';
import store from '../store';

const useLogout = () => {
  const [logout, { data, loading }] = useMutation(LOGOUT, {
    variables: { refreshToken: '' },
    onCompleted: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      store.dispatch(authLogout());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    logout,
    data,
    loading,
  };
};

export default useLogout;

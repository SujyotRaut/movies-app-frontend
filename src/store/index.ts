import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  // Adding thunk as ThunkMiddleware adds ThunkDispatch
  // to Base Dispatch to add support for ThunkAction
  applyMiddleware(thunk as ThunkMiddleware)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

import {AuthContext, AuthContextType} from '../context/AuthContext';
import {useContext} from 'react';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }

  return context;
}

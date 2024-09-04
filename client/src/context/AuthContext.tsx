import { createContext, useReducer, useEffect, Dispatch } from 'react';

// User interface
interface User {
  username: string;
  email: string;
  token: string;
}

// interface for the auth state
interface AuthState {
  user: User | null;
}

// interface for the dispatch function
interface Action {
  type: "LOGIN" | "LOGOUT";
  payload?: any;
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<Action>;
}

type ChildrenProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// reducer function to set the user state based on the action type
export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// AuthContextProvider component to provide the user state to the app
export const AuthContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN', payload: user });
      } catch (error) {
        console.log("Error parsing user data from local storage: ", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
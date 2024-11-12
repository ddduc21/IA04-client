import { createContext } from 'react';
import { AuthData } from './Type';

export const AuthContext = createContext<{
	currentUser: AuthData | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<AuthData | null>>;
} | null>(null);
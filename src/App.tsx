import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useState } from 'react';
import { AuthContext } from './Context';
import { AuthData } from './Type';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const authToken = localStorage.getItem("Authorization");
	const [currentUser, setCurrentUser] = useState<null | AuthData>(authToken ? JSON.parse(authToken) : null);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/register"
							element={<RegisterPage />}
						/>
            <Route
							path="/profile"
							element={<ProfilePage />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

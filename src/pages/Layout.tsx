import axios from 'axios';
import { AuthContext } from '../Context';
import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
	const context = useContext(AuthContext);

	const onLogout = () => {
		if (context) {
			delete axios.defaults.headers.common['Authorization'];
			localStorage.removeItem('Authorization');
			context.setCurrentUser(null);
		}
	};

	return (
		<>
			<nav className="fixed top-0 left-0 flex flex-row justify-between w-screen bg-primary">
				<Link
					to="/"
					className="px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary/20 border-l border-secondary/20"
				>
					Home
				</Link>
				{context && context.currentUser ? (
					<div className="flex flex-row justify-end">
						<Link
							to="/profile"
							className="px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary/20 border-l border-secondary/20"
						>
							Profile
						</Link>
						<button
							onClick={onLogout}
							className="px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary/20 border-l border-secondary/20"
						>
							Log out
						</button>
					</div>
				) : (
					<div className="flex flex-row justify-end">
						<Link
							to="/login"
							className="px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary/20 border-l border-secondary/20"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="px-3 py-2 bg-primary text-primary-foreground hover:bg-secondary/20 border-l border-secondary/20"
						>
							Register
						</Link>
					</div>
				)}
			</nav>
			<div className='mt-10'>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;

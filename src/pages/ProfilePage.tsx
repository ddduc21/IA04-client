import axios from 'axios';
import { apiHost } from '../config';
import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Context';

export default function ProfilePage() {
	const context = useContext(AuthContext);

	const { isPending, error, data } = useQuery({
		queryKey: [context?.currentUser],
		queryFn: () => {
			return axios.get(apiHost + '/profile', {
				headers: { Authorization: "Bearer " + context?.currentUser?.access_token },
			});
		},
		staleTime: 10 * 60 * 1000,
	});

    if (!context || !context.currentUser || error) {
		return (
			<Navigate to={'/login'} />
		);
	}

	return (
		<div className="flex flex-col sm:px-8 md:px-28 mt-24">
			<h1 className="text-3xl font-sans font-bold mb-8">Profile</h1>
			{isPending && <h1>Loading...</h1>}
			{data?.data && (
				<div>
					<p className='text-lg'>Username: {data.data.username}</p>
					<p className='text-lg'>Email: {data.data.email}</p>
				</div>
			)}
		</div>
	);
}

import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiHost } from '../config';

type Inputs = {
	username: string;
	email: string;
	password: string;
	confirm: string;
};

export default function RegisterPage() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		reValidateMode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirm: '',
		},
	});
	const mutation = useMutation({
		mutationFn: (data: Inputs) => {
            return axios.post(apiHost + '/register', data);
		},
		onError: (
			error: AxiosError<{ statusCode: number; message: string }>
		) => {
			console.log(JSON.stringify(error, null, '\t'));
		},
	});
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		mutation.mutate(data);
	};

	const password = watch('password');

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */

		<div className="flex flex-col justify-center items-center mt-24">
			<form
				className="flex flex-col md:w-80 mb-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-3xl font-sans font-bold mb-8">Register</h1>
				<div className="flex flex-col gap-2 mb-4">
					<p>Email</p>
					<input
						type="text"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						{...register('email', {
							required: true,
							pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/,
						})}
					/>
					{errors.email?.type == 'required' && (
						<span className="text-red-600">
							This field is required
						</span>
					)}
					{errors.email?.type == 'pattern' && (
						<span className="text-red-600">
							Need valid email address
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2 mb-4">
					<p>Username</p>
					<input
						type="text"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						{...register('username', {
							required: true,
							minLength: 4,
							maxLength: 20,
						})}
					/>
					{errors.username?.type == 'required' && (
						<span className="text-red-600">
							This field is required
						</span>
					)}
					{errors.username?.type == 'minLength' && (
						<span className="text-red-600">
							Need atleast 4 characters
						</span>
					)}
					{errors.username?.type == 'maxLength' && (
						<span className="text-red-600">
							Username atmost 20 characters
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2 mb-4">
					<p>Password</p>
					<input
						type="password"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						{...register('password', {
							required: true,
							minLength: 8,
							maxLength: 32,
						})}
					/>
					{errors.password?.type == 'required' && (
						<span className="text-red-600">
							This field is required
						</span>
					)}
					{errors.password?.type == 'minLength' && (
						<span className="text-red-600">
							Need atleast 8 characters
						</span>
					)}
					{errors.password?.type == 'maxLength' && (
						<span className="text-red-600">
							Password atmost 32 characters
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2 mb-10">
					<p>Confirm password</p>
					<input
						type="password"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						{...register('confirm', {
							required: true,
							validate: (value) =>
								value === password ||
								'Confirm password is not the same as password',
						})}
					/>
					{errors.confirm?.type === 'validate' && (
						<span className="text-red-600">
							Confirm password is not the same as password
						</span>
					)}
				</div>
				<input
					className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
					disabled={mutation.isPending}
					type="submit"
				/>
			</form>
			{mutation.isPending && <p>Sending...</p>}
			{mutation.isSuccess && <p>Registered successfully</p>}
			{mutation.isError && (
				<p>Register fail: {mutation.error.response?.data.message}</p>
			)}
		</div>
	);
}

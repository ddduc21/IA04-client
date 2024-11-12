export interface User {
	id: string;
	username: string;
	email: string;
};

export interface AuthData {
    user: User,
    access_token: string,
}
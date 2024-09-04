export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
}
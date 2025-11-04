import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
}

export interface ReqUser {
    id: string
}

export interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

export interface LoginUser {
    email: string;
    password: string;
}
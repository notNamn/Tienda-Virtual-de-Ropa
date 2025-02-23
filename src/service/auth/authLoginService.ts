'use server';

import { AuthError } from 'next-auth';
import {signIn} from "@/config/authConfig";


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        //console.log(Object.fromEntries(formData))
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });
        return 'success';
    } catch (error) {
        if (error instanceof AuthError) {
            // evaluando errores ya sea de credenciales o otros
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
import type { User } from "../features/users/types";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('/users.json');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
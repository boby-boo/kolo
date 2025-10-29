import React, { createContext, useContext, useMemo, useState } from 'react';
import type { User } from '../types';

type UsersContextValue = {
    users: User[];
    filteredUsers: User[];
    isLoading: boolean;
    error: string | null;
    filterTerm: string;
    handleUsers: (data: User[]) => void;
    setFilterTerm: (term: string) => void;
    filterByInterest: (interest: string) => void;
    handleLoading: (loading: boolean) => void;
    handleError: (err: string | null) => void;
    resetFilter: () => void;
};

const UsersContext = createContext<UsersContextValue | null>(null);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filterTerm, setFilterTerm] = useState('');

    const filteredUsers = useMemo(() => {
        const term = filterTerm.toLowerCase().trim();
        if (!term) return users;

        const result: User[] = [];
        for (const u of users) {
            if (u.interests.some(i => i.toLowerCase().includes(term))) {
                result.push(u);
            }
        }
        return result;
    }, [filterTerm, users]);

    const handleUsers = (data: User[]) => setUsers(data);
    const handleLoading = (loading: boolean) => setIsLoading(loading);
    const handleError = (err: string | null) => setError(err);
    const filterByInterest = (interest: string) => {
        setFilterTerm(interest);
    };
    const resetFilter = () => setFilterTerm('');

    return (
        <UsersContext.Provider
            value={{
                users,
                filteredUsers,
                isLoading,
                error,
                filterTerm,
                handleUsers,
                handleLoading,
                handleError,
                setFilterTerm,
                filterByInterest,
                resetFilter,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersContext = () => {
    const ctx = useContext(UsersContext);
    if (!ctx)
        throw new Error('useUsersContext must be used inside <UsersProvider>');
    return ctx;
};

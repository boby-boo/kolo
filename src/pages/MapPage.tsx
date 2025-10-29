import { useEffect } from 'react';
import { FilterInput, Loader } from '../components';
import { UserMap } from '../features/map/components';
import { LOADING_MESSAGES } from '../features/constants';
import { useUsersContext } from '../features/users/context/UsersContext';
import { useUsers } from '../features/users/hooks/useUsers';

const MapPage = () => {
    const { fetchUsers } = useUsers();
    const { isLoading, error, filteredUsers } = useUsersContext();

    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Loader message={error} />;
    }

    return (
        <div className="app">
            <FilterInput />
            {filteredUsers.length === 0 && (
                <Loader message={LOADING_MESSAGES.NO_USERS_FOUND} />
            )}
            <UserMap users={filteredUsers} />
        </div>
    );
};

export default MapPage;

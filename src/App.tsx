import { UsersProvider } from './features/users/context/UsersContext';
import MapPage from './pages/MapPage';

const App = () => {
    return (
        <UsersProvider>
            <MapPage />
        </UsersProvider>
    );
};

export default App;

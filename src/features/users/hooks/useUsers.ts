import { getUsers } from "../../../api/users";
import { useUsersContext } from "../context/UsersContext";

export const useUsers = () => {
  const { handleUsers, handleLoading, handleError } = useUsersContext();

  const fetchUsers = async () => {
    handleLoading(true);
    try {
      const data = await getUsers();
      handleUsers(data);
    } catch {
      handleError("Failed to load users");
    } finally {
      handleLoading(false);
    }
  };

  return { fetchUsers };
};

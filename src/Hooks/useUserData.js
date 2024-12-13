import { useEffect, useState } from "react";

const useUserData = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const response = await data.json();
    setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users };
};

export { useUserData };

import React, { useState, useEffect } from "react";
import styles from "./UserList.module.css";

import { User as UserType } from "../../types/user";
import Spinner from "../Spinner";
import User from "../User/index";
import useGetUsers from "../../hooks/useGetUsers";
import useSearchUsers from "../../hooks/useSearchUser";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);

  const { loadMoreUsers } = useGetUsers(
    setUsers,
    setLoading,
    users,
    searchQuery
  );

  const { searchMoreUsers, cancelRequest } = useSearchUsers(
    setUsers,
    setLoading,
    users,
    searchQuery
  );

  useEffect(() => {
    setUsers([]);
  }, [searchQuery]);

  const handleSearchChange = (e: { target: { value: string } }) => {
    cancelRequest.current && cancelRequest.current();
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <input
        className={styles.input}
        onChange={handleSearchChange}
        placeholder="Search by user name"
      />
      <div className={styles.usersContainer}>
        {users.map(user => (
          <User key={user.id} {...user} />
        ))}
      </div>
      {loading && <Spinner />}
      <button onClick={searchMoreUsers}>Load more</button>
    </div>
  );
};

export default UserList;

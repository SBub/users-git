import { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";

import { User, SetUsersType } from "../types/user";
import { useErrorDispatch, SET_ERROR } from "../context/ErrorProvider";

const USERS_PER_PAGE = 20;
const CancelToken = axios.CancelToken;

const useGetUsers = (
  setUsers: SetUsersType,
  setLoading: (loading: boolean) => void,
  users: User[],
  searchQuery: string
) => {
  // this value will decide from what user id users will be fetched
  const [nextFirstId, setNextFirstId] = useState(0);

  const dispatch = useErrorDispatch();

  const cancelRequest = useRef(() => {});

  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.github.com/users",
        params: {
          since: nextFirstId,
          page: 1, // page is a contstant here; since will decide what next batch of users will be returned;
          USERS_PER_PAGE
        },
        cancelToken: new CancelToken(c => (cancelRequest.current = c))
      });

      const users = response.data;

      setUsers((prevUsers: User[]) => {
        return [...prevUsers, ...users];
      });
    } catch (err) {
      console.log({ err });
      dispatch({ type: SET_ERROR, payload: err });
    } finally {
      setLoading(false);
    }
  }, [nextFirstId, setLoading, setUsers, dispatch]);

  useEffect(() => {
    if (!searchQuery.length) {
      getAllUsers();
    }

    return () => {
      cancelRequest.current && cancelRequest.current();
    };
  }, [getAllUsers, searchQuery.length]);

  // reset since propery in params object of axios
  useEffect(() => {
    setNextFirstId(0);
  }, [searchQuery]);

  const loadMoreUsers = useCallback(() => {
    setNextFirstId(() => {
      // if there are users get an id of the last one
      if (users.length) {
        return users[users.length - 1].id;
      }
      return 0;
    });
  }, [users]);

  return { loadMoreUsers };
};

export default useGetUsers;

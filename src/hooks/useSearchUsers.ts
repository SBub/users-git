import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

import { User, SetUsersType } from "../types/user";
import { useErrorDispatch, SET_ERROR } from "../context/ErrorProvider";

const USERS_PER_PAGE = 20;
const CancelToken = axios.CancelToken;

const useSearchUsers = (
  setUsers: SetUsersType,
  setLoading: (loading: boolean) => void,
  users: User[],
  searchQuery: string
) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useErrorDispatch();

  const cancelRequest = useRef(() => {});

  useEffect(() => {
    const searchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: "GET",
          url: "https://api.github.com/search/users",
          params: {
            q: searchQuery,
            since: 0,
            page,
            per_page: USERS_PER_PAGE
          },
          cancelToken: new CancelToken(c => (cancelRequest.current = c))
        });

        const users = response.data.items;

        if (!users.length) {
          setHasMore(false);
        } else {
          setUsers((prevUsers: User[]) => {
            return [...prevUsers, ...users];
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        dispatch({ type: SET_ERROR, payload: err });
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery.length && hasMore) {
      searchUsers();
    }
    return () => {
      cancelRequest.current && cancelRequest.current();
    };
  }, [searchQuery, page, hasMore, setLoading, setUsers, dispatch]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  const searchMoreUsers = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return { searchMoreUsers, cancelRequest };
};

export default useSearchUsers;

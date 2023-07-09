import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_ROLE_Q } from "../lib";

const useGetUserRole = () => {
  const [role, setRole] = useState("");
  const {
    error: getUserError,
    loading: getUserLoading,
    data: getUserData,
  } = useQuery(GET_USER_ROLE_Q);

  useEffect(() => {
    if (getUserLoading) {
    }
    if (getUserData) {
      setRole(getUserData.getUserRole);
    }
    if (getUserError) {
    }
  }, [getUserData]);

  return role;
};

export default useGetUserRole;

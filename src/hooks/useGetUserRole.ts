import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_ROLE_Q } from "../lib";

const useGetUserRole = () => {
  const [role, setRole] = useState("");
  const { data: getUserData } = useQuery(GET_USER_ROLE_Q);

  useEffect(() => {
    if (getUserData) {
      setRole(getUserData.getUserRole);
    }
  }, [getUserData]);

  return role;
};

export default useGetUserRole;

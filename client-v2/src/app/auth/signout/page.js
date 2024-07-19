'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '../../hooks/use-request';
import { useUser } from "../../context/userContext";

export default () => {
  const Router= useRouter();
  const { fetchCurrentUser } = useUser(); // Access the fetch function
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: async () => {
      await fetchCurrentUser(); // Re-fetch the current user
      Router.push("/");
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

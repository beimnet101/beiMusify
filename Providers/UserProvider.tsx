"use client"
import { MyuserContextProvider } from "@/hooks/useUser";
import { ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyuserContextProvider>{children}</MyuserContextProvider>;
};

export default UserProvider;

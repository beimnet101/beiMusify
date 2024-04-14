"use client"
import { createContext, useState, useEffect } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types";
import { useContext } from "react";
export interface Props {
    [propName: string]: any;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const MyuserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setisLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetail = () => supabase.from('users').select('*').single();
    const getSubscription = () => supabase.from('subscriptions').select('*,prices(*,products(*))').in('status', ['trialing', 'active']).single();

    useEffect(() => {
        const fetchData = async () => {
            if (user && !isLoadingData && !userDetails && !subscription) {
                setisLoadingData(true);
                try {
                    const [userDetailResult, subscriptionResult] = await Promise.allSettled([getUserDetail(), getSubscription()]);
                    if (userDetailResult.status === "fulfilled") {
                        setUserDetails(userDetailResult.value.data as UserDetails);
                    }
                    if (subscriptionResult.status === "fulfilled") {
                        setSubscription(subscriptionResult.value.data as Subscription);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    // Handle error if needed
                } finally {
                    setisLoadingData(false);
                }
            } else if (!user && !isLoadingUser && !isLoadingData) {
                setUserDetails(null);
                setSubscription(null);
            }
        };

        fetchData();
    }, [user, isLoadingUser]);

    // Define the value object inside the component body
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return (
        <UserContext.Provider value={value} {...props} />
    );
}

export const useUser = () => {

    const context = useContext(UserContext);
    if (context == undefined) {
        throw new Error("userUser must be used withib a myUserContextprovider ");



    }
    return context;

}
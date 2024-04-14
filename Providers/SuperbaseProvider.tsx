"use client"
import { Database } from "@/types_db";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
interface SuperbaseProviderProps {

    children: React.ReactNode;


};
const SuperbaseProvider: React.FC<SuperbaseProviderProps> = ({

    children,
}) => {
    const [superbaseClient] = useState(() => createClientComponentClient<Database>())
    return (
        <SessionContextProvider supabaseClient={superbaseClient}>
            {children}
        </SessionContextProvider>
    )


}

export default SuperbaseProvider;
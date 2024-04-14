import { Auth } from "@supabase/auth-ui-react";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import useAuthModal from "@/hooks/useAuthModel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 



const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router=useRouter();
    const {session}=useSessionContext();
    const {onClose,isOpen}=useAuthModal();
 useEffect(()=>{
   
if(session){

    router.refresh();
    onClose()
}


 },[session,router,onClose]);
  const onChange=()=>{
               if(!isOpen){
                onClose();

}


  }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen} // isOpen should be true to ensure the modal is open
            onChange={onChange}
        >
            <Auth
                theme="dark"
                magicLink
                providers={["github"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,

                }}
            />
        </Modal>
    );
}

export default AuthModal;


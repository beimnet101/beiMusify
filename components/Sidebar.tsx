
"use client";
import Sidebaritem from "./Sidebaritem";
import Box from "./Box";
import Library from "./Library";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
interface sidebarProps {
    children: React.ReactNode;

}


const Sidebar: React.FC<sidebarProps> = ({ children }) => {
    const pathname = usePathname();
    const routes = useMemo(() => [

        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',

        }
    ], [pathname]);
    return (
        <div className="flex h-full " >
            <div className="
               hidden
               md:flex 
               flex-col
               mr-2
               mt-2
               gap-y-2
               bg-black
            h-full
             w-[300px]

           p2
   ">
                <Box className="">
                    <div
                        className="
                        flex
                        flex-col
                        gap-y-5
                          
                        px-5
                        py-4

                        "

                    >
                        {routes.map((item) => (
                            <Sidebaritem
                                key={item.label}
                                {...item}
                            />
                        ))}

                    </div>

                </Box>

                <Box className="overflow-y-auto h-full ">
                    <Library />

                </Box>

            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </div>

    )


}
export default Sidebar;
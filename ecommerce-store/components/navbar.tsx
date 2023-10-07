

import Link from "next/link";


import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getcategories from "@/actions/get-categories";
import NavbarActions from "./navebar-actions";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getcategories();
    return ( 
        <div className='border-b'>
            <Container>

                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">

                    <Link href='/' className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">STORE</p>
                    </Link>

                    <MainNav data={categories}/>
                    <NavbarActions />
                </div>

            </Container>
        </div>
     );
}
 
export default Navbar;
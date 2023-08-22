'use client';

import { useEffect, useState } from "react";

interface ClientOnlyprops {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyprops> = ({
    children
}) => {
    const [hasMounted, sethasMounted] = useState(false);

    useEffect(() => {
        sethasMounted(true)
    }, [])

    if(!hasMounted){
        return null
    }

    return ( 
        <>

        {children}

        </>
     );
}
 
export default ClientOnly;
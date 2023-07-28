import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';


const Logout = () => {

    const router = useRouter();
    

    useEffect(() => {

      sessionStorage.clear();

      if(sessionStorage.length === 0){
        router.push("/login");
      }
    
    }, []);

    return (
        <>Logging out..</>
    )



}

export default Logout
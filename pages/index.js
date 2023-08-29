import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {

  const router = useRouter();
  
  useEffect(() => {

    if(localStorage.length > 0){
        router.push("/dashboard");
    }

    router.push("/login");
  
  }, [router]);
}

import React, { useEffect } from 'react'
import '../styles/globals.css'
import '../assets/plugins/bootstrap/css/bootstrap.min.css'
// import '../assets/bundles/lib.vendor.bundle.js'
// import '../assets/js/core.js'
import '../assets/css/main.css'
import '../assets/css/default.css'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
      document.body.className = 'font-opensans offcanvas-active';
  });

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
    
  )
}

export default MyApp

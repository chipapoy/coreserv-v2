import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";

const Sidemenu = () => {

  // const router = useRouter();

  // useEffect(() => {

  //     if(localStorage.length === 0){
  //         router.push("/login");
  //     }
  
  // }, []);


  return (
    <>
      <div id="header_top" className="header_top">
        <div className="container">
          <div className="hleft">
            <Link className="header-brand" href="/dashboard">
                <img className="avatar" src={`/coreserv_logo.jpg`} alt=""/>
            </Link>
            <div className="dropdown">
              <Link href="/dashboard" className="nav-link icon create_page xs-hide">
                <i className="fe fe-pie-chart" data-toggle="tooltip" data-placement="right" title="Dashboard"></i>
              </Link>
              <Link href="/dispatch" className="nav-link icon create_page xs-hide">
                <i className="fa fa-truck" data-toggle="tooltip" data-placement="right" title="Dispatch"></i>
              </Link>
              <Link href="/rfp" className="nav-link icon create_page xs-hide">
                <i className="fa fa-credit-card" data-toggle="tooltip" data-placement="right" title="RFP"></i>
              </Link>
              <Link href="/vendors" className="nav-link icon create_page xs-hide">
                <i className="fa fa-building" data-toggle="tooltip" data-placement="right" title="Vendor"></i>
              </Link>
              <Link href="/callback" className="nav-link icon create_page xs-hide">
                <i className="fa fa-phone" data-toggle="tooltip" data-placement="right" title="Callback"></i>
              </Link>
              <Link href="/otd" className="nav-link icon create_page xs-hide">
                <i className="fa fa-phone-square" data-toggle="tooltip" data-placement="right" title="OTD"></i>
              </Link>
            </div>
          </div>
          <div className="hright">
            <div className="dropdown"></div>            
          </div>
        </div>
      </div>
    </>
  )

}

export default Sidemenu
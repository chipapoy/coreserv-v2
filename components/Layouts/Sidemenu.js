import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PaymentsIcon from '@mui/icons-material/Payments';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

const Sidemenu = () => {

  return (
    <>
      <div id="header_top" className="header_top">
        <div className="container">
          <div className="hleft">
            <Link className="header-brand" href="/dashboard">
                <Image
                  width={50}
                  height={50} 
                  src={`/coreserv_logo.jpg`}
                />
            </Link>
            <div className="dropdown">
              <Link href="/dashboard" className="nav-link icon create_page xs-hide">
                <Tooltip title="Dashboard">
                  <IconButton>
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link href="/disp" className="nav-link icon create_page xs-hide">
                <Tooltip title="Dispatch">
                  <IconButton>
                    <TwoWheelerIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link href="/rfp" className="nav-link icon create_page xs-hide">
                <Tooltip title="RFP">
                  <IconButton>
                    <PaymentsIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link href="/vendors" className="nav-link icon create_page xs-hide">
                <Tooltip title="Vendor">
                  <IconButton>
                    <ApartmentIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link href="/callback" className="nav-link icon create_page xs-hide">
                <Tooltip title="Callback">
                  <IconButton>
                    <PhoneCallbackIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link href="/otd" className="nav-link icon create_page xs-hide">
                <Tooltip title="OTD">
                  <IconButton>
                    <PermPhoneMsgIcon />
                  </IconButton>
                </Tooltip>
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
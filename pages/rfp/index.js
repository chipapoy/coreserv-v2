import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Topmenu from "../../components/Layouts/Topmenu";
import Sidemenu from "../../components/Layouts/Sidemenu";

const Index = () => {


    return (
        <>
            <div id="main_content">

                <Sidemenu></Sidemenu>

                <div className="page">
                    <div id="page_top" className="section-body">
                        <div className="container-fluid">
                            <div className="page-header">
                                <Topmenu></Topmenu>
                            </div>
                        </div>
                    </div>
                    <div className="section-body">
                        <div className="container-fluid">
                            <h4>RFP</h4>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )



}


export default Index
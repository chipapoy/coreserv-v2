import { useState,useEffect } from 'react';
import Link from "next/link";
import Script from 'next/script';

const Topmenu = () => {

    return (
        <>
          <div id="page_top" className="section-body sticky-top">
            <div className="container-fluid">
              <div className="page-header">
                <div className="left">
                    <h1 className="page-title">CORESERV - MDU DATABASE</h1>
                </div>
                <div className="right">
                    <ul className="nav nav-pills">
                        <li className="nav-item dropdown">
                            {/* <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Reports</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#"><i className="dropdown-icon fa fa-file-excel-o"></i> MS Excel</a>
                                
                            </div> */}

                            <Link href="/reports" className="nav-link icon create_page xs-hide">
                                Reports <i className="fa fa-line-chart" data-toggle="tooltip" data-placement="right" title="Reports"></i>
                            </Link>
                        </li>
                    </ul>
                    <div className="notification d-flex">
                        <div className="dropdown d-flex">
                            <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-bell"></i><span className="badge badge-primary nav-unread"></span></a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <ul className="list-unstyled feeds_widget">
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-thumbs-o-up"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">7 New Feedback <small className="float-right text-muted">Today</small></h4>
                                            <small>It will give a smart finishing to your site</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-user"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">New User <small className="float-right text-muted">10:45</small></h4>
                                            <small>I feel great! Thanks team</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-question-circle"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title text-warning">Server Warning <small className="float-right text-muted">10:50</small></h4>
                                            <small>Your connection is not private</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-check"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title text-danger">Issue Fixed <small className="float-right text-muted">11:05</small></h4>
                                            <small>WE have fix all Design bug with Responsive</small>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="feeds-left"><i className="fa fa-shopping-cart"></i></div>
                                        <div className="feeds-body">
                                            <h4 className="title">7 New Orders <small className="float-right text-muted">11:35</small></h4>
                                            <small>You received a new oder from Tina.</small>
                                        </div>
                                    </li>                                   
                                </ul>
                                <div className="dropdown-divider"></div>
                                <a href="" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                            </div>
                        </div>
                        <div className="dropdown d-flex">
                            <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-user"></i></a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <Link href="#" className="dropdown-item"><i className="dropdown-icon fe fe-user"></i> Profile</Link>
                                <Link href="#" className="dropdown-item"><i className="dropdown-icon fe fe-settings"></i> Settings</Link>
                                <div className="dropdown-divider"></div>
                                <Link href="#" className="dropdown-item"><i className="dropdown-icon fe fe-log-out"></i> Sign out</Link>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
            <Script src="/static/bundles/lib.vendor.bundle.js" />
        </>
    )

}

export default Topmenu
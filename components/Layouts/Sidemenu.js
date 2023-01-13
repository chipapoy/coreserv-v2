import Link from "next/link";
import Image from "next/image";

const Sidemenu = () => {


    return (
        <>
            <div id="header_top" className="header_top">
                <div className="container">
                    <div className="hleft">
                        <Link className="header-brand" href="/dashboard">
                            <img className="avatar" src={`/coreserv_logo.jpg`} alt=""/>
                        </Link>
                        <div className="dropdown">
                            <Link href="/dashboard" className="nav-link icon create_page xs-hide"><i className="fe fe-pie-chart" data-toggle="tooltip" data-placement="right" title="Dashboard"></i></Link>
                            <Link href="/rfp" className="nav-link icon create_page xs-hide"><i className="fe fe-file" data-toggle="tooltip" data-placement="right" title="RFP"></i></Link>
                            <Link href="/vendors" className="nav-link icon create_page xs-hide"><i className="fa fa-building" data-toggle="tooltip" data-placement="right" title="Vendor"></i></Link>
                        </div>
                    </div>
                    <div className="hright">
                        <div className="dropdown">
                        </div>            
                    </div>
                </div>
            </div>
        </>
    )

}

export default Sidemenu
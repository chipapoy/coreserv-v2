import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async event => {

        event.preventDefault();

        axios.post('/api/checkLogin', {
            email: email,
            password: md5(password)
        })
        .then(function (res) {
            // console.log(response);
            // console.log(res.data.result.email)
            sessionStorage.id = res.data.result.id;
            sessionStorage.name = res.data.result.name;
            sessionStorage.token = res.data.result.remember_token;

            

        })
        .catch(function (error) {
            console.log(error.response);
            sessionStorage.clear();
        });

    }

    return (
        <div className="auth col-md-3 mx-auto ">
                <div className="card">
                    <div className="text-center mb-5">
                        <Link href="/login">
                                <Image 
                                    src={`/coreserv_logo.jpg`}
                                    alt="Picture of the author"
                                    width={100}
                                    height={100}
                                />
                        </Link>
                    </div>
                    <form onSubmit={submitLogin}>
                        <div className="card-body">
                            <div className="card-title">Login to your account</div>
                            <div className="form-group">
                                <label className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password<a href="forgot-password.html" className="float-right small">I forgot password</a></label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <span className="custom-control-label">Remember me</span>
                                </label>
                            </div> */}
                            <div className="form-footer">
                                <button className="btn btn-primary btn-block" title="">Sign in</button>
                            </div>
                        </div>
                    </form>
                    {/* <div className="text-center text-muted">
                        Don't have account yet? <a href="register.html">Sign up</a>
                    </div> */}
                </div>  
        </div>
    )



}


export default Login
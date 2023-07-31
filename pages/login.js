import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from "next/image";
import { useEffect, useState } from 'react';
import md5 from 'md5';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrect,setIncorrect] = useState(false);
  const [signinBtn,setSigninBtn] = useState('Sign In');
  const [disableBtn,setDisableBtn] = useState(false);

  const submitLogin = async event => {

    event.preventDefault();
    
    setDisableBtn(true);
    setSigninBtn('Signing In...');

    axios.post('/api/access_request/checkLogin', {
        email: email,
        password: md5(password)
    })
    .then(function (res) {
        console.log(res.data.length);
        // console.log(res.data.result.email)
        if(res.data.length > 0){

          setIncorrect(false);

          localStorage.id = res.data[0].id;
          localStorage.name = res.data[0].name;
          localStorage.email = res.data[0].email;
          localStorage.user_type = res.data[0].user_type;
          localStorage.token = res.data[0].remember_token;
          
          router.push("/dashboard");
        }
        else{
          setIncorrect(true);
          setDisableBtn(false);
          setSigninBtn('Sign In');
        }
        

    })
    .catch(function (error) {
        console.log(error);
        localStorage.clear();
    });

  }

  useEffect(() => {

    if(localStorage.length > 0){
        router.push("/dashboard");
    }
  
  }, [router]);

  return (
    <>
      <Head>
        <title>Coreserv</title>
      </Head>
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
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="exampleInputPassword1" 
                  placeholder="Password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <br />
              <Alert severity="error" sx={{display: incorrect ? 'flex' : 'none'}} >Incorrect User/Password. Please try again.</Alert>
              <div className="form-footer">
                <button className="btn btn-primary btn-block" title="" disabled={disableBtn}>
                  {signinBtn}
                </button>
              </div>
            </div>
          </form>
        </div>  
      </div>
    </>
  )



}


export default Login
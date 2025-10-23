import { useContext } from 'react';
import login from '../assets/login.jpg'
import { AuthContext } from './Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router';   
import { auth } from '../../firebase.init';

const Login = () => {

    const { setUser, userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    

   const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const result = await userLogin(email, password);
        const user = result.user;

      
        await user.reload();

        if (!user.emailVerified) {
            toast.error("Please verify your email before logging in.", { position: "top-center" });
            await auth.signOut(); 
            return;
        }

        setUser(user);
        toast.success("Login successful!", { position: "top-center" });
        navigate('/');
    } catch (error) {
        console.error(error.message);
        toast.error("Please Register", { position: "top-center" }); 
    }
};





    return (
        <div>

            <ToastContainer></ToastContainer>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left gap-x-20">

                        {/* <div className="lg:w-1/2 flex justify-center"> */}
                            <img src={login} alt="Register" className="w-full rounded-lg shadow-lg" />
                        {/* </div> */}
                    </div>


                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className='text-3xl text-center text-warning font-bold'>Welcome Back!!!</h1>
                            <form onSubmit={handleLogin}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Email</label>
                                    <input type="email" name='email' className="input" placeholder="Email" required />

                                    <label className="fieldset-label">Password</label>
                                    <input type="password" name='password' className="input" placeholder="Password" required />

                                  
                                    <button className="btn btn-warning mt-4">Login</button>
                                </fieldset>

                            </form>
                            <div className="divider">OR</div>
                          

                            <p className='text-center mt-4'>Don't have any account? <Link to='/register'><button className='btn btn-sm btn-outline btn-warning'>Register</button></Link></p>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;
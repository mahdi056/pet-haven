import { useContext, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from './Provider/AuthProvider';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import register from '../assets/register.jpg';

const Register = () => {

    const {createUser, setUser, updateUserProfile, SignInwithGoogle} = useContext(AuthContext);
    const [passworderror, setPassworderror] = useState("");
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        SignInwithGoogle()
        .then(async (result) => {
            const user = result.user;
            setUser(user);
    
            // Send user info to your backend
            const userInfo = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL    
            };
    
            try {
                const res = await axios.post('https://pet-haven-server-mu.vercel.app/users', userInfo);
                if (res.data.insertedId) {
                    toast.success("Google Sign-Up Successful!", { position: "top-center" });
                    navigate('/');
                } else if (res.data.message === "User already exists") {
                    toast.info("Welcome back!", { position: "top-center" });
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
                toast.error("Google Sign-In failed to save user.", { position: "top-center" });
            }
        })
        .catch((error) => {
            console.error(error);
            toast.error("Google Sign-In failed.", { position: "top-center" });
        });
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const conpassword = e.target.conpassword.value;
    
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
    
        if (!passwordRegex.test(password)) {
            setPassworderror("Password must include at least one uppercase letter, a special character, and be at least 6 characters long.");
            toast.error("Invalid Password Format", { position: 'top-center' });
            return;
        }
    
        if (password !== conpassword) {
            setPassworderror("Password and Confirm Password did not match");
            toast.error("Password and Confirm Password did not match", { position: 'top-center' });
            return;
        }
    
        setPassworderror(""); 
    
        try {
            const result = await createUser(email, password);
            const user = result.user;
            
            await updateUserProfile({
                displayName: name,
            });
            
            setUser({ ...user, displayName: name });
    
            const userInfo = { name, email };
    
            const res = await axios.post('https://pet-haven-server-mu.vercel.app/users', userInfo);
    
            if (res.data.insertedId) {
                toast.success("Registration Successful!", { position: "top-center" });
                e.target.reset();
                navigate("/");
            } 
            else if (res.data.message === "User already exists") {
                toast.error("User already exists. Please Login", { position: "top-center" });
            }
        } 
        catch (error) {
            console.error(error);
            toast.error("Registration failed!", { position: "top-center" });
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <ToastContainer></ToastContainer>
            <div className="gap-x-24 hero-content flex-col lg:flex-row-reverse">
                
                
                <div className="lg:w-1/2 flex justify-center">
                    <img src={register} alt="Register" className="w-full rounded-lg shadow-lg" />
                </div>

                
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold text-warning">Register Now</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" className="input input-bordered w-full" placeholder="Name" required />

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input name="conpassword" type="password" className="input input-bordered w-full" placeholder="Confirm Password" required />

                            <button type="submit" className="btn btn-warning mt-4 w-full">Register</button>


                            <div className='divider'></div>

                            <button onClick={handleGoogleSignIn} className='btn btn-outline btn-warning w-full'>Google Sign In</button>

                            <p className='text-center mt-4'>Already have an account? <Link to='/login'><button className='btn btn-sm'>Login</button></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

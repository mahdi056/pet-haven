import { useContext, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from './Provider/AuthProvider';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import register from '../assets/register.jpg';
import { sendEmailVerification } from 'firebase/auth';

const Register = () => {

    const { createUser, setUser, updateUserProfile, SignInwithGoogle } = useContext(AuthContext);
    const [passworderror, setPassworderror] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [phoneerror, setPhoneerror] = useState("");
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        SignInwithGoogle()
            .then(async (result) => {
                const user = result.user;
                setUser(user);


                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                };

                try {
                    const res = await axios.post('http://localhost:5000/users', userInfo);
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
        const number = e.target.phone.value;
        const city = e.target.city.value;
        const country = e.target.country.value;

        const countryCode = "+880";
        const phone = countryCode + number;








        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
        const emailRegex = /^(?!.*\.\.)(?!.*\.$)(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

        if(phone.length !== 14){
            setPhoneerror("Please Enter a valid Phone Number")
            return;
        }


        if (!passwordRegex.test(password)) {
            setPassworderror("Password must include at least one uppercase letter, a special character, and be at least 6 characters long.");
            toast.error("Invalid Password Format", { position: 'top-center' });
            return;
        }
        if (!emailRegex.test(email)) {
            setEmailerror("Invalid Email Format")
            return;
        }


        if (password !== conpassword) {
            setPassworderror("Password and Confirm Password did not match");
            toast.error("Password and Confirm Password did not match", { position: 'top-center' });
            return;
        }

        setPassworderror("");
        setEmailerror("")

        try {
            const result = await createUser(email, password);
            const user = result.user;

            await sendEmailVerification(user);
            toast.info("Verification email sent! Please check your inbox.", {
                position: "top-center",
                autoClose: 2000,
                onClose: () => navigate("/login")
            });


            await updateUserProfile({
                displayName: name,

            });

            setUser({ ...user, displayName: name });
            


            const userInfo = { name, email, phone, city, country };

            const res = await axios.post('http://localhost:5000/users', userInfo);

            if (res.data.insertedId) {
             
                e.target.reset();
                navigate("/login");
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
                            {emailerror && <p className='text-red-500 text-sm'>{emailerror}</p>}

                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input name="conpassword" type="password" className="input input-bordered w-full" placeholder="Confirm Password" required />

                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <div className="flex">

                                <input
                                    type="text"
                                    value="+880"
                                    readOnly
                                    className="input input-bordered w-20 mr-2 bg-gray-100 cursor-not-allowed"
                                />

                                <input
                                    name="phone"
                                    type="tel"
                                    pattern='[0-9]{10}'
                                    className="input input-bordered flex-1"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            
                             {phoneerror && <p className='text-red-500 text-sm'>{phoneerror}</p>}

                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input name="city" type="text" className="input input-bordered w-full" placeholder="City" required />

                            <label className="label">
                                <span className="label-text">Country</span>
                            </label>
                            <input name="country" type="text" className="input input-bordered w-full" placeholder="Country" required />

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

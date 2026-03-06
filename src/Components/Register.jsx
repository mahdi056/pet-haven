import { useContext, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from './Provider/AuthProvider';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import register from '../assets/register.jpg';
import { sendEmailVerification } from 'firebase/auth';

const Register = () => {

    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [passworderror, setPassworderror] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [phoneerror, setPhoneerror] = useState("");
    const [nameerror, setNameerror] = useState("");
    const navigate = useNavigate();

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const conpassword = e.target.conpassword.value;
        const phone = e.target.phone.value;
        const city = e.target.city.value;
        

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
        const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;
        const nameRegex = /^[A-Za-z ]+$/;

       

        if (phone.length !== 11) {
            setPhoneerror("Please Enter a valid Phone Number")
            return;
        }


        if (!passwordRegex.test(password)) {
            setPassworderror("Password must include at least one uppercase letter(A-Z), a number(0-9), a special character(!@#$%^&*), and be at least 6 characters long.");

            return;
        }

        if (!nameRegex.test(name)) {
            setNameerror("Invalid Name")
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



            const userInfo = { name, email, phone, city };

            const res = await axios.post('http://localhost:5000/users', userInfo);

            if (res.data.insertedId) {

                e.target.reset();
                navigate("/login");
            }


        }
        catch (error) {
            console.error(error);
            toast.error("This Email is Already Taken", { position: "top-center" });
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

                            {nameerror && <p className='text-red-500 text-sm'>{nameerror}</p>}

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

                            {emailerror && <p className='text-red-500 text-sm'>{emailerror}</p>}



                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                pattern='[0-9]{11}'
                                className="input input-bordered flex-1"
                                placeholder="Enter 11 Digit Phone Number"
                                required
                            />


                            {phoneerror && <p className='text-red-500 text-sm'>{phoneerror}</p>}

                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input name="city" type="text" className="input input-bordered w-full" placeholder="City" required />

                          


                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                            {passworderror && <p className='text-red-500 text-sm'>{passworderror}</p>}
                            <p className='text-sm'>Password must include at least one uppercase letter(A-Z), a number(0-9), a special character(!@#$%^&*), and be at least 6 characters long.</p>
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input name="conpassword" type="password" className="input input-bordered w-full" placeholder="Confirm Password" required />

                            <button type="submit" className="btn btn-warning mt-4 w-full">Register</button>


                            <div className='divider'></div>



                            <p className='text-center mt-4'>Already have an account? <Link to='/login'><button className='btn btn-sm btn-outline btn-warning'>Login</button></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

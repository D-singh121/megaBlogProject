import { useState } from "react"
import authService from "../appWrite/authService"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"
import { login } from "../store/authSlice"

const Signup = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();


    const handleSignUp = async (data) => {
        console.log(data)
        setError(""); //*** sabse pahle errors ko empty out kar denge  */
        try {
            //***** ab hume signup matlab ek accout create karna hai uske liye hum authService se createAccount() ,method ko use karenge  */
            const userData = await authService.createAccount(data);
            console.log(userData);
            //****** ab agar data hamre pass aaya hai ya humara userdata ban gya hai to hum currentUser le lenge  */
            if (userData) {
                const userData = await authService.getCurrentUser();
                //**** ab agar hume userdata yaha pe mila hai to fir hume store ko bhi update karna padega uske liye dispatch ki madad se login call kaewa denge  */
                if (userData) dispatch(login(userData));
                navigate("/") //***** login ke baad navigate  */
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo className=" " width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-blue-700">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-gray-950"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='space-y-5'>
                        <Input
                            // autoComplete="current-name"
                            label={<span className=" text-blue-950">Full Name</span>}
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            // autoComplete="current-email"
                            label={<span className=" text-blue-950">Email</span>}
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                //         "Email address must be a valid address",
                                // },
                            })}
                        />
                        <Input
                            label={<span className=" text-blue-950">Password</span>}
                            type="password"
                            // autoComplete="current-password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                                //         "Please Enter a valid Password "
                                // }
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full text-white-500 hover:bg-blue-300 bg-blue-500">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
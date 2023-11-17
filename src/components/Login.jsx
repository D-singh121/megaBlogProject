import Button from "./Button.jsx"
import Input from "./Input.jsx"
import Logo from "./Logo.jsx"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authStoreLogin } from "../store/authSlice.js"
import { useDispatch } from "react-redux"
import authService from "../appWrite/authService.js"
import { useForm } from "react-hook-form"


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(""); //**** for error handling */

    //***** login logic */
    const handleLogin = async (data) => {
        console.log(data);
        //****** login ko submisson karne se pahle error ko emptyout kar denge  */
        setError("");
        //***** ab hum login data ko bhejenge with error handling  */
        try {
            //***** ab login method me hum input data ko bhejenge to ye hume ek session return karega .ab agar session mila hai to user logged in hai .login nahi hai  to error de dega   */
            const session = await authService.login(data)
            if (session) {//***** agar user session login hai to userdata le lenge getCurrentUser() ki madad se   */
                const userData = await authService.getCurrentUser()
                //*** ab agar userdata milgya hai to hum use store me update kar denge dispatch method ki sahayata se . */
                if (userData) (dispatch(authStoreLogin(userData)))
                //*** ab agar user login ho gya to use redirect kardenge home page pe  */
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full' >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-black text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className=" text-blue-600 font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error &&
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                }
                {/* " handleSubmit hume yaha useForm se mil raha hai "  */}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            // label="Email: "
                            label={<span style={{ color: 'black' }}>Email: </span>}
                            placeholder="Enter your email"
                            type="email"
                            //*** yaha register ko hume spread karna hi padega iska syntax yahi hai , agar nahi karenge to kisi aur input me override ho jayega  */
                            {...register("email", {
                                required: true,
                                validate: {//**** ye input me jo bhi email ayega use validate karega ki vo input value email hai  ya nahi. */
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            
                            type="password"
                            // label="Password: " 
                            label={<span style={{ color: 'black' }}>Password: </span>}
                            placeholder="Enter Password"
                            {...register("password", {
                                required: true,

                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full text-black font-bold "
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
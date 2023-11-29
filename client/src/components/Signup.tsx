import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function SignIn() {
    // const router = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    });

    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { username, email, password } = user;
        const isUsernameValid = username.length > 2;
        const isEmailValid = email.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/);
        const isPasswordValid = password.length > 8;

        setButtonDisable(!(isUsernameValid && isEmailValid && isPasswordValid));
    }, [user]);

    const onUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value
        }));
    };

    const handleClickShowPassword = () => {

        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const handleClickConfirmPassword = () => {

        if (showPassword) {
            setConfirmPassword(false)
        } else {
            setConfirmPassword(true)
        }
    }

    const onSignup = async () => {
        if (user.password !== user.confirmPassword) {
            toast.info("Make sure that you reenter password in confirm password box");
            return;
        }
        try {
            setLoading(true);
            setButtonDisable(true);
            const resp = await toast.promise(
                axios.post("/register",
                    { username: user.username, email: user.email, password: user.password },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }),
                {
                    pending: "Creating your Account!",
                    success: "User Account Created Successfully!",
                    error: "unable create account,try again later!"
                });
            if (resp.data.success) {
                toast.success("Check your Email to verify the account!");
            } else {
                toast.error(resp.data.error);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message)
        } finally {
            setLoading(false);
            setButtonDisable(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center max-h-screen py-2">
                <hr />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                    {/* <!--     Login Container --> */}
                    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                        {/* <!--       Form --> */}
                        <div className="md:w-1/1 px-16">
                            <h2 className="font-bold text-2xl text-[#002D74]">{loading ? "Processing" : "SignUp"}</h2>
                            <p className="text-sm mt-4 text-[#002D74]">An account allows users to enjoy all the services without any ads for free!So lets create one</p>
                            <form className="flex flex-col gap-4">
                                <input type="text" name="username" placeholder="@username" className="p-2 mt-8 rounded-xl border-0  w-full"
                                    value={user.username}
                                    onChange={(e) => onUserChange(e)}
                                    autoComplete="on"
                                />
                                <input type="email" name="email" placeholder="Email" className="p-2 rounded-xl border-0  w-full"
                                    value={user.email}
                                    onChange={(e) => onUserChange(e)}
                                    autoComplete="on"
                                />
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="Password" className="p-2 rounded-xl border-0 w-full"
                                        value={user.password}
                                        onChange={(e) => onUserChange(e)}
                                        autoComplete="on"
                                    />
                                    <div
                                        id='password'
                                        className="icon_button absolute right-4 top-14 cursor-pointer"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-1 -translate-y-11" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                viewBox="0 0 640 512"
                                                className="absolute top-1/2 right-1 -translate-y-11">
                                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                            </svg>}
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password" placeholder="Password" className="p-2 rounded-xl border-0 w-full"
                                        value={user.confirmPassword}
                                        onChange={(e) => onUserChange(e)}
                                        autoComplete="on"
                                    />
                                    <div
                                        id='password'
                                        className="icon_button absolute right-4 top-14 cursor-pointer"
                                        onClick={handleClickConfirmPassword}
                                    >
                                        {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-1 -translate-y-11" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                viewBox="0 0 640 512"
                                                className="absolute top-1/2 right-1 -translate-y-11">
                                                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                            </svg>}
                                    </div>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 rounded-xl text-white py-2 hover:scale-105 duration-300 disabled:cursor-not-allowed"
                                    onClick={onSignup} disabled={buttonDisable}>SignUp</button>
                            </form>

                            <button className="bg-white border-0 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
                                <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                Login with google
                            </button>
                            {/* 
                            <div className="text-sm flex items-center mt-3">
                                <p>Forgot your password?
                                    <Link href={"/forgot"} className="mt-5 px-1 text-base py-4 text-blue-600">Reset it!</Link>
                                </p>
                            </div> */}

                            <div className="text-sm flex items-center justify-center mt-3">
                                <p>Already have an Account?</p>
                                <Link
                                    className="text-blue-600 px-1 text-base"
                                    // className="bg-blue border-0 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
                                    to={"/login"}
                                >Login</Link>
                            </div>
                        </div>

                        {/* <!-- Provide ramdom Image every time --> */}
                        <div className="md:block hidden w-1/2 p-5">
                            <img src="https://picsum.photos/600/900" alt="img" width={600} height={900} style={{ borderRadius: "15px" }} />
                        </div>
                    </div>
                    {/* </div> */}
                </section >
                {/* </form> */}
            </div >
        </>
    );
}
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import signInForm_background from '../assets/images/signInForm_background.jpg';
import trizip_logo from '../assets/images/trizip_logo.jpg';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post("https://dummyapi.com/auth/login", userData);
            // console.log("Login Successful:", response.data);
            // alert("Login Successful");
            if (userData.email !== "test@example.com" || userData.password !== "password123") {
                throw new Error("Invalid credentials");
            }
            console.log("Login successful:", userData);
            setMessage("Login successful");
            setTimeout(() => navigate("/logistics_enquiry_form"), 2000);

        } catch (err) {
            setMessage("Invalid credentials. Please try again.");
            setTimeout(() => setMessage(""), 2000);
            console.log(err);            
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Side - Image */}
            <div className="w-1/2 hidden md:flex">
                <img
                    src={signInForm_background}
                    alt="Login page image"
                    className=" object-contain "
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gray-100 ">
                <Card className="w-full max-w-md shadow-lg" sx={{ borderRadius: '10px' }}>
                    <div className="w-full flex justify-center">
                        <img
                            src={trizip_logo}
                            alt="Login"
                            className="w-30 object-cover "
                        />
                    </div>
                    <CardContent className="flex flex-col gap-5">
                        <Typography variant="h5" className="text-center mb-12 font-bold">
                            Login
                        </Typography>
                        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                            <TextField fullWidth label="Email" variant="outlined" name="email"
                                value={userData.email}
                                onChange={handleChange} />
                            <TextField fullWidth label="Password" type="password" variant="outlined" name="password" 
                                value={userData.password} 
                                onChange={handleChange}  />
                            <Button fullWidth variant="contained" color="primary" size="large" type="submit">
                                Login
                            </Button>
                        </form>
                        {message && <Typography color={message.includes("successful") ? "green" : "error"} className="text-center">{message}</Typography>}

                        <Typography variant="body2" className="text-center mt-4 text-gray-600">
                            Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    );
}

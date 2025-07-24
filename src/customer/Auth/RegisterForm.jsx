import { Grid, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { register } from "../../State/Auth/Action";
import { useSelector } from "react-redux";
import { getUser } from "../../State/Auth/Action";

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth}  = useSelector(store=> store);

    useEffect(() => {
        if(jwt){
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password')
        };

        dispatch(register(userData));
        console.log("userData", userData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            fullWidth
                            autoComplete="given-name"
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className="bg-[#9155FD] w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0", bgcolor: "#9155FD", color: "white", ":hover": { bgcolor: "#7a4cd9" } }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className="flex items-center flex-col justify-center">
                <div className="flex items-center justify-center py-3">
                    <p>Already an user?</p>
                    <Button
                        onClick={()=> navigate('/login')}
                        className="bg-[#9155FD]"
                        size="small"
                        variant="outlined"
                        sx={{ ml: 2, color: "#9155FD", borderColor: "#9155FD", ":hover": { bgcolor: "#7a4cd9", color: "white" } }}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log("userData", userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              sx={{
                padding: ".8rem 0",
                bgcolor: "#9155FD",
                color: "white",
                ":hover": { bgcolor: "#7a4cd9" },
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex items-center flex-col justify-center">
        <div className="flex items-center justify-center py-3">
          <p>New user?</p>
          <Button
            onClick={() => navigate("/register")}
            className="bg-[#9155FD]"
            size="small"
            variant="outlined"
            sx={{
              ml: 2,
              color: "#9155FD",
              borderColor: "#9155FD",
              ":hover": { bgcolor: "#7a4cd9", color: "white" },
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

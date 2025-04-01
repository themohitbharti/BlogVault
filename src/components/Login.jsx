import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Button } from "./index";
import { Logo } from "./index";

function Login() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          console.log(userData);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl leading-tight font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} action="" className="mt-8">
          <div className="space-y-5">
            <Input
              label={"email"}
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label={"password"}
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../store/userApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setIsAuth, userAdd } = useActions();
  const [loginUser, { data: userToken, isError }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      setIsAuth(true);
      userAdd(userToken);
      localStorage.setItem("accessToken", userToken.accessToken);
      navigate("/posts");
    }
  }, [navigate, setIsAuth, userAdd, userToken]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex mt-20 flex-col items-center gap-3 rounded-xl"
    >
      <div className="text-2xl">Login</div>
      {isError ? <p>Error try again</p> : <br />}
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(4, "Too Short!")
            .max(10, "Too Long!")
            .required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
        })}
        onSubmit={(values) => {
          loginUser(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-3 items-center justify-center">
            <Field
              className="h-9 p-1  placeholder-black relative outline-none rounded-md shadow-md"
              name="email"
              type="email"
              placeholder="Input email"
            />
            <ErrorMessage name="email" />
            <Field
              className="h-9 p-1 placeholder-black relative outline-none rounded-md shadow-md"
              name="password"
              type="password"
              placeholder="Input password"
            />
            <ErrorMessage name="password" />

            <button
              className="bg-cyan-200 hover:bg-cyan-400 w-[140px] h-10 rounded-md flex items-center justify-center text-2xl shadow-md"
              type="submit"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

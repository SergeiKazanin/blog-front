import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../store/userApi";

export default function Login() {
  const { setIsAuth, userAdd } = useActions();
  const [loginUser, { data: userToken, isError }] = useLoginMutation();

  useEffect(() => {
    if (userToken) {
      setIsAuth(true);
      userAdd(userToken);
      localStorage.setItem("accessToken", userToken.accessToken);
    }
  }, [setIsAuth, userAdd, userToken]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex mt-20 flex-col gap-3 items-center rounded-xl h-[500px] w-[500px]"
    >
      <div className="text-2xl">Login</div>
      {isError ? <p>Error try again</p> : <br></br>}
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
              className="h-9 p-1 w-[350px] placeholder-black relative outline-none rounded-md shadow-md"
              name="email"
              type="email"
              placeholder="Input email"
            />
            <ErrorMessage name="email" />
            <Field
              className="h-9 p-1 w-[350px] placeholder-black relative outline-none rounded-md shadow-md"
              name="password"
              type="password"
              placeholder="Input password"
            />
            <ErrorMessage name="password" />

            <button
              className="rounded-md w-56 bg-cyan-200 hover:bg-cyan-400 p-2 shadow-md"
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

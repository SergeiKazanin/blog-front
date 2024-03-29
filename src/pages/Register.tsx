import { useEffect } from "react";
import { useActions } from "../hooks/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegistrationMutation } from "../store/userApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setIsAuth, userAdd } = useActions();
  const [registerUser, { data: userToken, isError }] =
    useRegistrationMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      setIsAuth(true);
      userAdd(userToken);
      localStorage.setItem("accessToken", userToken.accessToken);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  return (
    <div className="flex mt-20 flex-col gap-3 items-center rounded-xl h-[500px] w-[500px]">
      <div className="text-2xl">Registration</div>
      {isError ? <p>Error try again</p> : <br />}
      <Formik
        initialValues={{
          password: "",
          email: "",
          fullName: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(4, "Too Short!")
            .max(10, "Too Long!")
            .required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
        })}
        onSubmit={(values) => {
          registerUser(values);
        }}
      >
        {() => (
          <Form className="flex flex-col gap-3 items-center justify-center">
            <Field
              className="h-9 p-1 placeholder-black relative outline-none rounded-md shadow-md"
              name="fullName"
              type="text"
              placeholder="Input name"
            />
            <ErrorMessage name="email" />
            <Field
              className="h-9 p-1 placeholder-black relative outline-none rounded-md shadow-md"
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
              className="bg-teal-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
              type="submit"
            >
              Registrate
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

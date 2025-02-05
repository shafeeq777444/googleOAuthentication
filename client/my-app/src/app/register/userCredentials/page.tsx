/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AppDispatch } from "@/redux/app/store";
import { getNewUserData, updateUserData } from "@/redux/features/authSlice";
import { User } from "@/redux/types";
import InputField from "@/components/InputField";
import Image from "next/image";
import { Formik, Form, } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";


export default function UserCredentials() {
  const dispatch = useDispatch<AppDispatch>();

  // Local state to check if the user data has been fetched
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(getNewUserData())
      .then(() => {
        setIsUserLoaded(true); // Set to true once user data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        setIsUserLoaded(true); // Ensure form loads even in case of error
      });
  }, [dispatch]);

  // Get the user state from the Redux store
  const user = useSelector((state: any) => state.auth.user);
  console.log(user, "hello");

  // Show a loading message or spinner while user data is being fetched
  if (!isUserLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className=" flex flex-col justify-center items-center h-full gap-6 pb-14 ">
       <Image src="/logo.png" width={200} height={200} priority alt="scrumX" />
                   
        
        {/* upper inidcate text */}
        <div className="flex flex-col gap-1 w-full justify-center items-center py-6 ">
                    <h2 className="text-textColor font-poppins font-regular text-xl ">
                        Sign in to <span className="font-bold">ScrumX</span>
                    </h2>
                      <p className="font-poppins font-semibold text-blue-600">{user?.email}</p>
                    <p className="text-gray-500 font-poppins font-light text-normal text-center">
                    Finish setting up your account
                    </p>
                   
                </div>
        
        <Formik
          initialValues={{
            firstName:  "", // Populate with user's firstName if available
            lastName:  "",   // Populate with user's lastName if available
          }}
          validateOnChange={true}  // Validate fields on each change
          validateOnBlur={true} 
          validationSchema={Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("First Name is required"), // Optional field
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(/[A-Z]/, "Password must have at least one uppercase letter")
              .matches(/[a-z]/, "Password must have at least one lowercase letter")
              .matches(/[0-9]/, "Password must have at least one number")
              .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must have at least one special character")
              .required("Password is required"),
            userProfession: Yup.string().required("Profession is required"),
          })}
          onSubmit={(values) => {
            const userData = { ...values, email: user?.email };

    console.log("Form submitted:", userData);
            if (user?.email) {
              dispatch(updateUserData(userData));
            } else {
              console.error("Email is missing, cannot update user data.");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-1  w-4/5">
             
              
              <InputField name="firstName" type="text" id="firstName" placeholder="First Name" className=""/>
              <InputField name="lastName" type="text" id="lastName" placeholder="Last Name" className=""/>
              <InputField name="userProfession" type="text" id="userProfession" placeholder="Profession" className=""/>
              <InputField name="password" type="password" id="password" placeholder="Enter your Password" className=""/>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-3 hover:bg-blue-600 transition"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

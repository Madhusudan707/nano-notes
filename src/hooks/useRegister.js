import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import {useBaseURL} from "../hooks"
import axios from "axios";

export const useRegister = (validate) => {
  const navigate = useNavigate();
  const {baseURL} = useBaseURL()
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const [firebaseServerError, setFirebaseServerError] = useState("");
  const { setUser, setIsLoading, setIsUserLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    setErrors(validate(values));
    // eslint-disable-next-line
  }, [values]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const registerUser = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      if (response) {
        setUser(response);
        setIsLoading(false);
        setIsUserLoggedIn(true);
        localStorage.setItem("isUserLoggedIn", true);
        localStorage.setItem("uid", response.user.uid);
      const responseReg=  await axios.post(`${baseURL}/users`, {
          uid: response.user.uid,
          email: values.email,
        });

        responseReg.data.success &&  navigate("/")
       
      }
    } catch (error) {
      setIsLoading(false);
      setFirebaseServerError(error.message);
    }
  };

  return {
    values,
    errors,
    firebaseServerError,
    handleChange,
    registerUser,
    isLoading,
  };
};

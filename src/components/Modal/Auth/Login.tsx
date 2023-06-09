import { auth } from "@/src/firebase/clientApp";
import { authModalState } from "../../../atoms/authModalAtom";
import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        className="mb-2 text-sm placeholder:text-gray-500 bg-white border border-blue-500 focus:outline-none focus:bg-gray-200"
        onChange={onChange}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        className="mb-2 text-sm placeholder:text-gray-500 bg-white border border-blue-500 focus:outline-none focus:bg-gray-200"
        onChange={onChange}
      />
      <p className="text-red-600">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </p>
      <Button
        className="w-full h-[36px] my-2"
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>
      <div className="text-xs flex justify-center">
        <p className="mr-1">Forgot your password?</p>
        <p
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
          className="text-blue-500 font-bold cursor-pointer"
        >
          RESET
        </p>
      </div>
      <div className="text-xs flex justify-center">
        <p className="mr-1">New Here?</p>
        <p
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
          className="text-blue-500 font-bold cursor-pointer"
        >
          SIGN UP
        </p>
      </div>
    </form>
  );
};
export default Login;

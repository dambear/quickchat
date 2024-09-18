import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <>
      <SignUp afterSignOutUrl={"/chat"} />
    </>
  );
};

export default SignInPage;

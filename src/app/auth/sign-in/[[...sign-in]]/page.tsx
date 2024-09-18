import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <>
      <SignIn afterSignOutUrl={"/chat"} />
    </>
  );
};

export default SignInPage;

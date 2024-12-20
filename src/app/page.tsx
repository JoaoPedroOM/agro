"use client";

import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useClerk } from "@clerk/clerk-react";
import ButtonLogin from "../components/forms/ButtonLogin";

export default function Login() {
  const { openSignIn } = useClerk();

  const handleGoogleLogin = () => {
    openSignIn({ 
      redirectUrl: window.location.origin + '/dashboard'
    });
    
  };

  const handleFacebookLogin = () => {
    openSignIn({
      redirectUrl: window.location.origin + '/dashboard'
     });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#e5e5e5] text-white relative overflow-hidden">
      <div className="relative lg:mx-0 mx-2 w-[400px] h-[400px] flex flex-col items-center justify-center bg-white rounded-xl p-6 border border-neutral-300 z-10">
        
        <div className="text-center w-full mb-6">
          <h1 className="font-second font-semibold text-lg text-center text-black">
            Entre com sua conta
          </h1>
        </div>

        <div className="relative mt-6 w-full">
          <div className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 px-2 text-[#737373] bg-white">
          🌿
          </div>
          <div className="border-b border-neutral-300"></div>
        </div>

        <div className="mt-6 flex w-full flex-col gap-4 font-main">
          <ButtonLogin title="Continue com o Google" Icon={FaGoogle} handleLogin={handleGoogleLogin}/>

          <ButtonLogin title="Continue com o Facebook" Icon={FaFacebook} handleLogin={handleFacebookLogin}/>
        </div>
      </div>
    </div>
  );
};


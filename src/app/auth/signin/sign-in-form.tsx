"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

type UserAuthForm = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserAuthForm) => {
    try {
      const user = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        callbackUrl: searchParams.get("callbackUrl") || "/",
        redirect: false,
      });

      if (!user?.error) {
        router.push(user?.url || "/");

        toast({
          title: "Success",
          description: "Success to Sign In",
          variant: "default",
          duration: 3000,
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check your email or password",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: sign-in-form.tsx:43 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[100%] gap-4 items-center"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Masuk akun anda
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors?.email?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors?.password?.message}
        />
      </div>

      <Button
        className={cn("w-[320px] bg-leaf mt-6", hover.shadow)}
        type="submit"
      >
        Masuk
      </Button>
    </form>
  );
}

export default SignInForm;

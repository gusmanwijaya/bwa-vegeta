"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "@/services/auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type UserAuthForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
};

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match!"),
  })
  .required();

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthForm>({
    resolver: yupResolver(schema),
  });

  const [registerMutation] = useRegisterMutation();

  const onSubmit = async (data: UserAuthForm) => {
    try {
      const response = await registerMutation(data).unwrap();

      if (response.status === 201) {
        const user = await signIn("credentials", {
          email: data?.email,
          password: data?.password,
          callbackUrl: searchParams.get("callbackUrl") || "/",
          redirect: false,
        });

        router.push(user?.url || "/");

        toast({
          title: "Success",
          description: response?.message || "Success to Sign Up",
          variant: "default",
          duration: 3000,
        });
      } else {
        toast({
          title: "Something went wrong",
          description:
            response?.message || "Please check your email or password",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: sign-up-form.tsx:51 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[100%] items-center"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Buat akun baru
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm mt-4"
          type="text"
          placeholder="Nama Lengkap"
          {...register("name")}
          error={errors?.name?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm mt-4"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors?.email?.message}
        />
      </div>

      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm mt-4"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors?.password?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm mt-4"
          type={showConfirmationPassword ? "text" : "password"}
          placeholder="Konfirmasi Kata Sandi"
          suffix="Eye"
          onPressSuffix={() =>
            setShowConfirmationPassword(!showConfirmationPassword)
          }
          {...register("confirmPassword")}
          error={errors?.confirmPassword?.message}
        />
      </div>

      <Button
        type="submit"
        className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}
      >
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;

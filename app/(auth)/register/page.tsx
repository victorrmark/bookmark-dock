"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import LogoLight from "@/public/logo-light-theme.svg";
import LogoDark from "@/public/logo-dark-theme.svg";
import { useForm } from "react-hook-form";
import { signupAction } from "../../actions/authActions";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    const res = await signupAction(data);
    if (res?.error) {
      toast.error(res.error, {
        duration: 4000,
        position: "top-right",
      });
    } else {
      setOpenDialog(true)
      reset();
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 font-manrope py-4 w-full px-4 dark:bg-neutral-900">
        <div className="py-5 px-5 sm:py-8 sm:px-9 w-md  rounded-xl flex flex-col gap-8 bg-white dark:bg-neutral-800 dark:outline-neutral-500">
          <Image
            src={LogoLight}
            alt="Bookmark Manger Logo"
            width={170}
            height={50}
            className="dark:hidden"
          />
          <Image
            src={LogoDark}
            alt="Bookmark Manger Logo"
            width={170}
            height={50}
            className="hidden dark:block"
          />

            <div>
              <p className="text-set1 font-bold text-neutral-900 dark:text-white">
                Create your account
              </p>
              <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
                Join us and start saving your favorite links - organized,
                searchable, and always within reach.
              </p>
            </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
            aria-label="Sign up form"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-set4 font-bold text-neutral-900 dark:text-white"
              >
                Full name *
                <input
                  type="text"
                  id="name"
                  className={`login-input ${errors.name
                    ? "outline-red-800 dark:outline-red-600"
                    : "outline-neutral-500 dark:outline-neutral-300"
                    }`}
                  {...register("name", {
                    required: "Full name is required",
                  })}
                />
              </label>
              {errors.name && (
                <p
                  className="text-red-800 dark:text-red-600 text-sm mt-2"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-set4 font-bold text-neutral-900 dark:text-white "
              >
                Email address <span className="text-teal-700 dark:text-neutral-100">*</span>
                <input
                  type="text"
                  id="email"
                  className={`login-input ${errors.email
            <div>
              <label
                htmlFor="email"
                className="block text-set4 font-bold text-neutral-900 dark:text-white "
              >
                Email address *
                <input
                  type="text"
                  id="email"
                  className={`login-input ${errors.email
                    ? "outline-red-800 dark:outline-red-600"
                    : "outline-neutral-500 dark:outline-neutral-300"
                    }`}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <p
                  className="dark:text-red-600 text-red-800 text-sm mt-2"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-set4 font-bold text-neutral-900 dark:text-white "
              >
                Password *
                <input
                  type="password"
                  id="password"
                  className={`login-input ${errors.password
                    ? "outline-red-800 dark:outline-red-600"
                    : "outline-neutral-500 dark:outline-neutral-300"
                    }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
              </label>
              {errors.password && (
                <p
                  className="dark:text-red-600 text-red-800 text-sm mt-2"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className="auth-Btn"
              aria-label="Create account"
              aria-busy={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="flex flex-col items-center w-full gap-3">
            <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
              Already have an account?{" "}
              <Link
                href="/login"
                className="login-links"
                aria-label="Go to login page"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-96 flex flex-col items-center gap-6">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-4">
              <DotLottieReact
                src="https://lottie.host/21474716-2680-4e90-93e5-d59e059282ee/089NmxurB0.lottie"
                loop={false}
                autoplay
                className="w-40 mx-auto"
              />
              Signup Successful

            </DialogTitle>

            <DialogDescription className="flex flex-col items-center ">
              <span className="text-center dark:text-neutral-100">
                We’ve sent a verification link to your email.
              </span>
              <span className="text-center dark:text-neutral-100">
                Open your inbox and click the link to activate your account.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose
              asChild
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-neutral-400 dark:border-neutral-400 cursor-pointer hover:text-teal-700 dark:hover:text-neutral-100"
            >
              <Button >Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  );
}

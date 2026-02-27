"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import LogoLight from "@/public/logo-light-theme.svg";
import LogoDark from "@/public/logo-dark-theme.svg";

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handlePasswordReset = async (data: FormData) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      toast.error("An error occurred. Please try again later.", {
        duration: 4000,
        position: "top-right",
      });
      console.log(error);
      return;
    }

    await supabase.auth.signOut();

    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    reset(); 
    router.push("/login"); 
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 font-manrope py-4 w-full px-4 dark:bg-neutral-900">
        <div className="py-5 px-5 sm:py-8 sm:px-9 w-md rounded-xl flex flex-col gap-8 bg-white dark:bg-neutral-800">
          <Image
            src={LogoLight}
            alt="Bookmark Manager Logo"
            width={170}
            height={50}
            className="dark:hidden"
          />
          <Image
            src={LogoDark}
            alt="Bookmark Manager Logo"
            width={170}
            height={50}
            className="hidden dark:block"
          />

          <div>
            <p className="text-set1 font-bold text-neutral-900 dark:text-white">
              Reset Your Password
            </p>
            <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
              Enter your new password below. Make sure it’s strong and secure.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Password */}
            <div>
              <label className="block text-set4 font-bold text-neutral-900 dark:text-white">
                New Password *
                <input
                  type="password"
                  className={`login-input ${
                    errors.password
                      ? "outline-red-800 dark:outline-red-600"
                      : "outline-neutral-500 dark:outline-neutral-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password must be at least 8 characters long",
                    },
                    onChange: () => trigger("confirmPassword"),
                  })}
                />
              </label>
              {errors.password && (
                <p className="text-red-800 dark:text-red-600 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-set4 font-bold text-neutral-900 dark:text-white">
                Confirm Password *
                <input
                  type="password"
                  className={`login-input ${
                    errors.confirmPassword
                      ? "outline-red-800 dark:outline-red-600"
                      : "outline-neutral-500 dark:outline-neutral-300"
                  }`}
                  {...register("confirmPassword", {
                    required: "Password confirmation is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
              </label>
              {errors.confirmPassword && (
                <p className="text-red-800 dark:text-red-600 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              className="auth-Btn"
              aria-busy={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Resetting password..."
                : "Reset Password"}
            </button>
          </form>

          <div className="flex flex-col items-center w-full gap-3">
            <Link
              href="/login"
              className="text-set4 font-medium login-links"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={openDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="w-96 flex flex-col items-center gap-6">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-4">
              <DotLottieReact
                src="https://lottie.host/21474716-2680-4e90-93e5-d59e059282ee/089NmxurB0.lottie"
                loop={false}
                autoplay
                className="w-40 mx-auto"
              />
              Password Changed!
            </DialogTitle>

            <DialogDescription className="text-center dark:text-neutral-100">
              Your password has been successfully changed.
              <br />
              Please log in with your new password.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Back to Login</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
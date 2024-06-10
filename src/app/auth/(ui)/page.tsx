import { Suspense, useState } from "react";
import Loader from "@/components/ui/loader";
import classNames from "classnames";
import { displayFont } from "@/app/display-font";
import Logo from "@/components/ui/logo";
import AuthButton from "@/components/auth/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
}
const Auth = ({ }: Props) => {
  return (
    <div className="h-screen bg-slate-50 flex flex-col items-center justify-center gap-10">
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col w-full rounded-2xl  p-1 max-w-[600px] mx-auto shadow-sm border-primary bg-gradient-to-r from-indigo-50 to-indigo-100">
          <div className={classNames("bg-white rounded-xl border-primary p-4", displayFont.className)}>
            <p className="font-semibold items-center justify-center text-slate-800 flex gap-4">
              <Logo />
            </p>
          </div>
          <AuthButton social="notion">
            Continue with Notion
          </AuthButton>
        </div>
      </Suspense>
    </div>
  )
}
export default Auth
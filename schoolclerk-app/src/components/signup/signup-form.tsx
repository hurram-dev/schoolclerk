"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

const signupSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.mixed<"teacher" | "parent">().required(),
});

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "teacher" | "parent";
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const { trigger, error } = useSWRMutation<{ token: string }>(
    { url: "/auth/signup", method: "POST" },
    fetcher
  );
  const router = useRouter();

  console.log(getValues());

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    // Handle form submission
    trigger({ body: data } as any)
      .then(async (value) => {
        console.log(value);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="firstname">First Name</Label>
        <Input
          type="text"
          id="firstname"
          {...register("firstname")}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <p className="mt-2 text-sm text-red-600">{errors.firstname?.message}</p>
      </div>

      <div>
        <Label htmlFor="lastname">Last Name</Label>
        <Input
          type="text"
          id="lastname"
          {...register("lastname")}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <p className="mt-2 text-sm text-red-600">{errors.lastname?.message}</p>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
        <p className="mt-2 text-sm text-red-600">{errors.password?.message}</p>
      </div>

      <div>
        <Label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </Label>
        <select className="select" {...register("role")}>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
        </select>

        <p className="mt-2 text-sm text-red-600">{errors.role?.message}</p>
      </div>

      <div>
        <Button type="submit" className="w-full flex justify-center">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;

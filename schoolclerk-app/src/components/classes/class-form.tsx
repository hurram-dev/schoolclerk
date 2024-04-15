"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

interface IFormInput {
  title: string;
  permanentRoom: string;
  grade: string;
  mentor: string;
  students: any[];
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "teacher" | "parent";
  phoneNumber: string;
}

const schema = yup.object({
  title: yup.string().required(),
  students: yup.array().required(),
  grade: yup.string().required(),
  mentor: yup.string().required(),
  permanentRoom: yup.string().required(),
});

export default function CreateClassForm() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { data: teachersData, isLoading: isTeachersLoading } = useSWR<{
    teachers: IUser[];
  }>({ url: "/class/teachers", method: "GET" }, fetcher);

  const { trigger, isMutating } = useSWRMutation(
    { url: "/class", method: "POST" },
    fetcher
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const createClassResponse = await trigger({ body: data } as any);

      if (createClassResponse.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(teachersData, "teachers");

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt?.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      processStudents(data);
    };
    reader.readAsBinaryString(file);
  };

  const processStudents = (data: any) => {
    // Assume the first row is headers and the following rows are student data
    const students = data.slice(1).map((row: any) => ({
      firstName: row[0],
      lastName: row[1],
      fatherName: row[2],
      dateOfBirth: row[3],
      permanentAddress: row[4],
    }));
    setValue("students", students);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
        Register Class
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register("title")}
            type="text"
            placeholder="Class Title"
            className="p-2 border rounded"
          />
          <Input
            {...register("permanentRoom")}
            type="text"
            placeholder="Permanent Room"
            className="p-2 border rounded"
          />
          <Input
            {...register("grade")}
            type="text"
            placeholder="Grade"
            className="p-2 border rounded"
          />
          <select {...register("mentor")} className="p-2 border rounded">
            <option value="6611870ecb43c1767517c6e2">Mentor</option>
            {teachersData?.teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstname} {teacher.lastname}
              </option>
            ))}
          </select>
          <Input
            type="file"
            onChange={handleFileUpload}
            className="p-2 border rounded"
            accept=".xlsx, .xls"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isMutating ? "Creating Class..." : "Create Class"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

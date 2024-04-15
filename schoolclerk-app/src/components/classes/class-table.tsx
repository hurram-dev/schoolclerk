"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { IUser } from "./class-form";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";

interface IClass {
  _id: string;
  students: any[];
  mentor: IUser;
  title: string;
  grade: string;
  permanentRoom: string;
  createdAt: string;
  updatedAt: string;
}

export function ClassesTable() {
  const { data: classesData, isLoading } = useSWR<IClass[]>(
    { url: "/class", method: "GET" },
    fetcher
  );

  console.log(classesData, "classesData");
  return (
    <Accordion collapsible className="w-full" type="single">
      {!isLoading
        ? classesData?.map((cls) => (
            <AccordionItem value={cls._id}>
              <AccordionTrigger>
                <div className="flex items-center space-x-4">
                  <div>
                    <Badge variant={"secondary"}>{cls.title}</Badge>
                  </div>
                  <div className="flex items-center">
                    Mentor:{" "}
                    <h3 className="font-semibold">
                      {cls.mentor.firstname} {cls.mentor.lastname}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="bg-gray-100 p-4 rounded-md">
                  {cls.students.map((student) => (
                    <li
                      key={student._id}
                      className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-2 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Full name: {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Address: {student.permanentAddress}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Date of birth:{" "}
                          {new Date(student.dateOfBirth).toDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))
        : "•••"}
    </Accordion>
    // <table className="min-w-full table-auto">
    //   <thead className="bg-gray-200">
    //     <tr>
    //       <th className="px-6 py-3 text-left">Title</th>
    //       <th className="px-6 py-3 text-left">Permanent Room</th>
    //       <th className="px-6 py-3 text-left">Grade</th>
    //       <th className="px-6 py-3 text-left">Mentor</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {!isLoading
    //       ? classesData?.map((cls) => (
    //           <tr key={cls._id} className="border-b">
    //             <td className="px-6 py-2">{cls.title}</td>
    //             <td className="px-6 py-2">{cls.permanentRoom}</td>
    //             <td className="px-6 py-2">{cls.grade}</td>
    //             <td className="px-6 py-2">
    //               {cls.mentor.firstname} {cls.mentor.lastname}
    //             </td>
    //           </tr>
    //         ))
    //       : "•••"}
    //   </tbody>
    // </table>
  );
}

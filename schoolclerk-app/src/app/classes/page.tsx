import CreateClassForm from "@/components/classes/class-form";
import { ClassesTable } from "@/components/classes/class-table";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function page() {
  return (
    <div className="container mx-auto p-4 w-full">
      <CreateClassForm />
      <ClassesTable />
    </div>
  );
}

import Link from "next/link";

export default function Sidebar() {
  return (
    <nav
      className={`top-0 left-0 fixed float-left w-1/5 bg-gray-800 text-white h-full z-30`}
    >
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-xl font-semibold">SchoolClerk</h1>
      </div>
      <ul className="flex flex-col py-4">
        <li>
          <Link
            href="/classes"
            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Classes
          </Link>
        </li>
        <li>
          <Link
            href="/modules"
            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Modules
          </Link>
        </li>
      </ul>
    </nav>
  );
}

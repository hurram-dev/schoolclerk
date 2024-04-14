import Link from "next/link";
import LoginForm from "@/components/login/login-form";

export default function Login () {
    return (
        <div className="flex items-center h-screen">
            <div className="max-w-md mx-auto my-10">
                <h2 className="text-2xl font-bold text-center mb-6">Log into the SchoolClerk</h2>
                <p>You do not have account yet? <Link className="text-blue-400" href="/signup">Sign up</Link> here</p>
                <LoginForm/>
            </div>
        </div>

    )
}
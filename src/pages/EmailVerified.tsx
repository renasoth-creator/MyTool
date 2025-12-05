import { Link } from "react-router-dom";

export default function EmailVerified() {
  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Email Verified </h1>
      <p className="text-sm text-gray-600 mb-6">
        Your email has been successfully verified.  
        You can now sign in to your account.
      </p>

      <Link
        to="/login"
        className="px-5 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600"
      >
        Go to Login
      </Link>
    </div>
  );
}

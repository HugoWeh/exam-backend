import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6 px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Bienvenue sur CoList
      </h1>

      <div className="space-y-4 w-full max-w-sm">
        <Link
          href="/account/login"
          className="block w-full py-3 text-lg font-medium text-white bg-indigo-600 text-center rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Se connecter
        </Link>
        <Link
          href="/account/signup"
          className="block w-full py-3 text-lg font-medium text-indigo-600 border-2 border-indigo-600 text-center rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

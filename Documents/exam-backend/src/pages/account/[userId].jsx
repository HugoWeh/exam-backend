import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async ({ params: { userId } }) => {
  const { data: user } = await axios(
    `http://localhost:3000/api/users/${userId}`
  );
  const { data: colists } = await axios("http://localhost:3000/api/colists");

  return { props: { user, colists } };
};

const UserPage = ({ colists, user }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Connecté en tant que{" "}
          <span className="text-indigo-600">
            {user.firstName} {user.lastName}
          </span>{" "}
          ({user.email})
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Colists</h2>

        <ul className="space-y-3">
          {colists.map((colist) => (
            <li
              key={colist._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-200"
            >
              <Link
                href={`/colist/${colist._id}`}
                className="text-lg text-indigo-600 hover:underline"
              >
                {colist.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link
            href={`/account/${user._id}/create`}
            className="inline-block px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Créer une CoList
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

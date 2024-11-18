import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async ({ params: { userId, colistId } }) => {
  const { data: colist } = await axios(
    `http://localhost:3000/api/colists/${colistId}`
  );

  const { data: user } = await axios(
    `http://localhost:3000/api/users/${userId}`
  );

  return { props: { user, colist } };
};

const Colist = ({ user, colist }) => {
  const copyLink = () => {
    const link = `${window.location.origin}/account/${user._id}/${colist._id}`;
    navigator.clipboard.writeText(link);
    alert("Lien copié dans le presse-papiers");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">{colist.name}</h1>
      <p className="text-lg text-gray-700">{colist.description}</p>
      <p className="text-md text-gray-600">Co-Authors: {colist.coAuthors}</p>

      <div className="flex space-x-4">
        <Link
          href={`/account/${user._id}/${colist._id}/edit`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Modifier
        </Link>

        <Link
          href={`/account/${user._id}`}
          onClick={async () => {
            if (user._id !== colist.owner) {
              alert("Vous n'êtes pas le propriétaire de cette liste");
              return;
            }
            await axios.delete(`/api/colists/${colist._id}`);
          }}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          Supprimer
        </Link>
        <button
          onClick={copyLink}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          Copier le lien d'invitation
        </button>
      </div>
    </div>
  );
};

export default Colist;

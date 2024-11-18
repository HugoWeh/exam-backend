import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async ({ params: { colistId } }) => {
  const { data: colist } = await axios(
    `http://localhost:3000/api/colists/${colistId}`
  );

  return { props: { colist } };
};

const Colist = ({ colist }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">{colist.name}</h1>
      <p className="text-lg text-gray-700">{colist.description}</p>
      <p className="text-md text-gray-600">
        Owner: <span className="font-semibold">{colist.owner}</span>
      </p>
      <p className="text-md text-gray-600">
        Co-Authors:{" "}
        {colist.coAuthors.length > 0
          ? colist.coAuthors.join(", ")
          : "Il n'y a pas de co-auteur"}
      </p>

      <div className="flex space-x-4">
        <Link
          href={`/colist/${colist._id}/edit`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Modifier
        </Link>

        <Link
          href="/"
          onClick={async () => {
            await axios.delete(`/api/colists/${colist._id}`);
          }}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          Supprimer
        </Link>
      </div>
    </div>
  );
};

export default Colist;

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
    <div>
      <h1>{colist.name}</h1>
      <p>{colist.description}</p>
      <p>Owner: {colist.owner}</p>
      <p>
        Co-Authors:{" "}
        {colist.coAuthors.length > 0
          ? colist.coAuthors.join(", ")
          : "Il n'y a pas de co-auteur"}
      </p>
      <Link href={`/colist/${colist._id}/edit`}>Modifier</Link>
      <Link
        href="/"
        onClick={async () => {
          await axios.delete(`/api/colists/${colist._id}`);
        }}
      >
        Supprimer
      </Link>
    </div>
  );
};

export default Colist;

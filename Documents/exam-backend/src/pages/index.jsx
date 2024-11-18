import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async () => {
  const { data: colists } = await axios("http://localhost:3000/api/colists");

  return { props: { colists } };
};

const HomePage = ({ colists }) => {
  return (
    <div className="flex flex-col items-center">
      <h1>Colists</h1>
      <ul>
        {colists.map((colist) => (
          <li key={colist._id}>
            <Link href={`/colist/${colist._id}`}>{colist.name}</Link>
          </li>
        ))}
      </ul>

      <Link href="/colist/create">Créer une CoList</Link>
      <Link href="/account/login">Se connecter</Link>
    </div>
  );
};

export default HomePage;

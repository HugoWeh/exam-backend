import axios from "axios";

export const getServerSideProps = async ({ params: { userId } }) => {
  const { data: user } = await axios(
    `http://localhost:3000/api/users/${userId}`
  );

  return { props: { user } };
};

const UserPage = ({ user }) => {
  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
};

export default UserPage;

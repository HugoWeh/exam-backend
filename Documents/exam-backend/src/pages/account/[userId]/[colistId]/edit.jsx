import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "@/schemas/colist/validationSchema";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async ({ params: { userId, colistId } }) => {
  const { data: colist } = await axios(
    `http://localhost:3000/api/colists/${colistId}`
  );

  const { data: user } = await axios(
    `http://localhost:3000/api/users/${userId}`
  );

  return { props: { user, colist } };
};

const EditPage = ({ user, colist }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const initialValues = colist;

  const submit = async ({ name, description, owner, coAuthors }) => {
    if (user._id !== colist.owner) {
      setError("Vous n'êtes pas le propriétaire de cette liste"); 
      return;
    }

    await axios.patch(`/api/colists/${colist._id}`, {
      name,
      description,
      owner,
      coAuthors,
    });

    router.push(`/account/${user._id}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Edit the Colist
        </h1>

        {error && (
          <div className="text-red-500 text-md mb-4">{error}</div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Field
            type="text"
            name="name"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Field
            type="text"
            name="description"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="coAuthors"
            className="block text-sm font-medium text-gray-700"
          >
            Co-Authors
          </label>
          <Field
            type="text"
            name="coAuthors"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage
            name="coAuthors"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditPage;

import { validationSchema } from "@/schemas/colist/validationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export const getServerSideProps = async ({ params: { userId } }) => {
  const { data: user } = await axios(
    `http://localhost:3000/api/users/${userId}`
  );

  return { props: { user } };
};

const CreatePage = ({ user }) => {
  const initialValues = {
    name: "",
    description: "",
    owner: user._id,
    coAuthors: [],
  };

  const submit = async (
    { name, description, owner, coAuthors },
    { resetForm }
  ) => {
    await axios.post("/api/colists", {
      name,
      description,
      owner,
      coAuthors,
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-96 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create a New Colist
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Field
            id="name"
            name="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Field
            id="description"
            name="description"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="coAuthors"
            className="block text-sm font-medium text-gray-700"
          >
            Co-Authors
          </label>
          <Field
            id="coAuthors"
            name="coAuthors"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage
            name="coAuthors"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default CreatePage;

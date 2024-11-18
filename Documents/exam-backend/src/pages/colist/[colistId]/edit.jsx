import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "@/schemas/colist/validationSchema";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params: { colistId } }) => {
  const { data: colist } = await axios(
    `http://localhost:3000/api/colists/${colistId}`
  );
  return { props: { colist } };
};

const EditPage = ({ colist }) => {
  const router = useRouter();
  const initialValues = colist;

  const submit = async ({ name, description, owner, coAuthors }) => {
    await axios.patch(`/api/colists/${colist._id}`, {
      name,
      description,
      owner,
      coAuthors,
    });

    router.push(`/colist/${colist._id}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">Edit the Colist</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Field
            type="text"
            name="name"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Field
            type="text"
            name="description"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
            Owner
          </label>
          <Field
            type="text"
            name="owner"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="owner" component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label htmlFor="coAuthors" className="block text-sm font-medium text-gray-700">
            Co-Authors
          </label>
          <Field
            type="text"
            name="coAuthors"
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="coAuthors" component="div" className="text-red-500 text-xs mt-1" />
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

import { validationSchema } from "@/schemas/colist/validationSchema";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const initialValues = {
  name: "Gérald",
  description: "A cool colist",
  owner: "Alice",
  coAuthors: [],
};

const CreatePage = () => {
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
      <Form className="flex flex-col bg-gray-200 p-4 w-1/3">
        <h1>Create a new colist</h1>
        <p>Name</p>
        <Field name="name" className="p-1 m-1 rounded-md" />
        <p>Description</p>
        <Field name="description" className="p-1 m-1 rounded-md" />
        <p>Owner</p>
        <Field name="owner" className="p-1 m-1 rounded-md" />
        <p>Co-Authors</p>
        <Field name="coAuthors" className="p-1 m-1 rounded-md" />
        <button
          href="/"
          type="submit"
          className="p-2 mt-3 bg-indigo-500 text-white font-bold"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default CreatePage;

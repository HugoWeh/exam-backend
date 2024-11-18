import axios from "axios";
import { Formik, Form, Field } from "formik";
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
      <Form>
        <h1>Edit the colist</h1>
        <p>Name</p>
        <Field name="name" />
        <p>Description</p>
        <Field name="description" />
        <p>Owner</p>
        <Field name="owner" />
        <p>Co-Authors</p>
        <Field name="coAuthors" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EditPage;

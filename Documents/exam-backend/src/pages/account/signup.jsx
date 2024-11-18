import { validationSchema } from "@/schemas/user/validationSchema";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const submit = async (
    { firstName, lastName, email, password },
    { resetForm }
  ) => {
    await axios.post("/api/users", {
      firstName,
      lastName,
      email,
      password,
    });
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        <Form>
          <h1>Sign Up</h1>
          <p>First Name</p>
          <Field name="firstName" />
          <p>Last Name</p>
          <Field name="lastName" />
          <p>Email</p>
          <Field name="email" />
          <p>Password</p>
          <Field name="password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpPage;

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();

  const submit = async (
    { email, password },
    { resetForm, setSubmitting, setFieldError }
  ) => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      // Si l'authentification est réussie, redirige vers la page du compte de l'utilisateur
      if (data.success) {
        router.push(`/account/${data.userId}`);
      } else {
        setFieldError("password", "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFieldError("email", "Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Login</h1>
            <div>
              <label>Email</label>
              <Field name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;

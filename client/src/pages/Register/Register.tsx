import AuthLayout from "../../components/layout/Auth";
import RegisterForm from "../../components/auth/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your projects with ProjectFlow."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
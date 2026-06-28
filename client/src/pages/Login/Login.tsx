import AuthLayout from "../../components/layout/Auth";
import LoginForm from "../../components/auth/LoginForm/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your boards and tasks."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
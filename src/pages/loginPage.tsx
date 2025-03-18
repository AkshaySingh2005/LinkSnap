import LoginForm from "@/components/myComponents/login-form";
import SiteHeader from "@/components/myComponents/site-header";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;

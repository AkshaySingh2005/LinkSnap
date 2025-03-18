import LoginForm from "@/components/myComponents/login-form";
import SiteFooter from "@/components/myComponents/site-footer";
import SiteHeader from "@/components/myComponents/site-header";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <LoginForm />
      </main>
      <SiteFooter />
    </div>
  );
};

export default LoginPage;

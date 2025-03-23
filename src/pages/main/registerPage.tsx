import RegisterForm from "@/components/myComponents/register-form";
import SiteFooter from "@/components/myComponents/site-footer";
import SiteHeader from "@/components/myComponents/site-header";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </main>
      <SiteFooter />
    </div>
  );
};

export default RegisterPage;

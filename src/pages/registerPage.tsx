import RegisterForm from "@/components/myComponents/register-form";
import SiteHeader from "@/components/myComponents/site-header";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </main>
    </div>
  );
};

export default RegisterPage;

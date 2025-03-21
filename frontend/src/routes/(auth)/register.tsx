import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/hooks/useAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { SyntheticEvent } from "react";
import { z } from "zod";

const fallback = "/dashboard" as const;
export const Route = createFileRoute("/(auth)/register")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { register } = useAuth();

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };

    try {
      register(formElements.email.value, formElements.password.value);
      redirect({ to: fallback });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

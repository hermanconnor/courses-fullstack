import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupSchema, type SignUpFormData } from "@/lib/validation-schemas";
import FormField from "@/components/form/form-field";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (credentials: SignUpFormData) => {
    console.log(credentials);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Fill in your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="firstName"
                label="First Name"
                register={register}
                error={errors.firstName?.message}
              />

              <FormField
                name="lastName"
                label="Last Name"
                register={register}
                error={errors.lastName?.message}
              />

              <FormField
                type="email"
                name="emailAddress"
                label="Email Address"
                register={register}
                error={errors.emailAddress?.message}
              />

              <FormField
                type="password"
                name="password"
                label="Password"
                register={register}
                error={errors.password?.message}
              />

              <FormField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                register={register}
                error={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/sign-in"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

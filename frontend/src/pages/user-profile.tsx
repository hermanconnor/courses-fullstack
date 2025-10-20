import { useAuth } from "@/providers/auth-provider";

const UserProfile = () => {
  const { authUser } = useAuth();

  const firstName = authUser && authUser.firstName;
  const lastName = authUser && authUser.lastName;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {firstName} {lastName} is authenticated!
        </h1>
      </div>
    </div>
  );
};

export default UserProfile;

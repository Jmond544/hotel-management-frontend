export default function NotAccess() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-xl text-gray-500">
        You do not have permission to access this page.
      </p>
    </div>
  );
}

import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import Wrapper from "./wrapper";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <Wrapper />;
};

export default AdminPage;

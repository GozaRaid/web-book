import { Addbook } from "@/components/layouts/Addbook";
import { withAuth } from "@/components/layouts/withAuth";

function Tambahbuku() {
  return <Addbook />;
}

export default withAuth(Tambahbuku, "admin");

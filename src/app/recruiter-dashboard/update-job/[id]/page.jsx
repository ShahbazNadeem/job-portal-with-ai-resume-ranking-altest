import UpdateJobPage from "@/app/_components/UpdateJobPage";

export default function Page({ params }) {
  const { id } = params;
  return <UpdateJobPage jobId={id} />;
}
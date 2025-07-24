import Empty from "./Empty";
import Card from "./Card";
import Error from "./Error";
import { useJobs } from "../hooks/useJobs";

export default function Posts() {
  const { jobs, error, loading } = useJobs(true);

  console.log(jobs);

  if (error) return <Error />;

  return (
    <div>
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <Card key={index} job={job} />
        ))}
      </div>

      {jobs.length === 0 && <Empty />}
    </div>
  );
}

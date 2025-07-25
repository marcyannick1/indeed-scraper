"use client";
import { useEffect, useState } from "react";
import JobServices from "../services/JobServices";

export const useJobs = (autoFetchAll) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgents = async () => {
    try {
      const jobServices = new JobServices();
      const data = await jobServices.getJobs();
      setJobs(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (autoFetchAll) {
      fetchAgents();
    }
  }, [autoFetchAll]);

  return {
    loading,
    jobs,
    error,
  };
};

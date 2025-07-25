import Services from "./Services";

export default class AgentServices extends Services {
  async getJobs() {
    try {
      const response = await this.get("jobs");
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce :", error);
      throw error;
    }
  }

  async getJob(id) {
    try {
      const response = await this.get(`jobs/${id}`);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce :", error);
      throw error;
    }
  }
}
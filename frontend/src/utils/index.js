export const formatSalary = (salary) => {
  if (!salary) return "Salaire non communiqué";
  return `${salary.replace("-", " - ")} €/an`;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hier";
  if (diffDays <= 7) return `Il y a ${diffDays} jours`;
  return date.toLocaleDateString("fr-FR");
};

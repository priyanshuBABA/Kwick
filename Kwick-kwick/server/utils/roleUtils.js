export const normalizeRoles = (roles) => {
  const list = Array.isArray(roles)
    ? roles
    : typeof roles === 'string' && roles.trim()
      ? [roles]
      : [];

  const normalized = list
    .map((role) => String(role).trim().toLowerCase())
    .filter(Boolean);

  const uniqueRoles = [...new Set(normalized)];
  return uniqueRoles.length ? uniqueRoles : ['customer'];
};

export const mergeRoles = (existingRoles = [], incomingRoles = []) => {
  return normalizeRoles([...existingRoles, ...incomingRoles]);
};

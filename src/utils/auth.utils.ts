export const userHasRole = (userRoles: string[], roles: string[]) =>
  userRoles.some(role => roles.includes(role));

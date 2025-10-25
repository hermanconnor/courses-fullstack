export const createAuthHeaders = (emailAddress: string, password: string) => ({
  "Content-Type": "application/json; charset=utf-8",
  Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`,
});

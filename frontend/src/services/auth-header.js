export default function authHeader() {
  const token = localStorage.getItem("ag-token");

  if (token) {
    return { "x-auth-token": token };
  } else {
    return {};
  }
}

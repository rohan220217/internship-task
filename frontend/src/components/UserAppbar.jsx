import Header from "./Header";

function UserAppbar({ userId }) {
  const sections = [
    { title: "Home Tab", url: "/user/" + userId },
    { title: "Analytics Tab", url: "/user/analytics/" + userId },
  ];
  return (
    <Header title={`FTE- Alchemy Group User - ${userId}`} sections={sections} />
  );
}

export default UserAppbar;

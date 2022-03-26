import { useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home Page
      </button>
      <button
        onClick={() => {
          navigate("/contacts");
        }}
      >
        Contacts
      </button>
      <button
        onClick={() => {
          navigate("/info/2");
        }}
      >
        Info
      </button>
    </>
  );
}

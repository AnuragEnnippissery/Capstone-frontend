import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/");
  }

  return (
    <>
      <h1>You have entered the error page</h1>
      <button onClick={handleRedirect}>Return Home</button>
    </>
  );
}

export default ErrorPage;

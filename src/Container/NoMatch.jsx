import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div
      className="nomatch"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <h1>Такой страницы не существует</h1>
      <Link to="/">Пожалуйста, перейдите по ссылке на главную страницу</Link>
    </div>
  );
};

export default NoMatch;

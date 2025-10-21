import { useNavigate, useLocation } from "react-router-dom";

export default function ScrollLink({ to, children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(to);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const section = document.querySelector(to);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

import Link from "next/link";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { updateTheme } from "@/lib/features/themeSlice";
import { removeCookie } from "../../helpers/Cookie";
import { useRouter } from "next/navigation";

import "./style.scss";

const Header = () => {
  const dispatch = useDispatch();
  const themeData = useAppSelector((state) => state.themeInfo.theme);
  const router = useRouter();

  const userLogout = () => {
    removeCookie("token");
    removeCookie("refreshToken");
    removeCookie("userId");
    router.push("/Login");
    console.log("reload to login page");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" className="text-color">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Login" className="text-color">
              About
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="text-color">
              Contact
            </Link>
          </li>
          <li onClick={userLogout} className="text-color">
            Logout
          </li>
        </ul>
      </nav>

      <div
        className="chnage-theme text-color"
        onClick={() =>
          dispatch(
            updateTheme(
              themeData === "light-theme" ? "dark-theme" : "light-theme"
            )
          )
        }
      >
        {themeData === "light-theme" ? <SunOutlined /> : <MoonOutlined />}
      </div>
    </header>
  );
};

export default Header;

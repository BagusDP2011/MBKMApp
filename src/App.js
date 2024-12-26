import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
// Services
import { componentsMap } from "./mapItem/mapItem";
import { useEffect, useState, useContext } from "react";
import NotFound from "./pages/NotFound";
import { getMenu } from "./service/Static.Service";
import { decodeToken, isTokenExpired } from "./service/Auth.Service";
import SignIn from "./pages/auth/SignIn";
import { AuthContext } from "./service/AuthContext";
// Pages
import SilamKW from "./pages/SilamKW";
import Register from "./pages/auth/Register";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [menus, setMenus] = useState([]);
  const [redirectTo, setRedirectTo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (isLoggedIn) {
          const data = await getMenu();
          setMenus(data);
          // navigate(findRedirectMenus(data))
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchData();
    } else {
      fetchData();
      // localStorage.removeItem("token");
      // navigate("/signin");
    }
  }, [isLoggedIn]);

  const findRedirectMenus = (menuData) => {
    let result = "";

    const processMenu = (menuList) => {
      menuList.forEach((menu) => {
        if (menu.Redirect === 1) {
          console.log(`On Filter ${menu.Path}`);
          result = menu.Path;
        }

        if (menu.child && menu.child.length > 0) {
          processMenu(menu.child, menu.Path);
        }
      });
    };

    processMenu(menuData);
    return result;
  };

  function generateRoutes(menuItems) {
    return menuItems.map((menu) => {
      const ElementComponent = componentsMap[menu.Element] || null;
      const component = ElementComponent ? (
        <ElementComponent
          menuAccess={menu.menuAccess}
          accessId={isLoggedIn ? decodeToken().accessId : null}
        />
      ) : null;

      return (
        <Route key={menu.MenuID} path={menu.Title} element={component}>
          {menu.child?.length > 0 && generateRoutes(menu.child)}
        </Route>
      );
    });
  }

  return (
    <Routes>
      <Route path="/" element={<SilamKW />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      {isLoggedIn && (
        <Route
          path="/menu"
          element={
            <DashboardLayout menus={menus.filter((item) => !item.Index)} />
          }
        >
          {generateRoutes(menus.filter((item) => !item.Index))}
        </Route>
      )}
      <Route path="*" element={<NotFound isLoading={isLoading} />} />
    </Routes>
  );
}

export default App;

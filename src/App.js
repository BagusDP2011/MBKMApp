import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (isLoggedIn) {
          const data = await getMenu();
          setMenus(data);
        }
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
          {decodeToken().accessId.toString() === "1" && <Route index element={<Navigate to="/menu/mbkm/informasi" />} />} 
          {generateRoutes(menus.filter((item) => !item.Index))}
        </Route>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

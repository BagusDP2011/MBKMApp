import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { componentsMap } from "./mapItem/mapItem";
import { useEffect, useState, useContext } from "react";
import NotFound from "./pages/NotFound";
import { getMenu } from "./service/Static.Service";
import { decodeToken } from "./service/Auth.Service";
import SignIn from "./pages/auth/SignIn";
import { AuthContext } from "./service/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (isLoggedIn) {
          const data = await getMenu(decodeToken().accessId);
          setMenus(data);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  function generateRoutes(menuItems) {
    return menuItems.map((menu) => {
      const ElementComponent = componentsMap[menu.Element] || null;
      const component = ElementComponent ? <ElementComponent menuAccess={menu.menuAccess} accessId={isLoggedIn ? decodeToken().accessId : null}/> : null;

      return (
        <Route key={menu.MenuID} path={menu.Title} element={component}>
          {menu.child && menu.child.length > 0 && generateRoutes(menu.child)}
        </Route>
      );
    });
  }

  // if (isLoading) {
  //   return (
  //   <Stack direction="row" sx={{justifyContent:'center', alignItems:'center', height:'100vh', columnGap:1}}>
  //     <CircularProgress /> Loading...
  //   </Stack>
  //   )
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/menu" element={<DashboardLayout menus={menus.filter((item) => !item.Index)} />}>
          {generateRoutes(menus.filter((item) => !item.Index))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

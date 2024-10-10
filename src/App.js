import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { componentsMap } from "./mapItem/mapItem";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material'
import NotFound from "./pages/NotFound";
import { getMenu } from "./service/Static.Service";
import { isTokenExpired, login } from "./service/Auth.Service";

function App() {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      try {
        if(!localStorage.getItem("token") || isTokenExpired()) await login();

        const data = await getMenu(2);
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  function generateRoutes(menuItems) {
    return menuItems.map((menu) => {
      const ElementComponent = componentsMap[menu.Element] || null;
      const component = ElementComponent ? <ElementComponent menuAccess={menu.menuAccess}/> : null;

      return (
        <Route key={menu.MenuID} path={menu.Title} element={component}>
          {menu.child && menu.child.length > 0 && generateRoutes(menu.child)}
        </Route>
      );
    });
  }

  if (isLoading) {
    return (
    <Stack direction="row" sx={{justifyContent:'center', alignItems:'center', height:'100vh', columnGap:1}}>
      <CircularProgress /> Loading...
    </Stack>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<DashboardLayout menus={menus.filter((item) => !item.Index)} />}>
          {generateRoutes(menus.filter((item) => !item.Index))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

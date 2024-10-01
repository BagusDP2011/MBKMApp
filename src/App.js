import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { componentsMap } from "./mapItem/mapItem";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound";
import SilamKW from "./pages/SilamKW";


function App() {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMenu(){
      try {
        const response = await fetch('http://localhost:3001/api/menu/2');
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }finally {
        setIsLoading(false);
      }
    };
    getMenu();
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
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SilamKW />} />
        <Route path="/menu" element={<DashboardLayout menus={menus.filter((item) => !item.Index)} />}>
          {generateRoutes(menus.filter((item) => !item.Index))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

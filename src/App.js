import SideMenu from "./components/sidemenu/SideMenu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./App.css";
import { SignalCellularNullOutlined } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

let menus = [
  {
    webMenuId: 1,
    title: "Menu",
    path: "/menu",
    url: "menu",
    icon: null,
    parentId: 1,
    index: true,
    child: [],
    element: <SideMenu />,
  },
  {
    webMenuId: 2,
    title: "Dashboard",
    path: "menu/dashboard",
    url: "dashboard",
    icon: <DashboardOutlinedIcon />,
    parentId: 1,
    index: false,
    child: [],
    element: null,
  },
  {
    webMenuId: 3,
    title: "Files",
    path: "menu/files",
    url: "files",
    icon: <DescriptionOutlinedIcon />,
    parentId: 1,
    index: false,
    child: [
      {
        webMenuId: 4,
        title: "Achivement",
        path: "menu/files/achivement",
        url: "files/achivement",
        icon: <TrendingUpIcon />,
        index: false,
        parentId: 3,
        child: [],
        element: null,
      },
      {
        webMenuId: 5,
        title: "Submission",
        path: "menu/files/submission",
        url: "files/submission",
        icon: <TrendingUpIcon />,
        index: false,
        parentId: 3,
        child: [],
        element: null,
      },
    ],
    element: null,
  },
];

function App() {
  function generateRoutes(menuItems) {
    return menuItems.map((menu) => {
      return (
        <Route key={menu.webMenuId} path={menu.title} element={menu.element}>
          {menu.child && menu.child.length > 0 && generateRoutes(menu.child)}
        </Route>
      );
    });
  }

  menus = menus.filter((item) => !item.index)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<SideMenu menus={menus} />}>
          {generateRoutes(menus)}
        </Route>
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

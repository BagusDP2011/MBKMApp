import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ListSubmission from "./pages/menu/Submission/ListSubmission";

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
    element: <DashboardLayout />,
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
    title: "MBKM",
    path: "menu/mbkm",
    url: "mbkm",
    icon: <GroupsOutlinedIcon />,
    parentId: 1,
    index: false,
    child: [
      {
        webMenuId: 4,
        title: "Informasi",
        path: "menu/mbkm/informasi",
        url: "mbkm/informasi",
        icon: <InfoOutlinedIcon />,
        index: false,
        parentId: 3,
        child: [],
        element: null,
      },
      {
        webMenuId: 5,
        title: "Pengajuan",
        path: "menu/mbkm/pengajuan",
        url: "mbkm/pengajuan",
        icon: <DescriptionOutlinedIcon />,
        index: false,
        parentId: 3,
        child: [],
        element: null,
      },
      {
        webMenuId: 6,
        title: "Daftar Pengajuan",
        path: "menu/mbkm/daftar pengajuan",
        url: "mbkm/daftar pengajuan",
        icon: <SegmentOutlinedIcon />,
        index: false,
        parentId: 3,
        child: [],
        element: <ListSubmission/>,
      },
    ],
    element: null,
  },
];

function App() {
  function generateRoutes(menuItems) {
    return menuItems.map((menu) => {
      return (
        <Route key={menu.menuId} path={menu.title} element={menu.element}>
          {menu.child && menu.child.length > 0 && generateRoutes(menu.child)}
        </Route>
      );
    });
  }

  menus = menus.filter((item) => !item.index)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<DashboardLayout menus={menus} />}>
          {generateRoutes(menus)}
        </Route>
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

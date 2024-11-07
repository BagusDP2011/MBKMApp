import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Link,
  Badge,
  Grid,
  Button,
} from "@mui/material";
import { getListRoleDetail } from "../../../service/Static.Service";
import EditMenuAccessModal from "./EditMenuAccessModal";

const permissionsData = [
  {
    "Title": "Menu",
    "MenuAccessID": 1,
    "MenuID": 1,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": false,
    "CanEdit": false,
    "CanDelete": false,
    "CanPrint": false
  },
  {
    "Title": "MBKM",
    "MenuAccessID": 2,
    "MenuID": 3,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": false,
    "CanEdit": false,
    "CanDelete": false,
    "CanPrint": false
  },
  {
    "Title": "Informasi",
    "MenuAccessID": 3,
    "MenuID": 4,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": false,
    "CanEdit": false,
    "CanDelete": false,
    "CanPrint": false
  },
  {
    "Title": "Pengajuan",
    "MenuAccessID": 4,
    "MenuID": 5,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": true,
    "CanEdit": true,
    "CanDelete": true,
    "CanPrint": true
  },
  {
    "Title": "Daftar Pengajuan",
    "MenuAccessID": 13,
    "MenuID": 6,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": true,
    "CanEdit": true,
    "CanDelete": true,
    "CanPrint": false
  },
  {
    "Title": "Detail/:id",
    "MenuAccessID": 14,
    "MenuID": 7,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": true,
    "CanEdit": true,
    "CanDelete": true,
    "CanPrint": true
  },
  {
    "Title": "Lampiran",
    "MenuAccessID": 17,
    "MenuID": 8,
    "AccessID": 1,
    "CanRead": true,
    "CanAdd": true,
    "CanEdit": true,
    "CanDelete": true,
    "CanPrint": true
  }
];


const RoleCard = () => {
  const [listRoleDetail, setListRoleDetail] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const UserRoleCard = ({ role, totalUsers, users }) => {
    return (
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack>
            <Typography variant="body2" color="textSecondary">
              Total {totalUsers} users
            </Typography>
  
            <Stack
              direction="row"
              spacing={-1}
              sx={{ marginTop: 1, marginBottom: 1, minWidth: "max-content" }}
            >
              {users.slice(0, 4).map((user, index) => (
                <Avatar
                  key={index}
                  src={`data:image/jpeg;base64,${user}`}
                  sx={{ width: 32, height: 32, border: "2px solid white" }}
                />
              ))}
              {users.length > 4 && (
                <Badge
                  badgeContent={`+${users.length - 4}`}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      right: -15,
                      top: 20,
                      backgroundColor: "transparent",
                      color: "black",
                    },
                  }}
                />
              )}
            </Stack>
          </Stack>
  
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {role}
          </Typography>
  
          <Button
            sx={{ fontSize: "0.875rem", padding:0 }}
            onClick={handleOpen}
          >
            Edit Menu Access
          </Button>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListRoleDetail();
        setListRoleDetail(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {listRoleDetail.map((roleData, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ padding: 0 }}>
            <UserRoleCard
              role={roleData.Role}
              totalUsers={roleData.TotalUser}
              users={roleData.users}
            />
          </Grid>
        ))}
      </Grid>
      <EditMenuAccessModal open={open} handleClose={handleClose} permissionsData={permissionsData} />
    </Box>

  );
};

export default RoleCard;

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
import { getListRoleDetail, getMenuAccessDetail } from "../../../service/Static.Service";
import EditMenuAccessModal from "./EditMenuAccessModal";

const RoleCard = () => {
  const [listRoleDetail, setListRoleDetail] = useState([]);
  const [menuAccess, setMenuAccess] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = async (accessId) => {
    const data = await getMenuAccessDetail(accessId);
    setMenuAccess(data);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const UserRoleCard = ({ accessId, role, totalUsers, users }) => {
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
            sx={{ padding:0, textTransform:'none' }}
            onClick={() => handleOpen(accessId)} 
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
              accessId={roleData.AccessID}
              role={roleData.Role}
              totalUsers={roleData.TotalUser}
              users={roleData.users}
            />
          </Grid>
        ))}
      </Grid>
      <EditMenuAccessModal open={open} handleClose={handleClose} menuAccess={menuAccess} />
    </Box>

  );
};

export default RoleCard;

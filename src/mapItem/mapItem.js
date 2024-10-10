import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import ListSubmission from "../pages/menu/Submission/ListSubmission";
import Submission from "../pages/menu/Submission/Submission";


export const iconsMap = {
    "<SegmentOutlinedIcon />" : <SegmentOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<DashboardOutlinedIcon />" : <DashboardOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<GroupsOutlinedIcon />" : <GroupsOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<InfoOutlinedIcon />" : <InfoOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<DescriptionOutlinedIcon />" : <DescriptionOutlinedIcon sx={{fontSize:'1.7rem'}}/>
  };
  
  export const componentsMap = {
    "<ListSubmission />" : ListSubmission,
    "<Submission />" : Submission
  };
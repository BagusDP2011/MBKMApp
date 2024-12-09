import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import SubmissionApproval from "../pages/menu/Submission/SubmissionApproval";
import Submission from "../pages/menu/Submission/Submission";
import DetailSubmission from "../pages/menu/Submission/DetailSubmission";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentSubmission from "../pages/menu/Submission/AttachmentSubmission";
import SubmissionInformation from "../pages/menu/Submission/SubmissionInformation";
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RolePermissions from "../pages/menu/RolePermissions/RolePermissions";
import SubmissionStatus from "../pages/menu/Submission/SubmissionStatus";
import Dashboard from "../pages/menu/Dashboard/Dashboard";

export const iconsMap = {
    "<SegmentOutlinedIcon />" : <SegmentOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<DashboardOutlinedIcon />" : <DashboardOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<GroupsOutlinedIcon />" : <GroupsOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<InfoOutlinedIcon />" : <InfoOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<DescriptionOutlinedIcon />" : <DescriptionOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<AttachFileIcon />" : <AttachFileIcon sx={{fontSize:'1.7rem'}}/>,
    "<HttpsOutlinedIcon />" : <HttpsOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    // "<FiberManualRecordOutlinedIcon />" : <FiberManualRecordOutlinedIcon sx={{fontSize:'1.2rem'}}/>,
  };
  
  export const componentsMap = {
    "<SubmissionApproval />" : SubmissionApproval,
    "<SubmissionStatus />" : SubmissionStatus,
    "<Submission />" : Submission,
    "<DetailSubmission />" : DetailSubmission,
    "<AttachmentSubmission />" : AttachmentSubmission,
    "<SubmissionInformation />" : SubmissionInformation,
    "<RolePermissions />" : RolePermissions,
    "<Dashboard />": Dashboard
  };
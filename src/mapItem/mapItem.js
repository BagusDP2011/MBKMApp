// Icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

// Page submissions
import ListSubmission from "../pages/menu/Submission/ListSubmission";
import Submission from "../pages/menu/Submission/Submission";
import PengajuanMHS from "../pages/menu/PengajuanMHS";
import DetailSubmission from "../pages/menu/Submission/DetailSubmission";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentSubmission from "../pages/menu/Submission/AttachmentSubmission";
import SubmissionInformation from "../pages/menu/Submission/SubmissionInformation";

// Page profile
import Profile from "../pages/menu/Profile/Profile";
import ProfileMenu from "../pages/menu/Profile/ProfileMenu";
import ProfileBank from "../pages/menu/Profile/ProfileBank";
import ProfileEditContact from "../pages/menu/Profile/ProfileEditContact";
import ProfileEditPrivate from "../pages/menu/Profile/ProfileEditPrivate";
import ProfileEmergency from "../pages/menu/Profile/ProfileEmergency";
import ProfileSocialMedia from "../pages/menu/Profile/ProfileSocialMedia";

export const iconsMap = {
    "<SegmentOutlinedIcon />" : <SegmentOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<DashboardOutlinedIcon />" : <DashboardOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<GroupsOutlinedIcon />" : <GroupsOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<InfoOutlinedIcon />" : <InfoOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<DescriptionOutlinedIcon />" : <DescriptionOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<LocalLibraryIcon />" : <LocalLibraryIcon sx={{fontSize:'1.7rem'}}/>,
    "<AttachFileIcon />" : <AttachFileIcon sx={{fontSize:'1.7rem'}}/>,
    "<AccountBalanceWalletOutlinedIcon />" : <AccountBalanceWalletOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<AccessibilityNewOutlinedIcon />" : <AccessibilityNewOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<AddIcCallOutlinedIcon />" : <AddIcCallOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<EmergencyOutlinedIcon />" : <EmergencyOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<ConnectWithoutContactOutlinedIcon />" : <ConnectWithoutContactOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    "<AccountBoxOutlinedIcon />" : <AccountBoxOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
  };
  
  export const componentsMap = {
    "<ListSubmission />" : ListSubmission,
    "<Submission />" : Submission,
    "<PengajuanMHS />" : PengajuanMHS,
    "<DetailSubmission />" : DetailSubmission,
    "<AttachmentSubmission />" : AttachmentSubmission,
    "<SubmissionInformation />" : SubmissionInformation,
    "<Profile />" : Profile,
    "<ProfileMenu />" : ProfileMenu,
    "<ProfileEditPrivate />" : ProfileEditPrivate,
    "<ProfileEditContact />" : ProfileEditContact,
    "<ProfileEmergency />" : ProfileEmergency,
    "<ProfileSocialMedia />" : ProfileSocialMedia,
    "<ProfileBank />" : ProfileBank,
  };
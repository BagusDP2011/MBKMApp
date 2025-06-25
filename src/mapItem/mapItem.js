// Icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import SubmissionApproval from "../pages/menu/Submission/SubmissionApproval";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PrintIcon from '@mui/icons-material/Print';

// Page general
import DashboardMentorship from "../pages/menu/Dashboard/DashboardMentorship";

// Page submissions
import Submission from "../pages/menu/Submission/Submission";
import PengajuanMHS from "../pages/menu/PengajuanMHS";
import DetailSubmission from "../pages/menu/Submission/DetailSubmission";
import AttachmentSubmission from "../pages/menu/Submission/AttachmentSubmission";
import SubmissionInformation from "../pages/menu/Submission/SubmissionInformation";
import SubmissionMentorship from "../pages/menu/Submission/SubmissionMentorship";

// Page profile
import Profile from "../pages/menu/Profile/Profile";
import ProfileMenu from "../pages/menu/Profile/ProfileMenu";
import ProfileBank from "../pages/menu/Profile/ProfileBank";
import ProfileEditContact from "../pages/menu/Profile/ProfileEditContact";
import ProfileEditPrivate from "../pages/menu/Profile/ProfileEditPrivate";
import ProfileEmergency from "../pages/menu/Profile/ProfileEmergency";
import ProfileSocialMedia from "../pages/menu/Profile/ProfileSocialMedia";
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RolePermissions from "../pages/menu/RolePermissions/RolePermissions";
import SubmissionStatus from "../pages/menu/Submission/SubmissionStatus";
import Dashboard from "../pages/menu/Dashboard/Dashboard";
import InformasiMHS from '../pages/menu/Dashboard/InformasiMHS'

//Page Logbook
import Logbook from "../pages/menu/Logbook/Logbook";

//Page Laporan Akhir
import Kuisioner from "../pages/menu/Logbook/Kuisioner";
import LaporanAkhirStatus from "../pages/menu/Logbook/LaporanAkhirStatus";

//Page konversi
import Konversi from "../pages/menu/Konversi/Konversi";
import KonversiMurid from "../pages/menu/Konversi/KonversiMurid";
import LaporanAkhirNonMurid from "../pages/menu/Konversi/LaporanAkhirNonMurid";
import LAPilihMurid from "../pages/menu/Konversi/LAPilihMurid";

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
    "<HttpsOutlinedIcon />" : <HttpsOutlinedIcon sx={{fontSize:'1.7rem'}}/>,
    // "<FiberManualRecordOutlinedIcon />" : <FiberManualRecordOutlinedIcon sx={{fontSize:'1.2rem'}}/>,
    "<MenuBookIcon />" : <MenuBookIcon sx={{fontSize:'1.7rem'}}/>,
    "<PrintIcon />" : <PrintIcon sx={{fontSize:'1.7rem'}}/>,
  };
  
  export const componentsMap = {
    "<DashboardTU />":  Dashboard,
    "<DashboardMentorship />":  DashboardMentorship,
    "<SubmissionApproval />" : SubmissionApproval,
    "<SubmissionStatus />" : SubmissionStatus,
    "<SubmissionMentorship />" : SubmissionMentorship,
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
    "<Dashboard />" : Dashboard,
    "<RolePermissions />" : RolePermissions,
    "<InformasiMHS />": InformasiMHS,
    "<Logbook />" : Logbook,
    "<Kuisioner />" : Kuisioner,
    "<LaporanAkhirStatus />" : LaporanAkhirStatus,
    "<Konversi />" : Konversi,
    "<KonversiMurid />" : KonversiMurid,
    "<LaporanAkhirNonMurid />" : LaporanAkhirNonMurid,
    "<LAPilihMurid />" : LAPilihMurid,
  };
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventIcon from "@mui/icons-material/Event";
const SidebarSections = [
  {
    section: "Profile",
    icon: <AccountBoxIcon />,
    link: "/profile",
  },
  {
    section: "Blogs",
    icon: <BookIcon />,
    link: "/blogs",
  },
  {
    section: "Article",
    icon: <ArticleIcon />,
    link: "/articles",
  },
  {
    section: "Services",
    icon: <MiscellaneousServicesIcon />,
    link: "/services",
  },
  {
    section: "Tags",
    icon: <ArticleIcon />,
    link: "/tags",
  },
  {
    section: "Gallery",
    icon: <ArticleIcon />,
    link: "/gallery",
  },
  {
    section: "Message",
    icon: <ArticleIcon />,
    link: "/message",
  },
  {
    section: "Event",
    icon: <EventIcon />,
    link: "/event",
  },
];

export default SidebarSections;

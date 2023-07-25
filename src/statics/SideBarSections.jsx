import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
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
    section: "Tags",
    icon: <ArticleIcon />,
    link: "/tags",
  },
  {
    section: "Gallery",
    icon: <ArticleIcon />,
    link: "/gallery",
  }
];

export default SidebarSections;

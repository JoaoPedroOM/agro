import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { MdSpaceDashboard } from "react-icons/md";
import { SiOrganicmaps } from "react-icons/si";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/Sidebar";

const Logo = () => (
  <div className="text-left py-4 flex items-center">
    <h2 className="text-3xl font-second font-bold text-transparent bg-clip-text bg-gradient-to-t from-green-800 to-green-400">
      Agro m²
    </h2>
  </div>
);

const LogoIcon = () => (
  <div className="text-center py-4">
    <h2 className="text-3xl font-second font-bold text-transparent bg-clip-text bg-gradient-to-t from-green-800 to-green-400">
      A
    </h2>
  </div>
);

interface SidebarMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarMenu({ open, setOpen }: SidebarMenuProps) {
  const { user } = useUser();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <MdSpaceDashboard size={25} color="black" />,
    },
    {
      label: "Mapas",
      href: "/mapa",
      icon: <SiOrganicmaps size={25} color="black" />,
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between lg:gap-10 gap-2">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="lg:mt-8 mt-2 flex flex-col gap-2 font-semibold font-second">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 font-semibold text-gray-400">
          <SignedIn>
            <UserButton />
          </SignedIn>
          {open && user?.firstName && (
            <span className="text-black font-second">{user.firstName}</span>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

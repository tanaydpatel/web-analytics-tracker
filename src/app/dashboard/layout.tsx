"use client";

import {
  FC,
  ForwardRefExoticComponent,
  PropsWithChildren,
  SVGProps,
  useState,
} from "react";

import {
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  FolderIcon,
  FunnelIcon,
  HomeIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
export default function DashboardLayout({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarOptions = [
    { icon: HomeIcon, name: "Overview" },
    { icon: FunnelIcon, name: "Funnels" },
    { icon: RectangleGroupIcon, name: "Leads" },
    { icon: FolderIcon, name: "Segments" },
    { icon: ArrowPathRoundedSquareIcon, name: "Workflows" },
    { icon: SquaresPlusIcon, name: "Integrations" },
    { icon: Cog6ToothIcon, name: "Settings" },
  ];

  return (
    <>
      <aside
        id="logo-sidebar"
        className="z-1 bg-bg-light-gray fixed left-0 top-0 h-screen w-64 -translate-x-full px-5 py-6 transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <a href="https://www.tanaypatel.dev">
            <img
              src="/logo.svg"
              className="me-3 h-6 sm:h-7"
              alt="Surface Labs Logo"
            />
          </a>
          <hr className="my-4 border-t border-gray-300" />
          <button className="text-text-black m-0 flex flex-row items-center justify-between px-4 text-base font-semibold">
            <div className="flex flex-row items-center">
              <UserIcon className="text-text-black h-4 w-4" />{" "}
              <span className="ml-3 inline-block">My workspace</span>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>
          <hr className="my-4 border-t border-gray-300" />
          <button className="flex-column flex h-10 w-full items-center rounded-md bg-[#383f50] px-4">
            <PlayCircleIcon className="h-5 w-5 text-white" />{" "}
            <p className="ml-3 text-base text-white"> Getting Started</p>
          </button>
          <hr className="my-4 border-t border-gray-300" />
          {sidebarOptions.map(({ icon, name }) => (
            <SidebarOption icon={icon} name={name} key={name} />
          ))}
        </div>
      </aside>

      <div className="px-14 py-8 sm:ml-64">
        <div className="flex-1 overflow-auto">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

interface SidebarOptionProps {
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  name: string;
}

const SidebarOption: FC<SidebarOptionProps> = ({ icon: Icon, name }) => {
  return (
    <button className="mb-5 flex flex-row items-center px-4">
      <Icon className="text-text-light-gray h-5 w-5" />{" "}
      <span className="text-text-light-gray ml-3 inline-block">{name}</span>
    </button>
  );
};

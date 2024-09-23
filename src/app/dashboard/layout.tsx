"use client";

import {
  type FC,
  type ForwardRefExoticComponent,
  type PropsWithChildren,
  type SVGProps,
  useState,
} from "react";

import {
  ArrowPathRoundedSquareIcon,
  Bars3BottomLeftIcon,
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  FolderIcon,
  FunnelIcon,
  HomeIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
export default function DashboardLayout({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // for mobile sidebar
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
      <button
        onClick={toggleSidebar}
        className="absolute left-3 top-9 sm:hidden"
      >
        <Bars3BottomLeftIcon className="h-8 w-8 text-gray-500" />
      </button>
      <aside
        id="logo-sidebar"
        className={`z-1 xs:w-full fixed left-0 top-0 h-screen w-[281px] -translate-x-full rounded-[0px_20px_20px_0px] bg-bg-light-gray px-5 py-6 shadow-[0px_2px_3px_5px_#e8e8e8] transition-transform sm:translate-x-0 ${isCollapsed ? "" : "translate-x-0"}`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex flex-row justify-between">
              <a href="https://www.tanaypatel.dev">
                <img
                  src="/logo.svg"
                  className="me-3 h-6 sm:h-7"
                  alt="Surface Labs Logo"
                />
              </a>
              <button onClick={toggleSidebar} className="ml-12 sm:hidden">
                <XMarkIcon className="h-8 w-8 text-gray-500" />
              </button>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <button className="m-0 flex flex-row items-center justify-between px-4 text-base font-semibold text-text-black">
              <div className="flex flex-row items-center">
                <UserIcon className="h-4 w-4 text-text-black" />{" "}
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
          <div className="flex items-center rounded-lg">
            <div className="h-12 w-12 overflow-hidden rounded-[25px] bg-white bg-[url('https://www.tanaypatel.dev/profile.jpeg')] bg-cover bg-center bg-no-repeat" />
            <div className="ml-3 flex w-full flex-1 items-center gap-3">
              <div className="flex w-full flex-1 flex-col items-start">
                <p className="text-base font-medium leading-6 tracking-[0.2px] text-[#383f50]">
                  Tanay Patel
                </p>
                <small className="text-xs font-medium leading-4 text-[#6c7385]">
                  me@tanaypatel.dev
                </small>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="px-4 py-8 sm:ml-[281px] sm:px-14">
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
      <Icon className="h-5 w-5 text-text-light-gray" />{" "}
      <span className="ml-3 inline-block text-text-light-gray">{name}</span>
    </button>
  );
};

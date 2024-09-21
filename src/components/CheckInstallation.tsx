import React from "react";
import Button from "./Button";
import { TEST_STAGE } from "~/constants";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

interface CheckInstallationProps {
  status: string;
  handleConnectionTest: () => void;
  isLoading: boolean;
}

const CheckInstallation: React.FC<CheckInstallationProps> = ({
  status,
  handleConnectionTest,
  isLoading,
}) => {
  return (
    <>
      {status === TEST_STAGE.SUCCESS && (
        <div className="mt-5 flex w-full flex-row items-center justify-start bg-green-100 px-2 py-1.5">
          <CheckCircleIcon className="h-4 w-4 text-green-600" />
          <p className="ml-2 text-sm">Connected successfully!</p>
        </div>
      )}
      {(status === TEST_STAGE.LOADING || isLoading) && (
        <div className="mt-5 flex w-full flex-row items-center justify-start bg-blue-100 px-2 py-1.5">
          <InformationCircleIcon className="h-4 w-4 text-blue-600" />
          <p className="ml-2 text-sm">Checking for tag...</p>
        </div>
      )}
      {status === TEST_STAGE.FAILED && (
        <div className="mt-5 flex w-full flex-row items-center justify-start bg-red-100 px-2 py-1.5">
          <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
          <div className="ml-4">
            <p className="text-black-900 text-lg">
              We couldn&apos;t detect the Surface Tag on your website. Please
              ensure the snippet is added correctly.{" "}
            </p>
            <ul className="ml-4 list-disc text-sm text-[#656565]">
              <li>
                Recheck the code snippet to ensure it&apos;s correctly placed
                before the closing <code>&lt;/head&gt;</code> tag.
              </li>
              <li>
                Ensure there are no blockers (like ad blockers) preventing the
                script from running.
              </li>
              <li>Try again once you&apos;ve made the corrections.</li>
            </ul>
          </div>
        </div>
      )}
      <div className="mt-5 flex w-full flex-row justify-end">
        <Button
          onClick={handleConnectionTest}
          isDisabled={isLoading}
          label={
            [TEST_STAGE.START, TEST_STAGE.LOADING].includes(status)
              ? "Test connection"
              : "Try again"
          }
        />
      </div>
    </>
  );
};

export default CheckInstallation;

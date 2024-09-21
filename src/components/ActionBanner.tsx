"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { STATUS } from "~/constants";

interface ActionBannerProps {
  title: string;
  subTitle: string;
  buttonLabel: string;
  status: "pending" | "error" | "completed";
  isDisabled: boolean;
  isExpanded: boolean;
  handleExpand: () => void;
}

const ActionBanner: React.FC<ActionBannerProps> = ({
  title,
  subTitle,
  buttonLabel,
  status = STATUS.PENDING,
  isDisabled = true,
  isExpanded = false,
  handleExpand,
}) => {
  return (
    <div className="mb-8 flex h-[92px] w-full flex-row items-start justify-between gap-6 rounded-lg border-2 border-[#ebedf3] px-6 shadow-[2px_2px_4px_3px_rgba(0,0,0,0.03)]">
      <div className="flex h-full flex-row">
        <div className="flex h-full flex-col items-center justify-center">
          {status === "error" && (
            <ExclamationCircleIcon className="h-8 w-8 text-red-600" />
          )}
          {status === "pending" && (
            <CheckCircleIcon className="h-8 w-8 text-gray-300" />
          )}
          {status === "completed" && (
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          )}
        </div>
        <div className="ml-6 flex h-full flex-col items-start justify-center">
          <p className="text-lg font-medium text-black">{title}</p>
          <p className="text-text-light-gray text-base leading-5 tracking-[1px]">
            {subTitle}
          </p>
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <Button
          isDisabled={isDisabled}
          label={buttonLabel}
          onClick={handleExpand}
        />
      </div>
    </div>
  );
};
export default ActionBanner;

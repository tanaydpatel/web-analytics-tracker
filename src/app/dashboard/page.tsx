"use client";

import React, { useState } from "react";
import ActionBanner from "~/components/ActionBanner";
import CheckInstallation from "~/components/CheckInstallation";
import InstallationSnippet from "~/components/InstallationSnippet";
import { STEP } from "~/constants";

type Props = {
  name: string;
};

const Page: React.FC<Props> = ({ name }) => {
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const handleCurrentStep = (step: string) => {
    return () => {
      setCurrentStep(step);
    };
  };

  return (
    <div>
      <h1 className="text-text-black text-[32px] font-semibold leading-9">
        Getting started
      </h1>
      <hr className="mb-10 mt-3 border-t border-gray-300" />
      <ActionBanner
        title="Install Surface Tag on your site"
        subTitle="Enable tracking and analytics."
        buttonLabel="Install tag"
        status="completed"
        isDisabled={false}
        isExpanded={currentStep === STEP.INSTALL}
        handleExpand={handleCurrentStep(STEP.INSTALL)}
      >
        <InstallationSnippet userId="tanaydpatel" />
        <CheckInstallation />
      </ActionBanner>
      <ActionBanner
        title="Test Surface Tag Events"
        subTitle="Test if the Surface Tag is properly emitting events."
        buttonLabel="Test tag"
        status="pending"
        isDisabled={true}
        isExpanded={currentStep === STEP.TEST}
        handleExpand={handleCurrentStep(STEP.TEST)}
      />
    </div>
  );
};

export default Page;

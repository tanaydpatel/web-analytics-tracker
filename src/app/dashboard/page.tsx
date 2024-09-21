"use client";

import React, { useState } from "react";
import ActionBanner from "~/components/ActionBanner";
import CheckInstallation from "~/components/CheckInstallation";
import InstallationSnippet from "~/components/InstallationSnippet";
import TestIncomingEvents from "~/components/TestIncomingEvents";
import { STEP, TEST_STAGE } from "~/constants";

type Props = {
  name: string;
};

const OnboardingSteps: React.FC<Props> = ({ name }) => {
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const handleCurrentStep = (step: string) => {
    return () => {
      setCurrentStep(step);
    };
  };

  return (
    <div>
      <h1 className="text-[32px] font-semibold leading-9 text-text-black">
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
        <CheckInstallation
          status={TEST_STAGE.FAILED}
          handleConnectionTest={() => {
            alert("test");
          }}
          isLoading={false}
        />
      </ActionBanner>
      <ActionBanner
        title="Test Surface Tag Events"
        subTitle="Test if the Surface Tag is properly emitting events."
        buttonLabel="Test tag"
        status="pending"
        isDisabled={false}
        isExpanded={currentStep === STEP.TEST}
        handleExpand={handleCurrentStep(STEP.TEST)}
      >
        <TestIncomingEvents
          events={[
            {
              event: "Track",
              visitor: "37d272f6-877b-47c6-98e5-51561",
              metadata: "{}",
              createdAt: "9/15/2024, 5:08:56 PM",
            },
            {
              event: "Page",
              visitor: "e7ef515a-7a5b-4949-9f28-8ae34",
              metadata: '{"page_url": "https://withsurface.com/page-1"}',
              createdAt: "9/15/2024, 5:09:35 PM",
            },
            {
              event: "Identity",
              visitor: "42d467c8-3bd1-4519-9ae6-bfb0",
              metadata: '{"user_id": "42d467c8-3bd1-4519-9ae6-bfb00adcc01c"}',
              createdAt: "9/15/2024, 5:12:19 PM",
            },
            {
              event: "Click",
              visitor: "aa731c78-c4e0-4e4f-b515-65259",
              metadata: '{"element_id": "button-element"}',
              createdAt: "9/15/2024, 5:17:35 PM",
            },
          ]}
          handleEventTest={() => {
            alert("test");
          }}
          isLoading={false}
        />
      </ActionBanner>
    </div>
  );
};

export default OnboardingSteps;

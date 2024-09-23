/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */

"use client";

import React, { useEffect, useState } from "react";
import ActionBanner from "~/components/ActionBanner";
import CheckInstallation from "~/components/CheckInstallation";
import InstallationSnippet from "~/components/InstallationSnippet";
import TestIncomingEvents from "~/components/TestIncomingEvents";
import TrackingIdModal from "~/components/TrackingIdModal";
import { STATUS, STEP } from "~/constants";
import testInstallation from "../data/test-installation";
import { LogPayload } from "~/server/db/logs.service";
import getLogs from "../data/get-logs";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const OnboardingSteps: React.FC = () => {
  // take userinput as tracking id
  const [trackingId, setTrackingId] = useState<string>("");
  const [trackingIdModal, setTrackingIdModal] = useState<boolean>(true);

  // for onboarding step
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  // for testing installation
  const [isInstallationComplete, setIsInstallationComplete] =
    useState<boolean>(false);
  const [testStage, setTestStage] = useState<string>(STATUS.PENDING);

  // for testing tag events
  const [logStage, setLogStage] = useState(STATUS.PENDING);
  const [logs, setLogs] = useState<LogPayload[]>([]);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleTagTesting = () => {
    // do polling of logs endpoint
    // based on the timestamp of last fetched log
    // fetch logs after that timestamp
    let skip = 0;
    const retyring = 0;
    const fetchLogs = async () => {
      try {
        const response = await getLogs({
          trackingId,
          skip,
        });
        skip += response.length;
        if (response.length > 0) {
          setLogs((prevLogs) => [...prevLogs, ...response]);
        }
        if (retyring > 5 && pollingInterval) {
          clearInterval(pollingInterval);
        }
      } catch (error) {
        console.error("Failed to fetch logs", error);
      }
    };
    setPollingInterval(setInterval(fetchLogs, 5000));
  };

  const handleCurrentStep = (step: string) => {
    return () => {
      if (testStage === STATUS.COMPLETED && step === STEP.INSTALL) {
        setTestStage(STATUS.PENDING);
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setLogs([]);
        }
      }
      setCurrentStep(step);
    };
  };

  const handleInstallationTest = async () => {
    if (testStage === STATUS.PENDING || testStage === STATUS.ERROR) {
      setTestStage(STATUS.LOADING);
      const status = await testInstallation({ trackingId });
      if (status === true) {
        setTestStage(STATUS.COMPLETED);
      } else {
        setTestStage(STATUS.ERROR);
      }
    }
    if (testStage === STATUS.COMPLETED) {
      setIsInstallationComplete(true);
      setCurrentStep(null);
    }
  };

  useEffect(() => {
    if (logs.length && logStage === STATUS.PENDING) {
      setLogStage(STATUS.COMPLETED);
    }
  }, [logs]);

  return (
    <>
      <TrackingIdModal
        open={trackingIdModal}
        onClose={() => {
          if (trackingId) {
            setTrackingIdModal(false);
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTrackingId(e.target.value);
        }}
        trackingId={trackingId}
      />
      <div>
        <h1 className="text-[32px] font-semibold leading-9 text-text-black">
          Getting started
        </h1>
        {!!pollingInterval ? "asd" : "aaa"}
        <hr className="mb-10 mt-3 border-t border-gray-300" />
        <ActionBanner
          title="Install Surface Tag on your site"
          subTitle="Enable tracking and analytics."
          buttonLabel="Install tag"
          status={testStage}
          isDisabled={false}
          isExpanded={currentStep === STEP.INSTALL}
          handleExpand={handleCurrentStep(STEP.INSTALL)}
        >
          <InstallationSnippet trackingId={trackingId} />
          <CheckInstallation
            status={testStage}
            handleInstallationTest={handleInstallationTest}
            isLoading={false}
          />
        </ActionBanner>
        <ActionBanner
          title="Test Surface Tag Events"
          subTitle="Test if the Surface Tag is properly emitting events."
          buttonLabel="Test tag"
          status={logStage}
          isDisabled={!isInstallationComplete || logs.length > 0}
          isExpanded={currentStep === STEP.TEST}
          handleExpand={() => {
            handleCurrentStep(STEP.TEST)();
            handleTagTesting();
          }}
        >
          <TestIncomingEvents
            events={logs}
            handleEventTest={handleTagTesting}
            isLoading={!!pollingInterval}
          />
        </ActionBanner>
      </div>
      {testStage === STATUS.COMPLETED && logStage === STATUS.COMPLETED && (
        <div className="mt-20 flex w-full flex-row items-center justify-start bg-green-100 px-4 py-3">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
          <p className="bold ml-10">Connected successfully!</p>
        </div>
      )}
    </>
  );
};

export default OnboardingSteps;

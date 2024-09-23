import React from "react";
import Button from "./Button";
import { LogPayload } from "~/server/db/logs.service";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
interface TestIncomingEventsProps {
  events: LogPayload[];
  handleEventTest: () => void;
  isLoading: boolean;
}

const TestIncomingEvents: React.FC<TestIncomingEventsProps> = ({
  events,
  handleEventTest,
  isLoading,
}) => {
  return (
    <>
      {events.length ? (
        <div className="mt-5 h-[360px] overflow-x-auto rounded-lg border-2 border-[#EAECF0]">
          <table className="w-full overflow-y-scroll text-left text-[#667085]">
            <thead className="border-b border-[#EAECF0] text-base text-[#15171F]">
              <tr className="table-head">
                <th scope="col" className="w-32 px-3 py-2.5">
                  Event
                </th>
                <th scope="col" className="w-64 px-3 py-2.5">
                  Visitor
                </th>
                <th scope="col" className="w-[256px] px-3 py-2.5">
                  Metadata
                </th>
                <th scope="col" className="w-[211px] px-3 py-2.5">
                  Created at
                </th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event) => (
                <tr key={event.id} className="border-b border-[#EAECF0]">
                  <td scope="row" className="px-3 py-2.5 capitalize">
                    {event.type}
                  </td>
                  <td className="px-3 py-2.5">{event.userId}</td>
                  <td className="block w-[416px] overflow-x-hidden truncate px-3 py-2.5">
                    {JSON.stringify(event.data)}
                  </td>
                  <td className="px-3 py-2.5">
                    {new Date(event.timestamp).toLocaleString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-10 flex w-full flex-row items-center justify-start bg-blue-100 px-4 py-3">
          <InformationCircleIcon className="h-8 w-8 text-blue-600" />
          <p className="text ml-4">Checking for events...</p>
        </div>
      )}
      <div className="mt-5 flex w-full flex-row justify-end">
        <Button
          onClick={handleEventTest}
          isDisabled={isLoading}
          label="Test tag"
        />
      </div>
    </>
  );
};
export default TestIncomingEvents;

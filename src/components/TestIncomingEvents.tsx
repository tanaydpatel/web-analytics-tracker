import React from "react";
import Button from "./Button";

interface TestIncomingEventsProps {
  events: {
    event: string;
    visitor: string;
    metadata: string;
    createdAt: string;
  }[];
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
      <div className="mt-5 overflow-x-auto rounded-lg border-2 border-[#EAECF0]">
        <table className="w-full text-left text-sm text-[#667085]">
          <thead className="border-b border-[#EAECF0] text-base text-[#15171F]">
            <tr className="table-head">
              <th scope="col" className="text-semibold px-3 py-2.5">
                Event
              </th>
              <th scope="col" className="px-3 py-2.5">
                Visitor
              </th>
              <th scope="col" className="px-3 py-2.5">
                Metadata
              </th>
              <th scope="col" className="px-3 py-2.5">
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event) => (
              <tr key={event.createdAt} className="border-b border-[#EAECF0]">
                <td scope="row" className="px-3 py-2.5">
                  {event.event}
                </td>
                <td className="px-3 py-2.5">{event.visitor}</td>
                <td className="px-3 py-2.5">{event.metadata}</td>
                <td className="px-3 py-2.5">{event.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

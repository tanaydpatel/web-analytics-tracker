import React from "react";
import Button from "./Button";

type TrackingIdModalProps = {
  trackingId: string;
  open: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TrackingIdModal: React.FC<TrackingIdModalProps> = ({
  trackingId,
  onClose,
  onChange,
  open,
}) => {
  return (
    <div
      tabIndex={open ? 999 : -1}
      className={`fixed inset-0 z-50 h-[100%] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-600 bg-opacity-30 ${open ? "" : "hidden"}`}
    >
      <div
        style={{
          transform: "translateX(-50%)",
        }}
        className="absolute inset-x-2/4 inset-y-1/4 max-h-full w-full max-w-md p-4"
      >
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900">
              Set tracking ID
            </h3>
          </div>

          <div className="p-4 md:p-5">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="input"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Used for account identification
                </label>
                <input
                  value={trackingId}
                  onChange={onChange}
                  type="input"
                  name="input"
                  id="input"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="tanaydpatel"
                  required
                />
              </div>
              <Button
                onClick={onClose}
                label="Set tracking id"
                isDisabled={trackingId === ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrackingIdModal;

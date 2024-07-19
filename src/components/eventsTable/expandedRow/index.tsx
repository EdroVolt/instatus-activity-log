import { Event } from "@/types/event.type";
import { FC } from "react";

type ExpandedRowProps = {
  event: Event;
};

const ExpandedRow: FC<ExpandedRowProps> = ({ event }) => {
  return (
    <tr key={`${event.id}-details`} className="relative bg-white">
      <td colSpan={4}>
        <div className="ms-[-2%] w-[104%] px-14 py-8 border bg-white border-[#DFDFDF] rounded-xl shadow-sm">
          <div className="grid grid-cols-3 gap-4 z-20">
            <div>
              <h3 className="font-medium uppercase text-[17px] text-[#929292] pb-3">
                Actor
              </h3>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">Name:</span>{" "}
                <span className="col-span-3 text-sm">{event.actorName}</span>
              </p>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">Email:</span>{" "}
                <span className="col-span-3 text-sm">{event.targetName}</span>
              </p>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">ID:</span>{" "}
                <span className="col-span-3 text-sm">{event.actorId}</span>
              </p>
            </div>
            <div>
              <h3 className="font-medium uppercase text-[17px] text-[#929292] pb-3">
                Action
              </h3>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">Name:</span>{" "}
                <span className="col-span-3 text-sm">{event.action.name}</span>
              </p>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">Object:</span>{" "}
                {event.action.object}
              </p>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">ID:</span>{" "}
                <span className="col-span-3 text-sm">{event.action.id}</span>
              </p>
            </div>
            <div>
              <h3 className="font-medium uppercase text-[17px] text-[#929292] pb-3">
                Date
              </h3>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">Readable:</span>{" "}
                <span className="col-span-3 text-sm">
                  {new Date(event.occurredAt).toLocaleString()}
                </span>
              </p>
            </div>
            <div>
              <h3 className="font-medium uppercase text-[17px] text-[#929292] pb-3">
                Metadata
              </h3>
              {event.metadata &&
                Object.entries(event.metadata).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}
            </div>
            <div>
              <h3 className="font-medium uppercase text-[17px] text-[#929292] pb-3">
                Target
              </h3>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">Name:</span>{" "}
                <span className="col-span-3 text-sm">{event.targetName}</span>
              </p>
              <p className="grid grid-cols-4">
                <span className="text-sm text-[#929292]">ID:</span>{" "}
                <span className="col-span-3 text-sm">{event.targetId}</span>
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ExpandedRow;

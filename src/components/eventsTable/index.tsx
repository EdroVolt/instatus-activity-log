import { FC } from "react";
import BodyLoadingSkeleton from "./bodyLoadingSkeleton";
import { Event } from "@/types/event.type";
import Image from "next/image";
import ArrowRight from "@/../public/arrow-right.png";

type EventsTableProps = {
  pageSize: number;
  events: Event[];
  expandedRow: string | null;
  isFetchingData: boolean;
  isValidating: boolean;
  toggleExpandRow: Function;
};

const EventsTable: FC<EventsTableProps> = ({
  pageSize,
  events,
  expandedRow,
  toggleExpandRow,
  isFetchingData,
  isValidating,
}) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="text-start px-6 py-2 uppercase text-sm font-semibold text-[#616161]">
            Actor
          </th>
          <th className="text-start px-6 py-2 uppercase text-sm font-semibold text-[#616161]">
            Action
          </th>
          <th className="text-start px-6 py-2 uppercase text-sm font-semibold text-[#616161]">
            Date
          </th>
          <th className="text-start px-6 py-2 uppercase text-sm font-semibold text-[#616161]"></th>
        </tr>
      </thead>
      <tbody className="bg-white border-x border-[#f5f5f5]">
        {events.length > 0 ? (
          events.map((event) => (
            <>
              <tr
                key={event.id}
                className="hover:bg-[#FBFBFB] cursor-pointer"
                onClick={() => toggleExpandRow(event.id)}
              >
                <td className="py-2 px-6 flex items-center first:py-6">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-white mr-2">
                    {event.actorName.charAt(0).toUpperCase()}
                  </div>
                  <span>{event.targetName}</span>
                </td>
                <td className="py-2 px-6">{event.action.name}</td>
                <td className="py-2 px-6">
                  {new Date(event.occurredAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                <td className="py-2 px-6">
                  <Image src={ArrowRight} alt="arrow right icon" />
                </td>
              </tr>
              {expandedRow === event.id && (
                <tr key={`${event.id}-details`}>
                  <td colSpan={4} className="border-b bg-gray-50">
                    <div className="ms-[-3%] w-[106%] p-4 bg-gray-100 rounded-lg shadow-md">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-semibold">Actor</h3>
                          <p>Name: {event.actorName}</p>
                          <p>Email: {event.targetName}</p>
                          <p>ID: {event.actorId}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Action</h3>
                          <p>Name: {event.action.name}</p>
                          <p>Object: {event.action.object}</p>
                          <p>ID: {event.action.id}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Date</h3>
                          <p>
                            Readable:{" "}
                            {new Date(event.occurredAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Metadata</h3>
                          {event.metadata &&
                            Object.entries(event.metadata).map(
                              ([key, value]) => (
                                <p key={key}>
                                  {key}: {value}
                                </p>
                              )
                            )}
                        </div>
                        <div>
                          <h3 className="font-semibold">Target</h3>
                          <p>Name: {event.targetName}</p>
                          <p>ID: {event.targetId}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))
        ) : isFetchingData ? (
          <>
            {Array.from({ length: pageSize }).map((_, index) => (
              <BodyLoadingSkeleton key={index} />
            ))}
          </>
        ) : (
          <tr>
            <td
              colSpan={4}
              className="bg-gray-50 py-2 px-6 text-center text-gray-500"
            >
              Data Not Found!
            </td>
          </tr>
        )}

        {isValidating && events.length > 0 && (
          <>
            {Array.from({ length: pageSize }).map((_, index) => (
              <BodyLoadingSkeleton key={index} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default EventsTable;

"use client";
import { useState } from "react";
import { fetcher } from "../lib/fetcher";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "@/lib/hooks/useDebounce";
import BodyLoadingSkeleton from "@/components/eventsTable/bodyLoadingSkeleton";
import ArrowRight from "../../public/arrow-right.png";
import Image from "next/image";

interface Event {
  id: string;
  actorName: string;
  actorId: string;
  targetName: string;
  targetId: string;
  occurredAt: string;
  action: {
    id: string;
    object: string;
    name: string;
  };
  metadata: Record<string, string | undefined>;
}

interface EventResponse {
  events: Event[];
  totalCount: number;
  page: number;
  limit: number;
}

const PAGE_SIZE = 5;

const getKey = (
  pageIndex: number,
  previousPageData: EventResponse | null,
  search: string
) => {
  if (previousPageData && !previousPageData.events.length) return null; // reached the end
  return `/api/events?page=${
    pageIndex + 1
  }&limit=${PAGE_SIZE}&search=${search}`;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data, error, size, setSize, isValidating } =
    useSWRInfinite<EventResponse>(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, debouncedSearch),
      fetcher
    );

  if (error) return <div>Failed to load</div>;

  const events = data ? data.flatMap((page) => page.events) : [];
  const isReachingEnd =
    data &&
    data[data.length - 1] &&
    data[data.length - 1].events.length < PAGE_SIZE;

  const loadMore = () => {
    setSize(size + 1);
  };

  const toggleExpandRow = (eventId: string) => {
    setExpandedRow(expandedRow === eventId ? null : eventId);
  };

  return (
    <main className="min-h-screen p-24">
      <div className="bg-[#f5f5f5] rounded-lg shadow">
        <div className="p-4 pb-1">
          <input
            type="text"
            placeholder="Search name, email or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-[#E0E0DF] rounded-lg bg-transparent focus:outline-none"
          />
        </div>
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
            ) : !data ? (
              <>
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <BodyLoadingSkeleton key={index} />
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={4} className="bg-gray-50 py-2 px-6 text-center text-gray-500">
                  Data Not Found!
                </td>
              </tr>
            )}

            {isValidating && events.length > 0 && (
              <>
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <BodyLoadingSkeleton key={index} />
                ))}
              </>
            )}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="my-2 px-4 py-2 text-[#616161] rounded-lg font-semibold text-sm"
            disabled={isReachingEnd}
          >
            {isValidating ? "Loading..." : "LOAD MORE"}
          </button>
        </div>
      </div>
    </main>
  );
}

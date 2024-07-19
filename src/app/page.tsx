"use client";
import { useState } from "react";
import { fetcher } from "../lib/fetcher";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { EventResponse } from "@/types/action.type";
import EventsTable from "@/components/eventsTable";

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
        <EventsTable
          events={events}
          expandedRow={expandedRow}
          isFetchingData={!data}
          isValidating={isValidating}
          pageSize={PAGE_SIZE}
          toggleExpandRow={toggleExpandRow}
        />
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className={
              "my-2 px-4 py-2 text-[#616161] rounded-lg font-semibold text-sm disabled:cursor-not-allowed disabled:text-gray-400"
            }
            disabled={isReachingEnd}
          >
            {isValidating ? "Loading..." : "LOAD MORE"}
          </button>
        </div>
      </div>
    </main>
  );
}

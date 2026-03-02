import { Bookmark } from "@/types/bookmark"
import { useBookmarkContext } from "./BookmarkContext";
import { usePathname } from "next/dist/client/components/navigation";
import { SkeletonCard } from "@/components/layout/skeleton";


interface EmptyStateProps {
  bookmarks: Bookmark[];
  visibleBookmarks: boolean;
  isLoading: boolean;
}
export default function EmptyState({ bookmarks, visibleBookmarks, isLoading }: EmptyStateProps) {
  const pathname = usePathname();

  const { searchQuery, selectedId, setSelectedId } = useBookmarkContext();
  const hasBookmarks = bookmarks.length > 0;
  const hasSelectedTags = selectedId.length > 0 && visibleBookmarks;
  const hasSearchQuery = searchQuery.trim() !== "" && visibleBookmarks;
  const isHome = pathname === "/home";

  switch (true) {
    case isLoading:
      return <SkeletonCard />

    case !isLoading && !hasBookmarks:
      return (
        <div className="col-span-full flex flex-col items-center justify-center gap-4 text-set2 text-neutral-500 dark:text-neutral-100">{isHome ? "No bookmarks yet. Start by adding some!" : "Archive is empty."}</div>
      );

    case hasSelectedTags:
      return (
        <>
          <div className="col-span-full flex flex-col items-center justify-center gap-4 text-set2 text-neutral-500 dark:text-neutral-100">
            No bookmark matches the selected tag(s).
          </div>
          <button
            className="col-span-full self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setSelectedId([])}
          >
            Clear Tag Filters
          </button>
        </>
      );

    case hasSearchQuery:
      return (
        <div className="col-span-full flex flex-col items-center justify-center gap-4 text-set2 text-neutral-500 dark:text-neutral-100">
          No bookmark matches the search query.
        </div>
      );
      
    default:
      return null;
  }

}

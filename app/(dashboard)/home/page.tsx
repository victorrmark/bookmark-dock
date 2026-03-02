'use client'
import BookmarkCard from "@/components/layout/bookmarks-card";
import { useBookmark } from "@/hooks/useBookmark";
import { useMemo } from "react";
import { useBookmarkContext } from "../BookmarkContext";
import EmptyState from "@/app/(dashboard)/emptyState";
import { useUserContext } from "../UserContext";

export default function Home() {
  const { user } = useUserContext();
  const { data: bookmarks = [], isLoading } = useBookmark(user?.id);
  const { selectedId, searchQuery, sortBy } = useBookmarkContext();
  const visibleBookmarks = useMemo(() => {
    let result = bookmarks;

    //search
    if (searchQuery) {
      result = result?.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (selectedId.length > 0) {
    //   result = result.filter(b =>
    //     selectedId.every(tagId =>
    //       b.bookmark_tags.some(bt => bt.tags.id === tagId.id)
    //     )
    //   );
    // }

    if (selectedId.length > 0) {
      result = result.filter(b => {
        const tagIds = new Set(b.bookmark_tags.map(bt => bt.tags.id));
        return selectedId.every(selected => tagIds.has(Number(selected.id)));
      });

    }

    //display pinned bookmarks on top
    const pinned = result?.filter((bookmark) => bookmark.is_pinned);
    const unpinned = result?.filter((bookmark) => !bookmark.is_pinned);

    //sorting
    unpinned.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "lastVisited") {
        const timeA = a.last_visited ? new Date(a.last_visited).getTime() : 0;
        const timeB = b.last_visited ? new Date(b.last_visited).getTime() : 0;

        return timeB - timeA;
      }
      if (sortBy === "mostVisited") {
        return b.visit_count - a.visit_count;
      }
      return 0;

    })
    return [...pinned!, ...unpinned!]

  }, [bookmarks, selectedId, searchQuery, sortBy]);

  return (
    <>
      <EmptyState bookmarks={bookmarks} visibleBookmarks={visibleBookmarks.length === 0} isLoading={isLoading} />
      {visibleBookmarks?.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}

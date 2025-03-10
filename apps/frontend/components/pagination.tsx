import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  nextPage: string | null;
  previousPage: string | null;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  nextPage,
  previousPage,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const leftSide = Math.max(2, currentPage - 1);
    const rightSide = Math.min(totalPages - 1, currentPage + 1);

    if (leftSide > 2) {
      pages.push("ellipsis-left");
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (rightSide < totalPages - 1) {
      pages.push("ellipsis-right");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const getPageFromUrl = (url: string | null): number | null => {
    if (!url) return null;

    try {
      const urlObj = new URL(url);
      const pageParam = urlObj.searchParams.get("page");

      if (pageParam && !isNaN(Number(pageParam))) {
        return parseInt(pageParam, 10);
      }

      const match = url.match(/[?&]page=(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    } catch (error) {
      const match = url.match(/[?&]page=(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }
  };

  const prevPageNum = previousPage ? getPageFromUrl(previousPage) : null;
  const nextPageNum = nextPage ? getPageFromUrl(nextPage) : null;

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <Button variant="outline" size="icon" asChild disabled={!previousPage}>
        <Link href={prevPageNum ? `${basePath}?page=${prevPageNum}` : "#"}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {pageNumbers.map((page, index) => {
        if (typeof page === "string") {
          return (
            <div key={page} className="px-2">
              ...
            </div>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild={currentPage !== page}
          >
            {currentPage !== page ? (
              <Link href={`${basePath}?page=${page}`}>{page}</Link>
            ) : (
              <span>{page}</span>
            )}
          </Button>
        );
      })}

      <Button variant="outline" size="icon" asChild disabled={!nextPage}>
        <Link href={nextPageNum ? `${basePath}?page=${nextPageNum}` : "#"}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

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
  // Simplified page number generation
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    // For small number of pages, show all
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Calculate the range of pages to show around current page
    const leftSide = Math.max(2, currentPage - 1);
    const rightSide = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if needed on left side
    if (leftSide > 2) {
      pages.push("ellipsis-left");
    }

    // Add pages in the middle
    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed on right side
    if (rightSide < totalPages - 1) {
      pages.push("ellipsis-right");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Enhanced function to extract page number from URL
  const getPageFromUrl = (url: string | null): number | null => {
    if (!url) return null;

    try {
      // Create URL object for more robust parsing
      const urlObj = new URL(url);
      const pageParam = urlObj.searchParams.get("page");

      // Return the page number if it exists and is a valid number
      if (pageParam && !isNaN(Number(pageParam))) {
        return parseInt(pageParam, 10);
      }

      // Fallback to regex for URLs that might not be fully qualified
      const match = url.match(/[?&]page=(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    } catch (error) {
      // Fallback to regex if URL parsing fails
      const match = url.match(/[?&]page=(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }
  };

  const prevPageNum = previousPage ? getPageFromUrl(previousPage) : null;
  const nextPageNum = nextPage ? getPageFromUrl(nextPage) : null;

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Previous page button */}
      <Button variant="outline" size="icon" asChild disabled={!previousPage}>
        <Link href={prevPageNum ? `${basePath}?page=${prevPageNum}` : "#"}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        // Handle ellipsis
        if (typeof page === "string") {
          return (
            <div key={page} className="px-2">
              ...
            </div>
          );
        }

        // Handle number buttons
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

      {/* Next page button */}
      <Button variant="outline" size="icon" asChild disabled={!nextPage}>
        <Link href={nextPageNum ? `${basePath}?page=${nextPageNum}` : "#"}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Link>
      </Button>
    </div>
  );
}

import * as React from "react"
import {
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { type Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}


function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}


function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

  function PaginationLink({
    className,
    isActive,
    ...props
  }: PaginationLinkProps) {
    return (
      <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "px-4 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
          isActive
            ? "bg-[#FBFAF9] border-[#D7DEDA] text-[#6A7C73]"
            : "bg-[#FBFAF9] border-[#D7DEDA] text-[#6A7C73] hover:bg-[#EAF1ED]",
          className
        )}
        {...props}
      />
    )
  }
  

  function PaginationPrevious({
    className,
    ...props
  }: React.ComponentProps<typeof PaginationLink>) {
    return (
      <PaginationLink
        className={cn("gap-2 px-5", className)}
        {...props}
      >
        Previous
      </PaginationLink>
    )
  }
  

  function PaginationNext({
    className,
    ...props
  }: React.ComponentProps<typeof PaginationLink>) {
    return (
      <PaginationLink
        className={cn("gap-2 px-5", className)}
        {...props}
      >
        Next
      </PaginationLink>
    )
  }
  

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

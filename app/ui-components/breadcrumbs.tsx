"use client";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];
interface Props {
  listofLinks: {
    name: string | null | undefined;
    url: string | null;
    current?: boolean;
  }[];
}

export default function Breadcrumb({ listofLinks }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex ml-4">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {listofLinks.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-blue-400"
              />
              <a
                href={page.url!}
                aria-current={page.current ? "page" : undefined}
                className={cn(
                  page.current
                    ? "text-blue-400 hover:text-blue-500"
                    : "text-gray-400 hover:text-gray-500",
                  "ml-4 text-sm font-medium"
                )}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

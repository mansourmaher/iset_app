"use client";
import React, { useState } from "react";
import { CATEGORIES } from "@/lib/categ";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";
import IconComponent from "./icon-components";

interface Props {
  tags: string[];
}

function Categories({ tags }: Props) {
  const categories = CATEGORIES;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const cuurentTag = searchParams.get("tag");
  const [tag, setTag] = useState<string | null>(cuurentTag);
  const [category, setCategory] = useState<string | null>(currentCategory);

  const isSelected = (category: string) => {
    return currentCategory === category;
  };
  const isSelected2 = (category: string) => {
    return cuurentTag === category;
  };
  const onClick = (cate: string) => {
    setCategory(cate);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isSelected(cate) ? null : cate,
          tag: tag,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    setCategory(null);
  };
  const onClick2 = (cate: string) => {
    setTag(cate);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          tag: isSelected2(cate) ? null : cate,
          category: category,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    setTag(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold ">Explore by Categories</p>
        <span className="flex items-center gap-x-2">
          <p className="text-sm text-slate-500">
            There are {categories.length} categories to choose from to help you
            find the right training for you.
          </p>
        </span>
        <div className="flex items-center gap-x-2 overflow-auto pb-2 pt-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onClick(category.name)}
              className={cn(
                "py-2 px-6 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
                isSelected(category.name) &&
                  "border-sky-700 bg-sky-200/20 text-sky-700"
              )}
              type="button"
            >
              <IconComponent Icon={category.icon} />
              <div className="truncate"> {category.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold  ">
          Explore by Tags{" "}
          </p>
          <span className="text-sm text-slate-500 ">
            There are {tags.length} tags to choose from to help you find the
            right training for you.
          </span>
        
        <div className="flex items-center gap-x-2 overflow-auto pb-2 pt-4">
          {tags.map((category) => (
            <button
              key={category}
              onClick={() => onClick2(category)}
              className={cn(
                "py-2 px-6 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
                isSelected2(category) &&
                  "border-sky-700 bg-sky-200/20 text-sky-700"
              )}
              type="button"
            >
              <div className="truncate"> {category}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;

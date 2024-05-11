"use client";
import * as React from "react";
import cn from "@/libs/cn"
import { Popover } from "./popover";
import { Input } from "./input";
import { Search as IconSearch, ArrowDown, ChevronDown } from "lucide-react";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<SearchDropDown>;
  setResult: any;
  placeholder: string | undefined;
}

interface SearchDropDown {
  id: number;
  name: string;
}

const Search = React.forwardRef<HTMLDivElement, SearchProps>(
  ({ className, data, setResult, placeholder, children, ...props }, ref) => {
    const [isPopover, setIsPopover] = React.useState(false);
    const [dataSearch, setDataSearch] = React.useState<Array<SearchDropDown>>(
      []
    );
    const [search, setSearch] = React.useState("");

    const onChange = (e: any) => {
      let _search = e.target.value;
      setSearch(_search);
      let dataSearchtemp = data.filter((e: any) => {
        return e.name.search(_search) > -1;
      });
      setDataSearch(dataSearchtemp);
    };

    return (
      <>
        <div>
          <div className="relative"><IconSearch  className="absolute top-1 right-2 text-slate-500" /></div>
          <Input
            type="text"
            className={cn(
              "w-[500px] p-2 text-y-center border-0 ring-0 text-slate-700",
              className
            )}
            placeholder={placeholder ?? "Pencarian"}
            value={search}
            onFocus={() => setIsPopover(true)}
            onChange={onChange}
          />
        </div>
        <Popover
          isShow={isPopover}
          setIsShow={setIsPopover}
          className={cn("w-[500px] relative rounded-t-none -top-1", className)}
        >
          {dataSearch.length > 0 ? (
            <ul className="text-slate-700">
              {dataSearch.map((e: SearchDropDown) => {
                return (
                  <li
                    className="hover:bg-slate-200 w-full py-[5px] px-3  border-slate-300 border-b-[1px] cursor-pointer"
                    key={e.id}
                    onClick={() => {
                      setSearch(e.name);
                      setIsPopover(false);
                      setResult(e);
                    }}
                  >
                    {e.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="w-full py-[5px] px-3 bg-slate-300/30 text-slate-700">
              {search != "" ? "Tidak Ada Data" : "Masukkan Pencarian"}
            </div>
          )}
        </Popover>
      </>
    );
  }
);
Search.displayName = "Search";

export { Search };

export type { SearchDropDown };

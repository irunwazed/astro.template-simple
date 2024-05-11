import * as React from "react";
import cn from "@/libs/cn"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div>
    <table ref={ref} className={cn("w-full border-slate-300/40 border-[1px] border-b-2", className)} {...props} />
  </div>
));
Table.displayName = "Table";

const Thead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
Thead.displayName = "Thead";

const Tbody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
Tbody.displayName = "Tbody";

const Theadr = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(" bg-slate-300/90 ", className)}
    {...props}
  />
));
Theadr.displayName = "Theadr";

const Tr = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "odd:bg-white even:bg-slate-200/60  hover:bg-slate-300/60 text-slate-800/90 text-sm ",
      className
    )}
    {...props}
  />
));
Tr.displayName = "Tr";

const Th = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("py-4 px-5 text-slate-800/80", className)} {...props} />
));
Th.displayName = "Th";

const Td = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("py-4 px-5", className)} {...props} />
));
Td.displayName = "Td";

export { Table, Thead, Theadr, Tbody, Tr, Th, Td };

"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const styleClasses = {
  style1: {
    tabsList: "relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border",
    tabsTrigger: "overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none",
  },
  style2: {
    tabsList:"bg-transparent",
    tabsTrigger: "data-[state=active]:bg-muted data-[state=active]:shadow-none",
  },
  style3: {
    tabsList:"gap-1 bg-transparent",
    tabsTrigger: "rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none",
  },
  style4: {
    tabsList:"h-auto rounded-none border-b border-border bg-transparent p-0",
    tabsTrigger: "relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary",
  },
  style5: {
    tabsList:"h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground",
    tabsTrigger: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent",
  },
  style6: {
    tabsList:"h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse",
    tabsTrigger: "relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary",
  },
  style7: {
    tabsList:"mb-3",
    tabsTrigger: "",
  },
  style8: {
    tabsList:"mb-3 gap-1 bg-transparent",
    tabsTrigger: "rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none",
  },
  style9: {
    tabsList:"mx-auto flex max-w-xs bg-transparent",
    tabsTrigger: "group flex-1 flex-col p-3 text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none",
  },
  style10: {
    tabsList:"flex-col",
    tabsTrigger: "py-3",
  },
  style11: {
    tabsList:"flex-col rounded-none border-l border-border bg-transparent p-0",
    tabsTrigger: "relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary",
  },
  default: {
    tabsList: "bg-muted text-muted-foreground",
    tabsTrigger:
      "data-[state=active]:bg-background data-[state=active]:border-2 data-[state=active]:border-primary",
  },
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    onAddTab?: () => void;
    view?: string;
  }
>(({ className, onAddTab, view = "style1", ...props }, ref) => {
  const styles = styleClasses[view] || styleClasses.default;

  return (
    <div className="relative flex items-center space-x-2 w-full">
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "flex items-center space-x-2 rounded-lg p-1 overflow-x-auto",
          styles.tabsList,
          className
        )}
        {...props}
      />
      <div className="flex-shrink-0 z-10 relative"> {/* Aseguramos que el botón no quede oculto */}
        <button
          onClick={onAddTab}
          className="ml-2 h-9 w-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent text-muted-foreground"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
});


TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    onClose?: () => void;
    moveTab: (dragIndex: number, hoverIndex: number) => void;
    index: number;
    view?: string;
  }
>(({ className, onClose, moveTab, index, view = "style1", ...props }, ref) => {
  const styles = styleClasses[view] || styleClasses.default;

  const [, dragRef] = useDrag({
    type: "TAB",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "TAB",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTab(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="relative group flex items-center space-x-2"
    >
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex items-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          styles.tabsTrigger,
          className
        )}
        {...props}
      />
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "p-4 rounded-lg bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

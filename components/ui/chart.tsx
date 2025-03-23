import * as React from "react"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("relative", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

const Chart = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(({ className, ...props }, ref) => {
  return <svg viewBox="0 0 400 300" className={cn("h-full w-full", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "pointer-events-none absolute z-10 rounded-md border bg-popover p-2 text-sm font-medium text-popover-foreground shadow-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("font-normal", className)} ref={ref} {...props} />
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  layout: string;
  align: string;
  verticalAlign: string;
}>(({ className, layout, align, verticalAlign, ...props }, ref) => {
  return <div className={cn("flex flex-col space-y-1 text-sm", className)} ref={ref} {...props} />
})
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  name: string;
}>(({ className, name, color, ...props }, ref) => {
  return (
    <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props}>
      <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="font-medium">{props.children}</span>
    </div>
  )
})
ChartLegendItem.displayName = "ChartLegendItem"

const ChartBar = React.forwardRef<SVGGElement, React.SVGAttributes<SVGGElement> & {
  data: { name: string; value: number }[];
}>(({ className, data, ...props }, ref) => {
  return <g className={cn("", className)} ref={ref} {...props} />
})
ChartBar.displayName = "ChartBar"

const ChartBarItem = React.forwardRef<SVGRectElement, React.SVGAttributes<SVGRectElement> & {
  dataKey: string;
}>(({ className, dataKey, ...props }, ref) => {
  return <rect className={cn("", className)} ref={ref} {...props} />
})
ChartBarItem.displayName = "ChartBarItem"

const ChartPie = React.forwardRef<SVGGElement, React.SVGAttributes<SVGGElement> & {
  data: { name: string; value: number }[];
  dataKey: string;
  "data-namekey": string;
  outerRadius: number;
}>(({ className, data, dataKey, "data-namekey": nameKey, outerRadius, ...props }, ref) => {
  return <g className={cn("", className)} ref={ref} {...props} />
})
ChartPie.displayName = "ChartPie"

const ChartPieItem = React.forwardRef<SVGPathElement, React.SVGAttributes<SVGPathElement>>(
  ({ className, ...props }, ref) => {
    return <path className={cn("", className)} ref={ref} {...props} />
  },
)
ChartPieItem.displayName = "ChartPieItem"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartBar,
  ChartBarItem,
  ChartPie,
  ChartPieItem,
}


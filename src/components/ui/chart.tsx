"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue>({} as ChartContextValue)

export function ChartContainer({
  children,
  config,
}: {
  children: React.ReactNode
  config: ChartConfig
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className="h-[300px] w-full">{children}</div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
  }>
  label?: string
  content?: React.ReactNode
  cursor?: boolean
}

export function ChartTooltip({
  active,
  payload,
  label,
  content,
  cursor,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>
          <div
            className="absolute rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-md"
            style={{
              transform: "translate(-50%, -100%)",
            }}
          >
            {content ? (
              content
            ) : (
              <div>
                <div className="font-medium">{label}</div>
                {payload.map((item, i) => (
                  <div key={i}>
                    {item.name}: {item.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}

interface ChartTooltipContentProps {
  payload?: Array<{
    value: number
    name: string
  }>
  label?: string
  hideLabel?: boolean
}

export function ChartTooltipContent({
  payload,
  label,
  hideLabel = false,
}: ChartTooltipContentProps) {
  const { config } = React.useContext(ChartContext)

  if (!payload?.length) {
    return null
  }

  return (
    <div>
      {!hideLabel && <div className="font-medium">{label}</div>}
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: config[item.name]?.color }}
          />
          <div>
            {config[item.name]?.label}: {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
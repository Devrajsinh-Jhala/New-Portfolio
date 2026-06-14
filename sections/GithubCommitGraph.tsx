import { connection } from "next/server"

import { cn } from "@/lib/utils"

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"

const GITHUB_CONTRIBUTIONS_QUERY = `
  query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""] as const
const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
})
const tooltipDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
})
const legendCounts = [0, 1, 4, 8, 13] as const

type ContributionDay = {
  color?: string
  contributionCount: number
  date: string
}

type ContributionWeek = {
  contributionDays: ContributionDay[]
}

type GithubContributionState = {
  status: "ready" | "missing-env" | "error"
  username: string
  weeks: ContributionWeek[]
}

type GithubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks: ContributionWeek[]
        }
      }
    }
  }
  errors?: Array<{ message: string }>
}

function buildEmptyWeeks(): ContributionWeek[] {
  return Array.from({ length: 53 }, () => ({
    contributionDays: Array.from({ length: 7 }, () => ({
      contributionCount: 0,
      date: "",
    })),
  }))
}

function getDateRange() {
  const to = new Date()
  const from = new Date(to)

  from.setFullYear(to.getFullYear() - 1)

  return {
    from: from.toISOString(),
    to: to.toISOString(),
  }
}

function getMonthLabels(weeks: ContributionWeek[]) {
  let previousMonth = ""

  return weeks.map((week) => {
    const firstDay = week.contributionDays.find((day) => day.date)

    if (!firstDay) {
      return ""
    }

    const month = monthFormatter.format(new Date(`${firstDay.date}T00:00:00Z`))

    if (month === previousMonth) {
      return ""
    }

    previousMonth = month
    return month
  })
}

function getTotalContributions(weeks: ContributionWeek[]) {
  return weeks.reduce(
    (total, week) =>
      total +
      week.contributionDays.reduce(
        (weekTotal, day) => weekTotal + day.contributionCount,
        0
      ),
    0
  )
}

function getContributionTone(count: number) {
  if (count === 0) {
    return "color-mix(in oklch, var(--muted), var(--background) 45%)"
  }

  if (count < 4) {
    return "color-mix(in oklch, var(--foreground) 22%, var(--background))"
  }

  if (count < 8) {
    return "color-mix(in oklch, var(--foreground) 40%, var(--background))"
  }

  if (count < 13) {
    return "color-mix(in oklch, var(--foreground) 62%, var(--background))"
  }

  return "color-mix(in oklch, var(--foreground) 86%, var(--background))"
}

function getContributionLabel(day: ContributionDay) {
  if (!day.date) {
    return "No contribution data"
  }

  const contributionLabel =
    day.contributionCount === 1 ? "contribution" : "contributions"
  const formattedDate = tooltipDateFormatter.format(
    new Date(`${day.date}T00:00:00Z`)
  )

  return `${day.contributionCount.toLocaleString()} ${contributionLabel} on ${formattedDate}`
}

async function getGithubContributions(): Promise<GithubContributionState> {
  await connection()

  const username = process.env.GITHUB_USERNAME
  const token = process.env.GITHUB_TOKEN

  if (!username || !token) {
    return {
      status: "missing-env",
      username: username ?? "your-github-username",
      weeks: buildEmptyWeeks(),
    }
  }

  const { from, to } = getDateRange()

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      next: { revalidate: 60 * 60 },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_CONTRIBUTIONS_QUERY,
        variables: {
          username,
          from,
          to,
        },
      }),
    })

    if (!response.ok) {
      return {
        status: "error",
        username,
        weeks: buildEmptyWeeks(),
      }
    }

    const payload = (await response.json()) as GithubContributionsResponse
    const calendar =
      payload.data?.user?.contributionsCollection?.contributionCalendar

    if (!calendar || payload.errors?.length) {
      return {
        status: "error",
        username,
        weeks: buildEmptyWeeks(),
      }
    }

    return {
      status: "ready",
      username,
      weeks: calendar.weeks,
    }
  } catch {
    return {
      status: "error",
      username,
      weeks: buildEmptyWeeks(),
    }
  }
}

function ContributionSquare({ day }: { day: ContributionDay }) {
  const hasContributions = day.contributionCount > 0
  const label = getContributionLabel(day)

  return (
    <span
      aria-label={label}
      role="img"
      tabIndex={day.date ? 0 : -1}
      className={cn(
        "group/contribution relative size-3 rounded-[4px] ring-1 ring-foreground/5 transition-all duration-150 ring-inset hover:z-20 hover:scale-125 hover:ring-foreground/25 focus-visible:z-20 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none",
        !hasContributions && "shadow-inner shadow-foreground/[0.02]"
      )}
      style={{
        backgroundColor: getContributionTone(day.contributionCount),
        boxShadow: hasContributions
          ? "0 0 12px color-mix(in oklch, var(--foreground) 18%, transparent), inset 0 1px 0 rgb(255 255 255 / 0.14)"
          : undefined,
      }}
    >
      {day.date ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 rounded-md bg-popover px-2 py-1 text-xs font-medium whitespace-nowrap text-popover-foreground opacity-0 shadow-sm shadow-foreground/10 transition-opacity duration-150 group-hover/contribution:opacity-100 group-focus-visible/contribution:opacity-100"
        >
          {day.contributionCount.toLocaleString()} on{" "}
          {tooltipDateFormatter.format(new Date(`${day.date}T00:00:00Z`))}
        </span>
      ) : null}
    </span>
  )
}

function ContributionLegend() {
  return (
    <div className="flex items-center gap-1.5">
      <span>Less</span>
      <div className="flex items-center gap-1">
        {legendCounts.map((count) => (
          <span
            key={count}
            aria-hidden="true"
            className="size-3 rounded-[4px] ring-1 ring-foreground/5 ring-inset"
            style={{ backgroundColor: getContributionTone(count) }}
          />
        ))}
      </div>
      <span>More</span>
    </div>
  )
}

function ContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
  const monthLabels = getMonthLabels(weeks)
  const totalContributions = getTotalContributions(weeks)

  return (
    <div>
      <div className="overflow-x-auto overflow-y-hidden pb-2 lg:overflow-visible">
        <div className="min-w-max">
          <div
            className="ml-9 grid gap-1 pb-3 text-[10px] leading-none text-muted-foreground"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 0.75rem)`,
            }}
          >
            {monthLabels.map((month, index) => (
              <span
                key={`${month || "month"}-${index}`}
                className="h-3 whitespace-nowrap"
              >
                {month}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="grid w-6 grid-rows-7 gap-1 text-[10px] leading-none text-muted-foreground">
              {weekdayLabels.map((label, index) => (
                <span
                  key={`${label || "day"}-${index}`}
                  className="flex h-3 items-center"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.contributionDays.map((day, dayIndex) => (
                    <ContributionSquare
                      key={`${day.date || weekIndex}-${dayIndex}`}
                      day={day}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>
          {totalContributions.toLocaleString()} contributions this year
        </span>
        <ContributionLegend />
      </div>
    </div>
  )
}

function GithubCommitGraphSkeleton() {
  const weeks = buildEmptyWeeks()

  return (
    <section className="mx-auto w-full max-w-5xl py-7">
      <div className="rounded-lg border border-border/70 bg-card/75 p-4 shadow-sm shadow-foreground/5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <div className="h-5 w-36 rounded-md bg-muted" />
            <div className="mt-2 h-4 w-56 max-w-full rounded-md bg-muted" />
          </div>
          <div className="h-8 w-24 rounded-md bg-muted" />
        </div>

        <div className="rounded-md border border-border/60 bg-background/55 p-4">
          <div className="overflow-hidden pb-1">
            <div className="flex gap-1.5">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.contributionDays.map((_, dayIndex) => (
                    <span
                      key={`${weekIndex}-${dayIndex}`}
                      className="size-3 rounded-[4px] bg-muted"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="h-3 w-32 rounded-sm bg-muted" />
            <div className="h-3 w-28 rounded-sm bg-muted" />
          </div>
        </div>
      </div>
    </section>
  )
}

async function GithubCommitGraph() {
  const graph = await getGithubContributions()

  return (
    <section className="mx-auto w-full max-w-5xl py-7">
      <div className="rounded-lg border border-border/70 bg-card/75 p-4 shadow-sm shadow-foreground/5 backdrop-blur">
        {/* <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-normal text-foreground">
              GitHub activity
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          </div>

          <a
            href={`https://github.com/${graph.username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border/70 px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            @{graph.username}
          </a>
        </div> */}

        <div className="rounded-md border border-border/60 bg-background/55 p-4 shadow-inner shadow-foreground/[0.03]">
          <ContributionGraph weeks={graph.weeks} />
        </div>
      </div>
    </section>
  )
}

export { GithubCommitGraph, GithubCommitGraphSkeleton }

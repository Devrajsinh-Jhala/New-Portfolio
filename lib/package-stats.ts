import "server-only"

import { cache } from "react"

type PackageRegistry = "PyPI" | "npm"

type PackageDefinition = {
  projectSlug: string
  name: string
  registry: PackageRegistry
  registryUrl: string
  fallback: {
    version: string
    downloadsLastMonth: number
    lastPublished: string
  }
}

type PackageStats = {
  projectSlug: string
  name: string
  registry: PackageRegistry
  registryUrl: string
  version: string
  downloadsLastMonth: number
  lastPublished: string
  hasLiveMetadata: boolean
  hasLiveDownloads: boolean
}

type PyPIMetadataResponse = {
  info: {
    version?: string
  }
  releases: Record<
    string,
    Array<{
      upload_time_iso_8601?: string
    }>
  >
}

type PyPIRecentDownloadsResponse = {
  data?: {
    last_month?: number
  }
}

type NpmMetadataResponse = {
  "dist-tags"?: {
    latest?: string
  }
  time?: Record<string, string>
}

type NpmDownloadsResponse = {
  downloads?: number
}

const revalidateSeconds = 86_400

const packageDefinitions: PackageDefinition[] = [
  {
    projectSlug: "custom-dl-optimizer",
    name: "custom-dl-optimizer",
    registry: "PyPI",
    registryUrl: "https://pypi.org/project/custom-dl-optimizer/",
    fallback: {
      version: "3.0.0",
      downloadsLastMonth: 326,
      lastPublished: "2026-07-16",
    },
  },
  {
    projectSlug: "researchplot-venues",
    name: "researchplot-venues",
    registry: "PyPI",
    registryUrl: "https://pypi.org/project/researchplot-venues/",
    fallback: {
      version: "2.0.0",
      downloadsLastMonth: 425,
      lastPublished: "2026-08-13",
    },
  },
  {
    projectSlug: "npx-vibe",
    name: "npx-vibe",
    registry: "npm",
    registryUrl: "https://www.npmjs.com/package/npx-vibe",
    fallback: {
      version: "1.5.1",
      downloadsLastMonth: 794,
      lastPublished: "2026-07-13",
    },
  },
]

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: revalidateSeconds,
    },
  })

  if (!response.ok) {
    throw new Error(`Package data request failed with ${response.status}`)
  }

  return (await response.json()) as T
}

function getPyPILastPublished(metadata: PyPIMetadataResponse, version: string) {
  const uploadTimes = (metadata.releases[version] ?? [])
    .map((release) => release.upload_time_iso_8601)
    .filter((value): value is string => Boolean(value))
    .sort()

  return uploadTimes.at(-1)?.slice(0, 10)
}

async function getPyPIStats(
  definition: PackageDefinition
): Promise<PackageStats> {
  const [metadataResult, downloadsResult] = await Promise.allSettled([
    fetchJson<PyPIMetadataResponse>(
      `https://pypi.org/pypi/${definition.name}/json`
    ),
    fetchJson<PyPIRecentDownloadsResponse>(
      `https://pypistats.org/api/packages/${definition.name}/recent`
    ),
  ])

  const liveVersion =
    metadataResult.status === "fulfilled"
      ? metadataResult.value.info.version
      : undefined
  const version = liveVersion ?? definition.fallback.version
  const livePublished =
    metadataResult.status === "fulfilled"
      ? getPyPILastPublished(metadataResult.value, version)
      : undefined
  const liveDownloads =
    downloadsResult.status === "fulfilled"
      ? downloadsResult.value.data?.last_month
      : undefined

  return {
    projectSlug: definition.projectSlug,
    name: definition.name,
    registry: definition.registry,
    registryUrl: definition.registryUrl,
    version,
    downloadsLastMonth:
      typeof liveDownloads === "number"
        ? liveDownloads
        : definition.fallback.downloadsLastMonth,
    lastPublished: livePublished ?? definition.fallback.lastPublished,
    hasLiveMetadata: metadataResult.status === "fulfilled",
    hasLiveDownloads: typeof liveDownloads === "number",
  }
}

async function getNpmStats(
  definition: PackageDefinition
): Promise<PackageStats> {
  const [metadataResult, downloadsResult] = await Promise.allSettled([
    fetchJson<NpmMetadataResponse>(
      `https://registry.npmjs.org/${definition.name}`
    ),
    fetchJson<NpmDownloadsResponse>(
      `https://api.npmjs.org/downloads/point/last-month/${definition.name}`
    ),
  ])

  const liveVersion =
    metadataResult.status === "fulfilled"
      ? metadataResult.value["dist-tags"]?.latest
      : undefined
  const version = liveVersion ?? definition.fallback.version
  const livePublished =
    metadataResult.status === "fulfilled"
      ? metadataResult.value.time?.[version]?.slice(0, 10)
      : undefined
  const liveDownloads =
    downloadsResult.status === "fulfilled"
      ? downloadsResult.value.downloads
      : undefined

  return {
    projectSlug: definition.projectSlug,
    name: definition.name,
    registry: definition.registry,
    registryUrl: definition.registryUrl,
    version,
    downloadsLastMonth:
      typeof liveDownloads === "number"
        ? liveDownloads
        : definition.fallback.downloadsLastMonth,
    lastPublished: livePublished ?? definition.fallback.lastPublished,
    hasLiveMetadata: metadataResult.status === "fulfilled",
    hasLiveDownloads: typeof liveDownloads === "number",
  }
}

const getPackageStats = cache(async () => {
  return Promise.all(
    packageDefinitions.map((definition) =>
      definition.registry === "PyPI"
        ? getPyPIStats(definition)
        : getNpmStats(definition)
    )
  )
})

function getPackageStatsForProject(
  packageStats: PackageStats[],
  projectSlug: string
) {
  return packageStats.find((item) => item.projectSlug === projectSlug) ?? null
}

function formatDownloadCount(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function formatPackageDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(date)
}

export {
  formatDownloadCount,
  formatPackageDate,
  getPackageStats,
  getPackageStatsForProject,
}
export type { PackageRegistry, PackageStats }

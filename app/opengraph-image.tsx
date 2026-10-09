import { ImageResponse } from "next/og"

import { profile } from "@/lib/profile"

export const alt = `${profile.name}, ${profile.role} at ${profile.employer}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The card shown when the site is shared. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0c0a12",
        color: "#ebe8f5",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#9d98b3" }}>
        devraj.pro
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 38, color: "#9d98b3" }}>
          Hey, I’m
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 152,
            fontWeight: 800,
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          {profile.shortName}
        </div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 40 }}>
          {profile.role} at {profile.employer}
          <span style={{ color: "#b29bff", marginLeft: 18 }}>
            · systems · open source · research
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flex: 1,
              height: 10,
              borderRadius: 5,
              background: "#b29bff",
            }}
          />
        ))}
      </div>
    </div>,
    size
  )
}

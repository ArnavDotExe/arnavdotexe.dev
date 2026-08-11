import { profile } from "@/data/profile";

export const OG_SIZE = { width: 1200, height: 630 };

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0a0b",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(232,163,61,0.16), transparent 45%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "#e8a33d",
            color: "#0a0a0b",
            fontSize: 24,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {profile.initials}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9c9a92" }}>{profile.name}</div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 62,
          fontWeight: 600,
          color: "#f2f0e8",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          maxWidth: 980,
        }}
      >
        {profile.heroHeadline}
      </div>

      <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#e8a33d" }}>
        {profile.role}
      </div>
    </div>
  );
}

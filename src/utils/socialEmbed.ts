export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "other";

export const detectSocialPlatform = (url: string): SocialPlatform => {
  const u = url.toLowerCase();
  if (u.includes("instagram.com") || u.includes("instagr.am")) return "instagram";
  if (u.includes("facebook.com") || u.includes("fb.watch") || u.includes("fb.com")) return "facebook";
  if (u.includes("tiktok.com")) return "tiktok";
  return "other";
};

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, "");

/** Canonical post URL for embed + "view original" (drops tracking query on IG). */
export const cleanSocialUrl = (url: string) => {
  const trimmed = url.trim();
  const platform = detectSocialPlatform(trimmed);
  if (platform === "instagram") {
    return stripTrailingSlash(trimmed.split("?")[0]).replace(/\/embed$/i, "");
  }
  return stripTrailingSlash(trimmed.split("#")[0]);
};

export const socialEmbedSrc = (url: string, platform?: string, width = 500): string | null => {
  const p = (platform as SocialPlatform) || detectSocialPlatform(url);
  const clean = cleanSocialUrl(url);
  if (p === "instagram") return `${clean}/embed/captioned`;
  if (p === "facebook") {
    const video = /\/(videos|reel|watch)\//i.test(clean) || /fb\.watch/i.test(clean);
    const plugin = video ? "video.php" : "post.php";
    const w = Math.max(280, Math.min(Math.round(width), 750));
    return `https://www.facebook.com/plugins/${plugin}?href=${encodeURIComponent(clean)}&show_text=true&width=${w}`;
  }
  if (p === "tiktok") {
    const match = url.match(/\/video\/(\d+)/);
    return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
  }
  return null;
};

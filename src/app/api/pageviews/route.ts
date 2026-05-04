import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

async function getKV() {
  const { env } = await getCloudflareContext({ async: true });
  return env.BLOG_STATS;
}

export async function GET(request: Request) {
  try {
    const kv = await getKV();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const site = searchParams.get("site");

    if (site === "true") {
      const pv = (await kv.get("site:pv")) || "0";
      const uv = (await kv.get("site:uv")) || "0";
      return Response.json({ pv: parseInt(pv), uv: parseInt(uv) });
    }

    if (slug) {
      const pv = (await kv.get(`post:${slug}:pv`)) || "0";
      return Response.json({ pv: parseInt(pv), slug });
    }

    return Response.json({ error: "Missing slug or site param" }, { status: 400 });
  } catch (err) {
    return Response.json({ error: "KV not available" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const kv = await getKV();
    const body = await request.json().catch(() => ({})) as { slug?: string };
    const slug = body.slug;
    const ip = request.headers.get("cf-connecting-ip") || "unknown";

    if (slug) {
      const pv = parseInt((await kv.get(`post:${slug}:pv`)) || "0") + 1;
      await kv.put(`post:${slug}:pv`, String(pv));

      const sitePV = parseInt((await kv.get("site:pv")) || "0") + 1;
      await kv.put("site:pv", String(sitePV));

      const uvKey = `uv:${ip}`;
      const existing = await kv.get(uvKey);
      if (!existing) {
        const siteUV = parseInt((await kv.get("site:uv")) || "0") + 1;
        await kv.put("site:uv", String(siteUV));
        await kv.put(uvKey, "1", { expirationTtl: 86400 });
      }

      return Response.json({ pv: sitePV });
    }

    return Response.json({ error: "Missing slug" }, { status: 400 });
  } catch (err) {
    return Response.json({ error: "KV not available" }, { status: 500 });
  }
}

import Parser from "rss-parser";

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; PortfolioFeedBot/1.0)",
    Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
  },
});

export type WritingSource = "substack" | "medium" | "portfolio";

export interface WritingPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  guid?: string;
  source: WritingSource;
}

const manualMediumPosts: WritingPost[] = [
  {
    title: "WIP Case Study: Designing a Household as a Service Platform for Urban Flat Dwellers",
    link: "https://medium.com/@saianjan.margani/wip-case-study-designing-a-household-as-a-service-platform-for-urban-flat-dwellers-b6cc4f49749d",
    pubDate: "",
    source: "medium",
    guid: "manual-medium-b6cc4f49749d",
  },
];

const localPortfolioPosts: WritingPost[] = [
  {
    title: "A Gentle \"Running Late\" Prompt for Microsoft Teams Meetings",
    link: "/blog/running-late-teams-message",
    pubDate: "2026-03-12",
    contentSnippet:
      "A product idea for Microsoft Teams: a friendly, well-timed prompt that helps people post a quick \"running late\" note right when the meeting starts.",
    source: "portfolio",
    guid: "portfolio-running-late-teams-message",
  },
];

async function getFeedPosts(
  url: string,
  source: WritingSource,
): Promise<WritingPost[]> {
  async function parseFeed(feedUrl: string) {
    return parser.parseURL(feedUrl);
  }

  async function parseFeedWithFetch(feedUrl: string) {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioFeedBot/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Feed request failed with ${response.status}`);
    }

    const xml = await response.text();
    return parser.parseString(xml);
  }

  const candidateUrls = source === "medium" ? [url, `${url}/`, `${url}?format=rss`] : [url];

  let feed: Awaited<ReturnType<typeof parseFeed>> | null = null;

  for (const candidateUrl of candidateUrls) {
    try {
      feed = await parseFeed(candidateUrl);
      break;
    } catch {
      // Continue trying candidate URLs.
    }
  }

  if (!feed) {
    for (const candidateUrl of candidateUrls) {
      try {
        feed = await parseFeedWithFetch(candidateUrl);
        break;
      } catch {
        // Continue trying candidate URLs.
      }
    }
  }

  if (!feed || !Array.isArray(feed.items)) {
    return [];
  }

  return feed.items
    .map((item) => ({
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      contentSnippet: item.contentSnippet,
      guid: item.guid,
      source,
    }))
    .filter((item) => item.title && item.link);
}

export async function getAllWritingPosts(): Promise<WritingPost[]> {
  const [substackPosts, mediumFeedPosts] = await Promise.all([
    getFeedPosts("https://saianjan.substack.com/feed", "substack"),
    getFeedPosts("https://medium.com/feed/@saianjan.margani", "medium"),
  ]);

  const mediumPosts = mediumFeedPosts.length > 0 ? mediumFeedPosts : manualMediumPosts;
  const byLink = new Map<string, WritingPost>();

  [...localPortfolioPosts, ...substackPosts, ...mediumPosts].forEach((post) => {
    if (!byLink.has(post.link)) {
      byLink.set(post.link, post);
    }
  });

  return [...byLink.values()].sort((a, b) => {
    const aTime = new Date(a.pubDate || 0).getTime();
    const bTime = new Date(b.pubDate || 0).getTime();
    return bTime - aTime;
  });
}

export function getFeaturedWritingPosts(posts: WritingPost[], limit = 6): WritingPost[] {
  const sourceBuckets: Record<WritingSource, WritingPost[]> = {
    portfolio: [],
    substack: [],
    medium: [],
  };

  posts.forEach((post) => {
    sourceBuckets[post.source].push(post);
  });

  const featured: WritingPost[] = [];
  const sourceOrder: WritingSource[] = ["portfolio", "substack", "medium"];
  let sourceIndex = 0;

  while (
    featured.length < limit &&
    sourceOrder.some((source) => sourceBuckets[source].length > 0)
  ) {
    const source = sourceOrder[sourceIndex % sourceOrder.length];
    const bucket = sourceBuckets[source];

    if (bucket.length > 0) {
      const nextPost = bucket.shift();
      if (nextPost) {
        featured.push(nextPost);
      }
    }

    sourceIndex += 1;
  }

  return featured;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

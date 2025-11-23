import Parser from "rss-parser";

const parser = new Parser();

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
  guid?: string;
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    // Substack RSS feed URL format: https://[username].substack.com/feed
    const feed = await parser.parseURL("https://saianjan.substack.com/feed");
    
    return feed.items.map((item) => ({
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      contentSnippet: item.contentSnippet,
      content: item.content,
      guid: item.guid,
    }));
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    return [];
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}



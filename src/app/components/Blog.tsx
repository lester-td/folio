import { useEffect } from "react";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../content/blog";
import type { BlogPost } from "../content/blog/types";

function formatRelativeTime(date: string, time?: string) {
  const timestamp = Date.parse(time ? `${date}T${time}` : date);

  if (Number.isNaN(timestamp)) {
    return "unknown";
  }

  const diffMs = Date.now() - timestamp;
  if (diffMs < 0) {
    return "just now";
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < minute) {
    const seconds = Math.max(1, Math.floor(diffMs / 1000));
    return `${seconds} sec ago`;
  }

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes} min ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hr ago`;
  }

  if (diffMs < week) {
    const days = Math.floor(diffMs / day);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  if (diffMs < month) {
    const weeks = Math.floor(diffMs / week);
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }

  if (diffMs < year) {
    const months = Math.floor(diffMs / month);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(diffMs / year);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function formatDateTime(date: string, time?: string) {
  const timestamp = Date.parse(time ? `${date}T${time}` : date);

  if (Number.isNaN(timestamp)) {
    return time ? `${date} ${time}` : date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(time
      ? {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      : {}),
  }).format(new Date(timestamp));
}

export function Blog() {
  return (
    <div className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-8 md:py-10 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative border border-[var(--dark-grey)] bg-[var(--secondary)] shadow-[4px_4px_0_0_#000]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">blog</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--dark-grey)]">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {blogPosts.length === 0 ? (
            <div className="border-t border-[var(--dark-grey)] bg-[var(--deep-black)] p-4">
              <p className="font-mono text-[11px] sm:text-xs text-[var(--muted-foreground)]">
                No published posts found.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const postIndex = blogPosts.findIndex((post) => post.slug === slug);

  useEffect(() => {
    Fancybox.bind(".blog-mdx [data-fancybox]");

    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (postIndex === -1) {
    return (
      <div className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-8 md:py-10 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative border border-[var(--dark-grey)] bg-[var(--secondary)] shadow-[4px_4px_0_0_#000]">
            <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
              <span className="font-mono text-[11px] text-[var(--deep-black)]">blog</span>
            </div>
            <div className="p-4 bg-[var(--deep-black)] border-t border-[var(--dark-grey)] space-y-3">
              <p className="font-mono text-[11px] sm:text-xs text-[var(--muted-foreground)]">
                Post not found.
              </p>
              <Link to="/blog" className="mechanical-button px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                All Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const Content = post.Content;

  return (
    <div className="w-full px-3 py-6 sm:px-4 sm:py-8 md:px-8 md:py-10 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <article className="relative border border-[var(--dark-grey)] bg-[var(--secondary)] shadow-[4px_4px_0_0_#000]">
          <div className="h-6 border-b border-black bg-[var(--primary)] px-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[var(--deep-black)] tracking-wide">lester.page</span>
            <span className="font-mono text-[11px] text-[var(--deep-black)]">blog | {post.slug}</span>
          </div>

          <div className="p-4 sm:p-5 bg-[var(--deep-black)] border-t border-[var(--dark-grey)] space-y-4">
            <div className="pb-3 border-b border-dashed border-[var(--dark-grey)] grid grid-cols-3 gap-2">
              <PostNavLink post={prevPost} direction="prev" />
              <Link
                to="/blog"
                className="mechanical-button px-3 py-1.5 font-mono text-[11px] inline-flex items-center justify-center gap-1"
              >
                <FileText className="w-3 h-3" />
                All Posts
              </Link>
              <PostNavLink post={nextPost} direction="next" />
            </div>

            <div className="space-y-3">
              <h1 className="font-mono text-xl sm:text-2xl text-[var(--metallic-silver)] leading-snug">{post.title}</h1>

              <div className="border border-[var(--dark-grey)] bg-[var(--card)] p-2">
                <p className="text-[var(--muted-foreground)] text-[11px] sm:text-xs leading-relaxed font-mono">{post.summary}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[var(--metallic-accent)]">
                <span className="px-2 py-0.5 bg-black border border-[var(--dark-grey)] font-bold text-[var(--metallic-silver)]">
                  {formatDateTime(post.date, post.time)}
                </span>
                <span className="px-2 py-0.5 bg-black border border-[var(--dark-grey)] font-bold text-[var(--metallic-silver)]">
                  {post.category}
                </span>
                <span className="text-[var(--dark-grey)]">|</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-black border border-[var(--dark-grey)] font-mono text-[11px] text-[var(--metallic-accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="blog-mdx border border-[var(--dark-grey)] bg-black/40 p-3 sm:p-4">
              <Content />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative bg-[var(--deep-black)] hover:bg-black transition-colors duration-300 flex flex-col">
      <div className="h-6 bg-[var(--primary)] border-b border-black px-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--deep-black)]">{post.slug}</span>
        <span className="font-mono text-[11px] text-[var(--deep-black)]">
          {formatRelativeTime(post.date, post.time)} | {post.category}
        </span>
      </div>

      <div className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col">
        <h3 className="font-mono text-lg sm:text-xl text-[var(--metallic-silver)] leading-snug">{post.title}</h3>

        <div className="border border-[var(--dark-grey)] bg-[var(--card)] p-2">
          <p className="text-[var(--muted-foreground)] text-[11px] sm:text-xs leading-relaxed font-mono">{post.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-black border border-[var(--dark-grey)] font-mono text-[11px] text-[var(--metallic-accent)]">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 border-t border-dashed border-[var(--dark-grey)] flex items-center justify-end">
          <Link
            to={`/blog/${post.slug}`}
            className="mechanical-button px-3 py-1 font-mono text-[11px] inline-flex items-center gap-1"
          >
            Open <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

interface PostNavLinkProps {
  post: BlogPost | null;
  direction: "prev" | "next";
}

function PostNavLink({ post, direction }: PostNavLinkProps) {
  if (!post) {
    return (
      <span className="px-3 py-1.5 border border-[var(--dark-grey)] bg-black/40 font-mono text-[11px] text-[var(--dark-grey)] inline-flex items-center justify-center gap-1 lowercase">
        {direction === "prev" ? <ArrowLeft className="w-3 h-3" /> : null}
        {direction}
        {direction === "next" ? <ArrowRight className="w-3 h-3" /> : null}
      </span>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="mechanical-button px-3 py-1.5 font-mono text-[11px] inline-flex items-center justify-center gap-1 lowercase"
      aria-label={`Go to ${direction} post: ${post.title}`}
    >
      {direction === "prev" ? <ArrowLeft className="w-3 h-3" /> : null}
      {direction}
      {direction === "next" ? <ArrowRight className="w-3 h-3" /> : null}
    </Link>
  );
}

import FeedHeader from "@/components/posts/feed/FeedHeader";
import PostComposer from "@/components/posts/feed/PostComposer";
import PostCard from "@/components/posts/feed/PostCard";
import FeedSidebar from "@/components/posts/feed/FeedSidebar";

const posts = [
  {
    id: "1",
    author: {
      name: "Ritik Gupta",
      username: "ritikgupta",
      avatar: "https://i.pravatar.cc/150?img=12",
      profession: "Full Stack Developer",
      verified: true,
    },
    content:
      "Just shipped a complete authentication system with OAuth, JWT rotation, and role-based access control. The interesting part was designing the authorization layer so it could scale across organizations and workspaces.",
    skills: ["Next.js", "NestJS", "PostgreSQL", "OAuth"],
    type: "PROJECT",
    organization: "Credora",
    createdAt: "2h",
    reactions: 42,
    comments: 8,
  },
  {
    id: "2",
    author: {
      name: "Ananya Sharma",
      username: "ananyasharma",
      avatar: "https://i.pravatar.cc/150?img=47",
      profession: "Product Designer",
      verified: true,
    },
    content:
      "Finished redesigning our onboarding experience. We reduced the number of steps while making the professional identity setup feel much more intentional.",
    skills: ["Product Design", "Figma", "UX Research"],
    type: "WORK_UPDATE",
    organization: "Nexora",
    createdAt: "5h",
    reactions: 87,
    comments: 14,
  },
];

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <FeedHeader />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[240px_minmax(0,640px)_280px] lg:px-6">
        <aside className="hidden lg:block">
          <FeedSidebar />
        </aside>

        <section className="min-w-0">
          <PostComposer />

          <div className="mt-5 space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <TrendingSkills />
          </div>
        </aside>
      </main>
    </div>
  );
}

function TrendingSkills() {
  const skills = [
    { name: "TypeScript", posts: "1.8k posts" },
    { name: "Next.js", posts: "1.2k posts" },
    { name: "Artificial Intelligence", posts: "980 posts" },
    { name: "Product Design", posts: "742 posts" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Discover
        </p>

        <h2 className="mt-1 text-lg font-bold text-slate-900">
          Trending skills
        </h2>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="group cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                {index + 1}
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  {skill.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">{skill.posts}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
        Explore skills →
      </button>
    </div>
  );
}

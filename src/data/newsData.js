export const defaultNews = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Breaking News ${i + 1}`,
    description: `This is the description of breaking news ${i + 1}.`,
    publishedAt: "2026-01-09",
    source: "News Network",
}));
export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((it, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": it.name,
            "item": it.url,
        })),
    };
}

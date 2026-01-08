const SITE_URL = "https://calculaeasy.com/";

export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        "itemListElement": items.map((it, idx) => {
            let url = it.url;
            if (!url.startsWith("http")) {
                // Ensure it starts with / if it doesn't, to avoid double slashes or missing slashes if we just join
                // Actually, if we assume relative paths start with /, we just prepend SITE_URL.
                // If they might not start with /, we should handle that.
                // Let's assume standard relative paths for now, but be safe.
                const path = url.startsWith("/") ? url : `/${url}`;
                url = `${SITE_URL}${path}`;
            }

            return {
                "@type": "ListItem",
                "position": idx + 1,
                "name": it.name,
                "item": url,
            };
        }),
    };
}

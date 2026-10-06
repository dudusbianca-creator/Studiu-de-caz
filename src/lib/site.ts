/** Configurație globală a site-ului: nume, navigare și linkuri externe. */

export const SITE = {
  name: "Descoperă GitHub",
  tagline: "Învață GitHub de la zero",
  description:
    "Platformă educațională în română despre GitHub pentru începători și studenți: repository, commit, branch, pull request, issues și GitHub Actions.",
  year: 2026,
} as const;

export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: "/", label: "Acasă" },
  { href: "/lectii", label: "Lecții" },
  { href: "/comenzi", label: "Comenzi Git" },
  { href: "/ghid", label: "Ghid" },
  { href: "/date", label: "Date" },
];

export const FOOTER_GROUPS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Explorează",
    links: [
      { label: "Lecții", href: "/lectii" },
      { label: "Comenzi Git", href: "/comenzi" },
      { label: "Ghid pentru începători", href: "/ghid" },
      { label: "Datele mele", href: "/date" },
    ],
  },
  {
    title: "GitHub și Git",
    links: [
      { label: "GitHub.com", href: "https://github.com", external: true },
      { label: "git-scm.com", href: "https://git-scm.com", external: true },
      { label: "Cartea Pro Git", href: "https://git-scm.com/book/ro/v2", external: true },
    ],
  },
  {
    title: "Documentation și Resources",
    links: [
      { label: "GitHub Docs", href: "https://docs.github.com", external: true },
      { label: "GitHub Skills", href: "https://skills.github.com", external: true },
      { label: "Markdown Guide", href: "https://www.markdownguide.org", external: true },
    ],
  },
];

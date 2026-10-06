# Descoperă GitHub

Platformă educațională în română despre GitHub, construită cu Next.js 14 (App Router) și TypeScript.

## Instalare și pornire

```bash
unzip github-academy.zip
cd github-academy
npm install
npm run dev
```

Deschide http://localhost:3000.

Pentru producție:

```bash
npm run build
npm start
```

Cerințe: Node.js 18.17 sau mai nou.

## Pagini

| Rută | Conținut |
| --- | --- |
| `/` | Acasă: hero, concepte, flux, progres, întrebări frecvente |
| `/lectii` | Lista celor 7 lecții |
| `/lectii/[slug]` | O lecție, cu buton „Marchează ca terminată” |
| `/comenzi` | Cele 10 comenzi Git, cu filtre, copiere și comenzi salvate |
| `/ghid` | Ghid pas cu pas, cu progres salvat |
| `/date` | Baza de date locală, consolă și formular de feedback |

## Structură

```
src/
├─ app/                  # rutele (App Router) + layout.tsx
├─ components/
│  ├─ layout/            # AppShell, Header, Footer, Logo, Container
│  ├─ ui/                # componente mici reutilizabile: Button, Icon, Terminal, Accordion, ProgressRing, Term
│  └─ features/          # componente cu logică: SearchDialog, CommandExplorer, TutorialStepper, DataConsole, FeedbackForm
├─ data/                 # conținutul: lessons, commands, tutorial, faq
├─ hooks/                # useDatabase
├─ lib/                  # db (localStorage), search, utils, site (config)
└─ styles/               # tokens, base, layout, components
```

Conținutul (lecții, comenzi, pași) se editează în `src/data/`, fără să atingi componentele.

## Baza de date locală

Datele se salvează în `localStorage` (cheia `github-academy:db:v1`), în tabele:
`lessonProgress`, `tutorialSteps`, `bookmarks`, `feedback`, `events`.

Fiecare scriere apare în consola browserului (F12, Console). Din consolă poți folosi:

```js
ghDb.dump()   // afișează toate tabelele
ghDb.read()   // returnează obiectul cu date
ghDb.reset()  // șterge tot
```

În codul aplicației: `import { db } from "@/lib/db"` și `useDatabase()` pentru citire reactivă.

## Scurtături

- `/` sau `Ctrl/⌘ + K`: deschide căutarea
- `Esc`: închide căutarea
# Studiu-de-caz

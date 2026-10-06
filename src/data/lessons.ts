import type { IconName } from "@/components/ui/Icon";

export interface LessonSection {
  heading: string;
  body?: string[];
  items?: { title: string; text: string }[];
  list?: string[];
  code?: { title: string; lines: string[] };
  note?: string;
}

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  icon: IconName;
  minutes: number;
  tone: "blue" | "green" | "purple" | "orange" | "red" | "teal" | "pink";
  sections: LessonSection[];
}

export const LESSONS: Lesson[] = [
  {
    slug: "ce-este-github",
    title: "Ce este GitHub",
    summary: "Platforma unde se construiește software în echipă și diferența față de Git.",
    icon: "globe",
    minutes: 6,
    tone: "blue",
    sections: [
      {
        heading: "GitHub pe scurt",
        body: [
          "GitHub este un serviciu online care găzduiește proiecte Git. Încarci codul, îl împarți cu alții, discuți despre el și îl îmbunătățești împreună. Pe lângă cod, poți păstra documentație, imagini sau date.",
          "Gândește-te la el ca la un Google Drive făcut pentru programatori: fiecare modificare este salvată, vezi cine a schimbat ce și poți reveni oricând la o versiune veche.",
        ],
      },
      {
        heading: "Git și GitHub, două lucruri diferite",
        items: [
          { title: "Git", text: "Program de control al versiunilor, instalat pe calculatorul tău. Funcționează și fără internet. Creat în 2005." },
          { title: "GitHub", text: "Site care găzduiește proiecte Git și adaugă colaborare: Pull Requests, Issues, Actions. Lansat în 2008." },
        ],
        note: "Git este motorul, GitHub este garajul unde lucrezi împreună cu alții. Mai există și alte garaje: GitLab, Bitbucket.",
      },
      {
        heading: "Pentru ce se folosește",
        list: [
          "Păstrarea codului, cu copie de siguranță online",
          "Lucrul în echipă, fără ca oamenii să se încurce",
          "Revizuirea codului înainte ca ceva să fie acceptat",
          "Organizarea sarcinilor și a discuțiilor",
          "Publicarea gratuită a site-urilor cu GitHub Pages",
        ],
      },
      {
        heading: "Cine îl poate folosi",
        items: [
          { title: "Elevi și studenți", text: "Predau proiecte, lucrează în grup și își construiesc un portofoliu." },
          { title: "Programatori", text: "Își gestionează aplicațiile și colaborează cu echipa." },
          { title: "Designeri și scriitori", text: "Păstrează fișiere și texte cu istoric complet." },
          { title: "Companii și profesori", text: "Organizează echipe, cursuri și teme pentru clase întregi." },
        ],
      },
      {
        heading: "Ce proiecte poți gestiona",
        list: [
          "Un site personal publicat cu GitHub Pages",
          "O aplicație mobilă, cu erorile raportate și versiunile lansate",
          "O lucrare de licență, cu istoric complet al versiunilor",
          "Un bot sau un joc la care contribuie și prietenii",
        ],
      },
    ],
  },
  {
    slug: "meniul-github",
    title: "Meniul GitHub",
    summary: "Cele 11 elemente ale interfeței și la ce folosește fiecare.",
    icon: "grid",
    minutes: 7,
    tone: "purple",
    sections: [
      {
        heading: "Harta interfeței",
        body: ["Interfața GitHub are multe butoane. Iată rolul fiecăruia, cu un exemplu practic."],
        items: [
          { title: "Dashboard", text: "Pagina de start. Îți arată activitatea recentă. Exemplu: dimineața vezi că un coleg a comentat la Pull Request-ul tău." },
          { title: "Repositories", text: "Lista proiectelor tale. Exemplu: cauți „site-clasa” și intri direct în proiect." },
          { title: "Issues", text: "Sarcini, idei și erori. Exemplu: filtrezi „Assigned to me” ca să afli ce ai de făcut azi." },
          { title: "Pull Requests", text: "Cereri de verificare. Exemplu: un coleg îți cere să verifici pagina de contact și o aprobi." },
          { title: "Projects", text: "Tablouri de organizare, ca un Trello. Exemplu: muți sarcinile între To do, In progress, Done." },
          { title: "Discussions", text: "Forum pentru comunitatea unui proiect. Exemplu: întrebi cum se instalează un proiect open source." },
          { title: "Actions", text: "Automatizări care rulează la fiecare modificare. Exemplu: bifa verde îți spune că testele au trecut." },
          { title: "Explore", text: "Descoperă proiecte noi. Exemplu: cauți proiecte marcate „good first issue”." },
          { title: "Notifications", text: "Clopoțelul cu tot ce ți se adresează. Exemplu: cineva îți răspunde la un comentariu." },
          { title: "Profile", text: "Pagina ta publică. Exemplu: fixezi cele mai bune trei proiecte ca portofoliu." },
          { title: "Settings", text: "Setările contului. Exemplu: activezi autentificarea în doi pași." },
        ],
      },
    ],
  },
  {
    slug: "repository",
    title: "Repository",
    summary: "Dosarul proiectului: creare, public sau privat, README, .gitignore și licențe.",
    icon: "book",
    minutes: 8,
    tone: "green",
    sections: [
      {
        heading: "Ce este un repository",
        body: [
          "Un repository (pe scurt „repo”) este ca un dosar de proiect, dar cu memorie. Conține fișierele tale și istoricul complet: cine a schimbat ce, când și de ce.",
        ],
      },
      {
        heading: "Cum creezi unul",
        list: [
          "Apasă New din pagina principală sau din meniul + din dreapta sus",
          "Alege un nume scurt, fără spații, de exemplu site-clasa",
          "Adaugă o descriere de o propoziție",
          "Alege Public sau Private",
          "Bifează Add a README file",
          "Apasă Create repository",
        ],
      },
      {
        heading: "Public sau Private",
        items: [
          { title: "Public", text: "Oricine îl poate vedea. Doar tu și cei invitați îl pot modifica. Potrivit pentru portofoliu și open source." },
          { title: "Private", text: "Îl văd doar tu și persoanele invitate. Potrivit pentru teme și idei neterminate." },
        ],
        note: "Nu pune niciodată parole sau chei API într-un repository public. Chiar dacă le ștergi mai târziu, rămân în istoric.",
      },
      {
        heading: "Fișierele importante",
        items: [
          { title: "README.md", text: "Prima pagină a proiectului: ce face, cum se instalează, cum se folosește. Scris în Markdown." },
          { title: ".gitignore", text: "Lista fișierelor pe care Git le ignoră: parole, fișiere temporare, foldere generate automat." },
          { title: "LICENSE", text: "Spune celorlalți ce au voie să facă cu codul tău. Alegeri frecvente: MIT, Apache 2.0, GPL 3.0." },
        ],
        code: { title: ".gitignore", lines: ["# Fișiere de sistem", ".DS_Store", "", "# Parole și chei", ".env", "", "# Foldere generate automat", "node_modules/"] },
      },
    ],
  },
  {
    slug: "branch-uri",
    title: "Branch-uri",
    summary: "Ramuri paralele pentru a testa idei fără să strici proiectul principal.",
    icon: "branch",
    minutes: 7,
    tone: "orange",
    sections: [
      {
        heading: "Ce este un branch",
        body: [
          "Imaginează-ți că scrii o lucrare și vrei să încerci un alt final. Faci o copie, încerci ideea acolo, iar dacă îți place, o aduci înapoi în lucrarea principală. Branch-ul face exact asta. Ramura principală se numește de obicei main.",
        ],
      },
      {
        heading: "De ce folosim branch-uri",
        items: [
          { title: "Siguranță", text: "Dacă ideea nu merge, ștergi ramura și main rămâne intact." },
          { title: "Lucru în paralel", text: "Fiecare coleg are ramura lui și nu vă călcați pe picioare." },
          { title: "Ordine", text: "O ramură pentru fiecare sarcină: corectare-logo, pagina-contact." },
        ],
      },
      {
        heading: "Cum creezi și schimbi branch-ul",
        code: {
          title: "terminal",
          lines: ["# Creează și treci pe ramura nouă", "git switch -c pagina-contact", "", "# Revino pe main", "git switch main"],
        },
      },
      {
        heading: "Cum faci merge",
        code: { title: "terminal", lines: ["git switch main", "git merge pagina-contact"] },
        note: "Dacă două ramuri au schimbat aceeași linie apare un conflict. Nu este grav: deschizi fișierul, alegi varianta corectă și faci un commit.",
      },
    ],
  },
  {
    slug: "pull-request",
    title: "Pull Request",
    summary: "Cererea prin care propui modificările tale și le verifici împreună cu echipa.",
    icon: "pr",
    minutes: 8,
    tone: "pink",
    sections: [
      {
        heading: "Ce este un Pull Request",
        body: [
          "Un Pull Request (PR) este o cerere politicoasă: „Am făcut modificări, te rog să le verifici și să le adaugi în proiect”. Colegii văd exact ce s-a schimbat, comentează pe fiecare linie și aprobă sau cer îmbunătățiri.",
        ],
      },
      {
        heading: "Procesul complet",
        list: ["Create Branch", "Make Changes", "Commit", "Push", "Pull Request", "Code Review", "Merge"],
      },
      {
        heading: "Cum creezi un Pull Request",
        list: [
          "Trimite ramura cu git push origin pagina-contact",
          "Intră în repository și apasă Compare & pull request",
          "Scrie un titlu clar și o descriere: ce ai schimbat și de ce",
          "Alege un reviewer și apasă Create pull request",
        ],
      },
      {
        heading: "Code Review, comentarii, aprobare",
        items: [
          { title: "Code Review", text: "Un coleg citește modificările, caută greșeli și verifică dacă au sens." },
          { title: "Comentarii", text: "Pot fi puse pe o linie anume sau pe tot PR-ul. Discuția rămâne păstrată." },
          { title: "Aprobare", text: "Reviewerul alege Comment, Approve sau Request changes." },
        ],
      },
      {
        heading: "Cele trei tipuri de merge",
        items: [
          { title: "Merge commit", text: "Păstrează toate commit-urile și adaugă un commit de îmbinare." },
          { title: "Squash and merge", text: "Strânge toate commit-urile într-unul singur. Istoric curat." },
          { title: "Rebase and merge", text: "Pune commit-urile tale la capătul lui main, fără commit de îmbinare." },
        ],
        note: "După merge poți apăsa Delete branch fără grijă: modificările sunt deja în main.",
      },
    ],
  },
  {
    slug: "issues",
    title: "Issues",
    summary: "Fișele de lucru ale proiectului: labels, assignees și milestones.",
    icon: "issue",
    minutes: 6,
    tone: "red",
    sections: [
      {
        heading: "Ce sunt Issues",
        body: [
          "Un issue este o notiță atașată proiectului: o eroare („butonul de contact nu merge”), o idee („adaugă un orar”) sau o întrebare. Are un număr, de exemplu #7, și se închide când problema este rezolvată.",
        ],
      },
      {
        heading: "Cum creezi un issue",
        list: [
          "Deschide tab-ul Issues",
          "Apasă New issue",
          "Scrie un titlu scurt și clar",
          "Descrie ce ai făcut, ce te așteptai și ce s-a întâmplat",
          "Apasă Submit new issue",
        ],
      },
      {
        heading: "Labels, Assignees, Milestones",
        items: [
          { title: "Labels", text: "Etichete colorate care spun tipul: bug, documentation, enhancement, question." },
          { title: "Assignees", text: "Persoana responsabilă de rezolvare." },
          { title: "Milestones", text: "Un obiectiv cu termen, de exemplu „Versiunea 1.0”. Vezi câte issue-uri au rămas deschise." },
        ],
      },
      {
        heading: "Organizarea proiectului",
        list: [
          "O listă de lucru comună pentru toată echipa",
          "Scrie Closes #7 într-un Pull Request și issue-ul se închide singur la merge",
          "Filtrezi după label, persoană sau milestone",
          "Cu Projects muți issue-urile între coloane",
        ],
      },
    ],
  },
  {
    slug: "github-actions",
    title: "GitHub Actions",
    summary: "Automatizări pentru teste și publicare, de la CI/CD la primul workflow.",
    icon: "play",
    minutes: 7,
    tone: "teal",
    sections: [
      {
        heading: "Ce este GitHub Actions",
        body: [
          "Este un robot pe care îl configurezi tu. Îi spui: „De fiecare dată când cineva trimite cod, rulează testele”. Robotul pornește singur pe serverele GitHub și îți arată o bifă verde sau un X roșu.",
        ],
      },
      {
        heading: "Ce este CI/CD",
        items: [
          { title: "CI, Continuous Integration", text: "La fiecare modificare, codul este construit și testat automat, ca să afli repede dacă ai stricat ceva." },
          { title: "CD, Continuous Delivery", text: "Dacă testele trec, proiectul este publicat automat, de exemplu pe un site." },
        ],
      },
      {
        heading: "Primul workflow",
        body: ["Un workflow este un fișier text în folderul .github/workflows/. Spune când pornește, unde rulează și ce pași execută."],
        code: {
          title: ".github/workflows/teste.yml",
          lines: [
            "name: Teste",
            "on: [push, pull_request]",
            "",
            "jobs:",
            "  test:",
            "    runs-on: ubuntu-latest",
            "    steps:",
            "      - uses: actions/checkout@v4",
            "      - uses: actions/setup-node@v4",
            "        with:",
            "          node-version: 20",
            "      - run: npm ci",
            "      - run: npm test",
          ],
        },
        note: "Rezultatele se văd în tab-ul Actions. Bifa verde înseamnă că totul a trecut, X-ul roșu te trimite direct la pasul care a eșuat.",
      },
    ],
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

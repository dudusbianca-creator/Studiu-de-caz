export interface GitCommand {
  name: string;
  lines: string[];
  explain: string;
  when: string;
  group: "Început" | "Zi de zi" | "Ramuri";
}

export const COMMANDS: GitCommand[] = [
  { name: "git init", group: "Început", lines: ["git init"], explain: "Pornește Git într-un folder. Apare un dosar ascuns .git care ține istoricul.", when: "Când începi un proiect nou pe calculatorul tău." },
  { name: "git clone", group: "Început", lines: ["git clone https://github.com/ana/site-clasa.git"], explain: "Descarcă un repository de pe GitHub, cu tot istoricul lui.", when: "Când vrei să lucrezi la un proiect existent." },
  { name: "git status", group: "Zi de zi", lines: ["git status"], explain: "Arată ce fișiere au fost modificate și ce este pregătit pentru commit.", when: "Oricând nu ești sigur unde te afli." },
  { name: "git add", group: "Zi de zi", lines: ["git add index.html", "git add ."], explain: "Alege ce intră în următorul commit. Punctul înseamnă toate fișierele modificate.", when: "După ce ai editat fișiere și vrei să le salvezi." },
  { name: "git commit", group: "Zi de zi", lines: ['git commit -m "Adaug pagina de contact"'], explain: "Salvează modificările alese în istoric, cu un mesaj scurt care spune ce ai făcut.", when: "La fiecare pas terminat, nu doar la sfârșitul zilei." },
  { name: "git push", group: "Zi de zi", lines: ["git push origin main"], explain: "Trimite commit-urile tale pe GitHub. origin este numele repository-ului de pe GitHub.", when: "Când vrei ca alții să vadă munca ta." },
  { name: "git pull", group: "Zi de zi", lines: ["git pull origin main"], explain: "Aduce de pe GitHub modificările făcute de alții și le îmbină cu ale tale.", when: "La începutul zilei de lucru, înainte să editezi." },
  { name: "git branch", group: "Ramuri", lines: ["git branch", "git branch pagina-contact"], explain: "Fără nume arată lista ramurilor. Cu nume creează o ramură nouă.", when: "Când începi o sarcină nouă." },
  { name: "git switch", group: "Ramuri", lines: ["git switch pagina-contact", "git switch -c pagina-noua"], explain: "Schimbă ramura pe care lucrezi. Cu -c creează ramura și trece pe ea. Varianta veche este git checkout.", when: "Când treci de pe o ramură pe alta." },
  { name: "git merge", group: "Ramuri", lines: ["git switch main", "git merge pagina-contact"], explain: "Aduce în ramura curentă modificările dintr-o altă ramură.", when: "Când munca de pe ramură este gata." },
];

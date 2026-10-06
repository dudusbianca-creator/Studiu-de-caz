export interface TutorialStep {
  id: string;
  title: string;
  text: string;
  code?: string[];
  tip?: string;
}

export const TUTORIAL: TutorialStep[] = [
  { id: "cont", title: "Creează un cont GitHub", text: "Intră pe github.com și apasă Sign up. Alege un email, o parolă puternică și un nume de utilizator. Confirmă apoi emailul.", tip: "Alege un nume de utilizator pe care să îl poți pune într-un CV, de exemplu prenume-nume." },
  { id: "repo", title: "Creează primul repository", text: "Apasă pe + din dreapta sus, apoi New repository. Numește-l primul-proiect, bifează Add a README file și apasă Create repository." },
  { id: "clone", title: "Clonează repository-ul", text: "Instalează Git de la git-scm.com. Copiază adresa din butonul verde Code și rulează în terminal:", code: ["# Înlocuiește USERNAME cu numele tău", "git clone https://github.com/USERNAME/primul-proiect.git", "cd primul-proiect"] },
  { id: "fisiere", title: "Adaugă fișiere", text: "Creează un fișier nou în folder, apoi cere-i lui Git să îți arate ce s-a schimbat:", code: ['echo "Salut, GitHub!" > salut.txt', "git status"] },
  { id: "commit", title: "Creează primul commit", text: "Spune-i lui Git cine ești (o singură dată), apoi salvează fișierul în istoric:", code: ["# Doar prima dată pe acest calculator", 'git config --global user.name "Numele Tău"', 'git config --global user.email "email@exemplu.ro"', "git add salut.txt", 'git commit -m "Adaug primul fișier"'] },
  { id: "branch", title: "Creează un branch", text: "Lucrează pe o ramură separată, nu direct pe main. Editează salut.txt, apoi salvează modificarea:", code: ["git switch -c modificare-text", "# Editează salut.txt în editorul tău", "git add .", 'git commit -m "Schimb textul de întâmpinare"'] },
  { id: "push", title: "Trimite modificările pe GitHub", text: "Urcă ramura nouă pe GitHub. La prima trimitere ți se poate cere să te autentifici în browser.", code: ["git push -u origin modificare-text"] },
  { id: "pr", title: "Creează un Pull Request", text: "Deschide repository-ul pe GitHub. Apare un banner cu butonul Compare & pull request. Apasă-l, scrie un titlu și o descriere, apoi Create pull request.", tip: "Descrie în două propoziții ce ai schimbat și de ce." },
  { id: "merge", title: "Realizează merge", text: "Pe pagina Pull Request-ului apasă Merge pull request, apoi Confirm merge. Apoi adu modificările pe calculatorul tău:", code: ["git switch main", "git pull"], tip: "Felicitări! Ai parcurs tot fluxul GitHub, de la zero la primul merge." },
];

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Term } from "@/components/ui/Term";
import { Terminal } from "@/components/ui/Terminal";
import { Container, Section } from "@/components/layout/Container";
import { LessonCard } from "@/components/features/LessonCard";
import { ProgressSummary } from "@/components/features/ProgressSummary";
import { FAQ } from "@/data/faq";
import { LESSONS } from "@/data/lessons";

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  { icon: "layers", title: "Versiuni sigure", text: "Dacă greșești, te întorci la o variantă veche în câteva secunde." },
  { icon: "users", title: "Colaborare ușoară", text: "Echipa lucrează în paralel, iar modificările se îmbină controlat." },
  { icon: "globe", title: "Comunitate mare", text: "Milioane de proiecte open source din care poți învăța." },
  { icon: "bolt", title: "Automatizare", text: "Rulează teste și publică site-ul automat, cu GitHub Actions." },
];

const FLOW = [
  { t: "Creezi un repository", d: "Proiectul tău primește un loc pe GitHub." },
  { t: "Faci un branch", d: "Lucrezi pe o copie, fără să strici varianta principală." },
  { t: "Salvezi cu commit", d: "Fiecare pas important primește un mesaj." },
  { t: "Deschizi un Pull Request", d: "Ceri colegilor să verifice modificările." },
  { t: "Faci merge", d: "După aprobare, modificările intră în proiect." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Container narrow>
          <p className="eyebrow">Ghid pentru începători și studenți</p>
          <h1 className="hero-title">Descoperă GitHub.</h1>
          <p className="hero-lead">
            Învață cum funcționează GitHub, de la primul <Term tip="Un folder de proiect ținut pe GitHub, cu tot istoricul modificărilor.">repository</Term> până
            la primul Pull Request. Explicații simple, exemple reale și comenzi pe care le poți copia.
          </p>
          <div className="hero-actions">
            <Button href="/ghid" size="lg">Începe să înveți</Button>
            <Button href="/lectii/ce-este-github" variant="secondary" size="lg">Ce este GitHub?</Button>
          </div>
        </Container>
        <Container narrow>
          <Terminal
            className="hero-terminal"
            title="terminal"
            lines={[
              "# Descarcă proiectul și lucrează pe o ramură separată",
              "git clone https://github.com/ana/site-clasa.git",
              "git switch -c pagina-contact",
              "git add .",
              'git commit -m "Adaug pagina de contact"',
              "git push origin pagina-contact",
            ]}
          />
        </Container>
      </section>

      <Section tinted>
        <div className="section-head">
          <h2>Ce este GitHub?</h2>
          <p className="lead">
            GitHub este un site unde oamenii își păstrează codul și lucrează împreună la proiecte. Se bazează pe{" "}
            <Term tip="Programul care ține evidența versiunilor fișierelor tale, direct pe calculatorul tău.">Git</Term>, un sistem de control al versiunilor.
            GitHub adaugă deasupra un spațiu online, discuții, revizuirea codului și automatizări.
          </p>
        </div>
        <div className="grid grid-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card">
              <span className="card-icon tone-blue"><Icon name={b.icon} size={24} /></span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="section-head">
          <h2>Conceptele de bază.</h2>
          <p className="lead">Șapte lecții scurte. Fiecare se termină cu un buton care îți salvează progresul.</p>
        </div>
        <div className="grid grid-3">
          {LESSONS.map((l, i) => (
            <LessonCard key={l.slug} lesson={l} index={i} />
          ))}
        </div>
      </Section>

      <Section tinted>
        <div className="section-head">
          <h2>Cum funcționează GitHub?</h2>
          <p className="lead">Fluxul de lucru obișnuit are cinci pași și se repetă la fiecare modificare.</p>
        </div>
        <ol className="flow">
          {FLOW.map((f) => (
            <li key={f.t}>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <ProgressSummary />
      </Section>

      <Section tinted id="intrebari">
        <div className="section-head">
          <h2>Întrebări frecvente.</h2>
        </div>
        <Container narrow>
          <Accordion items={FAQ} />
        </Container>
      </Section>
    </>
  );
}

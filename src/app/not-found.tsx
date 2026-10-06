import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="page-header">
      <Container narrow>
        <p className="eyebrow">Eroare 404</p>
        <h1>Pagina nu există.</h1>
        <p className="lead">Linkul poate fi greșit sau pagina a fost mutată.</p>
        <div className="hero-actions">
          <Button href="/" size="lg">Înapoi acasă</Button>
          <Button href="/lectii" variant="secondary" size="lg">Vezi lecțiile</Button>
        </div>
      </Container>
    </section>
  );
}

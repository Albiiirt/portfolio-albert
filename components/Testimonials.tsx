"use client";

import { useState } from "react";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";

const LIMIT = 280;

type Quote = string | { en: string; es: string; ca: string };

function TestimonialCard({ quote, name, role, org, lang }: { quote: Quote; name: string; role: string; org: string; lang: "en" | "es" | "ca" }) {
  const resolvedQuote = typeof quote === "string" ? quote : quote[lang];
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = resolvedQuote.length > LIMIT;
  const displayed = needsTruncation && !expanded ? resolvedQuote.slice(0, LIMIT).trimEnd() + "…" : resolvedQuote;

  return (
    <div style={{
      background: "var(--bg)",
      borderRadius: "1.25rem",
      border: "1px solid var(--border-mid)",
      padding: "clamp(1.5rem, 3vw, 2rem)",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      height: "100%",
    }}>
      {/* Quote mark */}
      <span style={{
        fontFamily: "var(--font-serif), 'Playfair Display', serif",
        fontSize: "4rem", lineHeight: 1,
        color: "var(--border-mid)",
        userSelect: "none",
        display: "block",
        marginBottom: "-1rem",
      }}>
        "
      </span>

      {/* Quote text */}
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
          lineHeight: 1.8,
          color: "var(--text-muted)",
          fontStyle: "italic",
        }}>
          {displayed}
        </p>
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              all: "unset",
              cursor: "pointer",
              marginTop: "0.6rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text-subtle)",
              letterSpacing: "0.02em",
              borderBottom: "1px solid var(--border-mid)",
              paddingBottom: "1px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
          >
            {expanded ? "Leer menos ↑" : "Leer más ↓"}
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)" }} />

      {/* Author */}
      <div>
        <p style={{
          margin: 0,
          fontSize: "0.85rem", fontWeight: 700,
          color: "var(--text)", letterSpacing: "0.01em",
        }}>
          {name}
        </p>
        <p style={{
          margin: 0,
          fontSize: "0.75rem",
          color: "var(--text-subtle)",
          lineHeight: 1.4,
        }}>
          {role} · {org}
        </p>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote: "Tuve la oportunidad de enseñar a Albert durante el máster de Experience Design en BAU, y fue un placer verlo crecer como diseñador. Albert destacó por su gran actitud y disposición para aprender, así como su capacidad para incorporar el feedback y aplicarlo en sus proyectos de manera efectiva. Durante el curso, demostró compromiso y curiosidad y confío en que sus skills serán una gran contribución para cualquier equipo de diseño.",
    name: "Jorge Valencia",
    role: "Head of Experience Design",
    org: "Runroom",
  },
  {
    quote: "Albert tiene un gran potencial para aportar en cualquier espacio, con una mente muy racional y muy ágil dispuesto a encontrar soluciones. Tuve la sensación de que encuentra siempre su manera de conseguir resolver el problema que tiene enfrente y de una forma muy independiente, siempre trayendo propuestas interesantes y que no llegas a pensar de primeras. Fue un placer tenerle como alumno y estoy seguro que sería un placer trabajar con él.",
    name: "Jose E. Saura Oller",
    role: "AI & Product Innovation",
    org: "Atrio",
  },
  {
    quote: "Fui profesora de Albert en el Máster de Experiencias Digitales y puedo decir que fue un gran alumno. Desde el principio, le apasionaba el diseño y el research. Siempre buscaba comprender todo a fondo. Albert es muy analítico y crítico. Es un compañero genial: colaborador, amable y siempre dispuesto a ayudar. Su entusiasmo por el diseño de producto es contagioso. Recomiendo a Albert para cualquier puesto de Product Designer. Tiene las habilidades, los conocimientos y la actitud. ¡Confío en que tendrá mucho éxito!",
    name: "Sarah Romero",
    role: "Profesora · Digital Product Design",
    org: "BAU",
  },
  {
    quote: {
      en: "It is my pleasure to write this letter of recommendation for Albert, who was a student in the Interaction design degree at EMAD La Garriga. During the time I have had the privilege of being their teacher, Albert has consistently demonstrated themselves to be an exemplary student and a developing professional with remarkable potential in the field of interactive product design and development. Albert has consistently stood out for their creativity, technical ability, and dedication. Their projects have always reflected a deep understanding of UX/UI and an innate ability to turn innovative ideas into functional and attractive products. One of their most notable projects was de Final Project in EMAD. In addition to their technical skills, Albert possesses excellent interpersonal and teamwork abilities. They are always willing to collaborate and share their knowledge with their peers, creating a positive and productive learning environment. Their ability to receive and apply feedback is also impressive, allowing them to continuously improve their skills and the quality of their work. In summary, I highly recommend Albert for any opportunity they choose to pursue in the future. If you need any further information, please do not hesitate to contact me.",
      es: "Es un placer para mí escribir esta carta de recomendación para Albert, quien fue estudiante en el grado de Diseño de Interacción en EMAD La Garriga. Durante el tiempo que he tenido el privilegio de ser su profesor, Albert ha demostrado de manera consistente ser un estudiante ejemplar y un profesional en desarrollo con un potencial extraordinario en el campo del diseño interactivo de producto y el desarrollo. Albert siempre ha destacado por su creatividad, capacidad técnica y dedicación. Sus proyectos siempre han reflejado una comprensión profunda del UX/UI y una habilidad innata para convertir ideas innovadoras en productos funcionales y atractivos. Uno de sus proyectos más destacados fue el Proyecto Final en EMAD. Además de sus habilidades técnicas, Albert posee excelentes capacidades interpersonales y de trabajo en equipo. Siempre está dispuesto a colaborar y compartir sus conocimientos con sus compañeros, creando un entorno de aprendizaje positivo y productivo. Su capacidad para recibir y aplicar feedback también es impresionante, lo que le permite mejorar continuamente sus habilidades y la calidad de su trabajo. En resumen, recomiendo ampliamente a Albert para cualquier oportunidad que decida perseguir en el futuro. Si necesitas más información, no dudes en ponerte en contacto conmigo.",
      ca: "És un plaer per a mi escriure aquesta carta de recomanació per a l'Albert, que va ser estudiant al grau de Disseny d'Interacció a EMAD La Garriga. Durant el temps que he tingut el privilegi de ser el seu professor, l'Albert ha demostrat de manera consistent ser un estudiant exemplar i un professional en desenvolupament amb un potencial extraordinari en el camp del disseny interactiu de producte i el desenvolupament. L'Albert sempre ha destacat per la seva creativitat, capacitat tècnica i dedicació. Els seus projectes sempre han reflectit una comprensió profunda del UX/UI i una habilitat innata per convertir idees innovadores en productes funcionals i atractius. Un dels seus projectes més destacats va ser el Projecte Final a EMAD. A més de les seves habilitats tècniques, l'Albert posseeix excel·lents capacitats interpersonals i de treball en equip. Sempre està disposat a col·laborar i compartir els seus coneixements amb els seus companys, creant un entorn d'aprenentatge positiu i productiu. La seva capacitat per rebre i aplicar feedback també és impressionant, la qual cosa li permet millorar contínuament les seves habilitats i la qualitat del seu treball. En resum, recomano àmpliament l'Albert per a qualsevol oportunitat que decideixi perseguir en el futur. Si necessites més informació, no dubtis a posar-te en contacte amb mi.",
    },
    name: "Marc Garrido",
    role: "UX Designer · Profesor",
    org: "EMAD La Garriga",
  },
];

export default function Testimonials() {
  const { lang } = useLang();

  return (
    <section
      id="testimonials"
      style={{
        background: "var(--bg-alt)",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <div className="site-content">

        {/* Header */}
        <FadeInView>
          <div className="testimonials-header" style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap",
            gap: "1rem", marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}>
            <div>
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>Referidos</p>
              <h2 style={{
                margin: 0,
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                fontFamily: "var(--font-serif), 'Playfair Display', serif",
                fontStyle: "italic", fontWeight: 400,
                color: "var(--text)", lineHeight: 1.1,
              }}>
                Lo que dicen
              </h2>
            </div>
          </div>
        </FadeInView>

        {/* Slider */}
        <FadeInView delay={0.1}>
          <div style={{
            display: "flex",
            gap: "clamp(1rem, 2vw, 1.25rem)",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            paddingBottom: "0.25rem",
          }}>
            {TESTIMONIALS.map(({ quote, name, role, org }, i) => (
              <div key={i} className="testimonial-card" style={{
                flex: "0 0 calc((100% - clamp(1rem, 2vw, 1.25rem) * 1.5) / 2.5)",
                minWidth: "min(320px, 80vw)",
                scrollSnapAlign: "start",
              }}>
                <TestimonialCard quote={quote} name={name} role={role} org={org} lang={lang} />
              </div>
            ))}
          </div>
        </FadeInView>

      </div>
    </section>
  );
}

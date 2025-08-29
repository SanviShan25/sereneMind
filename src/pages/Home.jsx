// src/pages/Home.jsx
import { useRef } from "react";
import IntakeForm from "./IntakeForm.jsx";

export default function Home() {
  const intakeRef = useRef(null);

  // robust scroll (accounts for sticky topbar ~80px)
  const scrollToIntake = () => {
    const el = intakeRef.current || document.getElementById("intake-section");
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - 80; // header offset
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      {/* animated aurora blobs */}
      <div className="bg-orb bg-orb1" />
      <div className="bg-orb bg-orb2" />

      {/* ===== HERO ===== */}
      <section className="hero center">
        <h1 className="hero-title">
          <span>Talk Freely.</span>
          <br />
          <span>Understand Deeply.</span>
          <br />
          <span>Heal Confidently.</span>
        </h1>

        <p className="hero-sub">
          Your private AI health companion for teens &amp; youth. From
          conversation → clarity → care — all in one safe space.
        </p>

        {/* ⬇️ scroll to intake instead of routing */}
        <button className="cta" onClick={scrollToIntake}>
          Start Free Check-in
        </button>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features wrapper">
        <Card
          icon="💬"
          title="Dialogue"
          text="Chat naturally, with zero judgement in a safe, private space."
        />
        <Card
          icon="🧠"
          title="Understanding"
          text="Plain-language insights and gentle guidance about your state."
        />
        <Card
          icon="🚀"
          title="Next Steps"
          text="Personalized tips + downloadable report to share if you choose."
        />
      </section>

      {/* ===== INTAKE SECTION ===== */}
      <section id="intake-section" ref={intakeRef} className="wrapper">
        <IntakeForm />
      </section>
    </>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-title">{title}</div>
      <p className="card-text">{text}</p>
    </div>
  );
}
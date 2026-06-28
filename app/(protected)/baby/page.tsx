"use client";
import { useState, useEffect } from "react";

const IMAGES = {
  myths: "1544126592-807ade215a0b",
  redflags: "1559757175-5700dde675bc",
  feeding: "1555252333-9f8e92e65df9",
  sleep: "1515488042361-ee00e0ddd4e4",
  crying: "1519689680058-324335c77afa",
  cord: "1576091160550-2173dba999ef",
  jaundice: "1584467735871-a4a4e9f6b5bb",
  teething: "1491013516836-7db643ee125a",
};

type MythBlock = {
  type: "myth";
  myth: string;
  fact: string;
};

type TextBlock = {
  type: "text";
  body: string;
};

type ChecklistBlock = {
  type: "checklist";
  label: string;
  items: string[];
};

type ListBlock = {
  type: "list";
  intro?: string;
  items: string[];
  footer?: string;
};

type WarningBlock = {
  type: "warning";
  label: string;
  items: string[];
  footer?: string;
};

type ContentBlockData = MythBlock | TextBlock | ChecklistBlock | ListBlock | WarningBlock;

type BabySection = {
  id: keyof typeof IMAGES;
  tag: string;
  emoji: string;
  title: string;
  image: string;
  accent: string;
  content: ContentBlockData[];
};

const sections: BabySection[] = [
  {
    id: "myths",
    tag: "MYTHS vs. FACTS",
    emoji: "💬",
    title: "What You May Have Heard",
    image: IMAGES.myths,
    accent: "#A8554A",
    content: [
      { type: "myth", myth: "Drink only pap/water and avoid all 'cold' foods after delivery", fact: "There is no medical basis for avoiding nutritious foods. A balanced diet supports your recovery — eat what nourishes you." },
      { type: "myth", myth: "Leave a crying baby to 'toughen up'", fact: "Responding to your baby's cries builds trust and security. You cannot spoil a newborn by comforting them." },
      { type: "myth", myth: "A resting mother is lazy", fact: "Rest is medically necessary recovery — not a luxury. Your body needs it to heal. Asking for help is strength, not weakness." },
    ],
  },
  {
    id: "redflags",
    tag: "RED FLAGS",
    emoji: "🚩",
    title: "When to Worry (Baby)",
    image: IMAGES.redflags,
    accent: "#C0463E",
    content: [
      {
        type: "list",
        intro: "Most days with a newborn are calm and ordinary. Know when to act quickly — go to a hospital immediately if your baby has any of these:",
        items: ["Fever (feel baby's chest or back — warmer than usual is enough reason to check)", "Refuses to feed or feeds very poorly", "Unusually difficult to wake, or floppy/limp", "Fast or laboured breathing", "Vomits repeatedly", "Fewer wet diapers than usual"],
        footer: "Trust what you're noticing — you know your baby best.",
      },
    ],
  },
  {
    id: "feeding",
    tag: "NEWBORN BASICS",
    emoji: "🍼",
    title: "Feeding Your Newborn",
    image: IMAGES.feeding,
    accent: "#8FA08A",
    content: [
      { type: "text", body: "Newborns typically feed every 2–3 hours, including through the night — that's completely normal, not a sign anything is wrong." },
      { type: "checklist", label: "Signs she's feeding well:", items: ["Regular wet and dirty diapers", "Steady weight gain", "Settles after most feeds"] },
      { type: "text", body: "If she seems constantly hungry, struggles to latch, or feeding consistently takes over 40 minutes — mention it at her next check-up." },
    ],
  },
  {
    id: "sleep",
    tag: "NEWBORN BASICS",
    emoji: "🌙",
    title: "Newborn Sleep, Explained",
    image: IMAGES.sleep,
    accent: "#7B6FA0",
    content: [
      { type: "text", body: "Most newborns sleep 14–17 hours a day, but in short stretches — this isn't a routine yet, and that's expected." },
      { type: "checklist", label: "Safe sleep — always:", items: ["Lay baby on their back", "On a firm, flat surface", "Nothing loose in the cot"] },
      { type: "text", body: "If she's unusually hard to wake, or sleeps far more than normal and feeds poorly — that's worth checking on." },
    ],
  },
  {
    id: "crying",
    tag: "NEWBORN BASICS",
    emoji: "😢",
    title: "Crying: Normal vs. Not",
    image: IMAGES.crying,
    accent: "#A8554A",
    content: [
      { type: "text", body: "Crying is how a newborn communicates — hunger, a wet diaper, tiredness, or just wanting to be held. Crying peaking in the evenings in the first few weeks is normal." },
      { type: "warning", label: "Different from ordinary fussiness:", items: ["Unusually high-pitched cry", "Inconsolable for hours", "Paired with fever or refusal to feed"], footer: "Don't wait these out — seek help." },
    ],
  },
  {
    id: "cord",
    tag: "NEWBORN BASICS",
    emoji: "🔵",
    title: "Umbilical Cord Care",
    image: IMAGES.cord,
    accent: "#4A7FA8",
    content: [
      { type: "text", body: "Keep the cord stump clean and dry until it falls off on its own — usually within 1–2 weeks. Fold diapers below it so it isn't covered." },
      { type: "warning", label: "See a doctor if you notice:", items: ["Swelling or pus", "A bad smell", "Redness spreading outward from the base"], footer: "Mild redness right at the base is common and okay." },
    ],
  },
  {
    id: "jaundice",
    tag: "NEWBORN BASICS",
    emoji: "🟡",
    title: "Jaundice: Mild vs. Concerning",
    image: IMAGES.jaundice,
    accent: "#C4943A",
    content: [
      { type: "text", body: "Mild yellowing of the skin or eyes in the first few days is common and often clears on its own." },
      { type: "warning", label: "See a doctor the same day if:", items: ["Yellowing appears in the first 24 hours of life", "It spreads to the arms or legs", "It deepens in colour", "Baby becomes very sleepy and feeds poorly"] },
    ],
  },
  {
    id: "teething",
    tag: "BABY MILESTONES",
    emoji: "🦷",
    title: "Teething Worries",
    image: IMAGES.teething,
    accent: "#8FA08A",
    content: [
      { type: "text", body: "Teething usually starts around 4–7 months, though it varies. Drooling, gum-rubbing, and mild irritability are normal." },
      { type: "checklist", label: "What helps:", items: ["A gentle, clean finger on the gums", "A chilled (not frozen) teething ring"] },
      { type: "text", body: "Teething does not normally cause high fever or diarrhoea. If those appear, look elsewhere for the cause." },
    ],
  },
];

function MythCard({ myth, fact }: { myth: string; fact: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped(!flipped)} style={{ cursor: "pointer", borderRadius: 14, border: flipped ? "1.5px solid #8FA08A" : "1.5px solid #f0e4de", background: flipped ? "#f0f7f0" : "#fff8f5", transition: "all 0.3s", marginBottom: 12 }}>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 18, marginTop: 1, flexShrink: 0 }}>{flipped ? "✅" : "❌"}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: flipped ? "#8FA08A" : "#A8554A", letterSpacing: "0.04em", marginBottom: 4, textTransform: "uppercase" }}>
              {flipped ? "The fact" : "Common myth"}
            </p>
            <p style={{ fontSize: 15, color: "#2E2228", lineHeight: 1.55 }}>{flipped ? fact : myth}</p>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#b09a94", textAlign: "right", marginTop: 8 }}>Tap to {flipped ? "see myth" : "see fact"} →</p>
      </div>
    </div>
  );
}

function ContentBlock({ block }: { block: ContentBlockData }) {
  if (block.type === "text") return <p style={{ fontSize: 15, color: "#4a3a3e", lineHeight: 1.7, marginBottom: 12 }}>{block.body}</p>;
  if (block.type === "myth") return <MythCard myth={block.myth} fact={block.fact} />;
  if (block.type === "checklist") return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#8FA08A", letterSpacing: "0.05em", marginBottom: 8, textTransform: "uppercase" }}>{block.label}</p>
      {block.items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <span style={{ color: "#8FA08A", fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
          <p style={{ fontSize: 15, color: "#2E2228", lineHeight: 1.55 }}>{item}</p>
        </div>
      ))}
    </div>
  );
  if (block.type === "list") return (
    <div style={{ marginBottom: 12 }}>
      {block.intro && <p style={{ fontSize: 15, color: "#4a3a3e", lineHeight: 1.65, marginBottom: 12 }}>{block.intro}</p>}
      {block.items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <span style={{ background: "#C0463E", color: "white", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
          <p style={{ fontSize: 15, color: "#2E2228", lineHeight: 1.55 }}>{item}</p>
        </div>
      ))}
      {block.footer && <p style={{ fontSize: 14, color: "#8FA08A", fontStyle: "italic", marginTop: 10 }}>{block.footer}</p>}
    </div>
  );
  if (block.type === "warning") return (
    <div style={{ background: "#fff5f5", border: "1.5px solid #f5c6c3", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#C0463E", letterSpacing: "0.05em", marginBottom: 8, textTransform: "uppercase" }}>{block.label}</p>
      {block.items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <span style={{ color: "#C0463E", fontSize: 14, flexShrink: 0 }}>⚠</span>
          <p style={{ fontSize: 15, color: "#2E2228", lineHeight: 1.5 }}>{item}</p>
        </div>
      ))}
      {block.footer && <p style={{ fontSize: 13, color: "#8FA08A", marginTop: 8, fontStyle: "italic" }}>{block.footer}</p>}
    </div>
  );
  return null;
}

function SectionCard({ section, isDesktop }: { section: BabySection; isDesktop: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(46,34,40,0.08)", marginBottom: 20 }}>
      {/* Image */}
      <div style={{ position: "relative", height: 200 }}>
        <img
          src={`https://images.unsplash.com/photo-${section.image}?auto=format&fit=crop&w=600&q=80`}
          alt={section.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.background = section.accent + "22";
            }
          }}
        />
        <div style={{ position: "absolute", top: 12, left: 12, background: section.accent, color: "white", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 20, textTransform: "uppercase" }}>
          {section.tag}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>{section.emoji}</span>
          <h2 style={{ fontSize: isDesktop ? 20 : 18, fontWeight: 800, color: "#2E2228" }}>{section.title}</h2>
        </div>
        <ContentBlock block={section.content[0]} />
        {expanded && section.content.slice(1).map((block, i) => <ContentBlock key={i} block={block} />)}
      </div>

      {/* Read more */}
      {section.content.length > 1 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ padding: "14px 20px", background: "none", border: "none", borderTop: "1px solid #f0e8e4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", color: section.accent, fontWeight: 700, fontSize: 14, width: "100%" }}
        >
          <span>{expanded ? "Show less" : "Read more"}</span>
          <span style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: 18 }}>↓</span>
        </button>
      )}
    </div>
  );
}

const FILTERS = ["All", "Myths & Facts", "Red Flags", "Newborn Basics", "Milestones"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_MAP: Record<Filter, string | null> = {
  "All": null,
  "Myths & Facts": "MYTHS vs. FACTS",
  "Red Flags": "RED FLAGS",
  "Newborn Basics": "NEWBORN BASICS",
  "Milestones": "BABY MILESTONES",
};

export default function NewbornHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = sections.filter(s => FILTER_MAP[activeFilter] === null || s.tag === FILTER_MAP[activeFilter]);

  return (
    <div style={{ background: "#F7EFE6", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>

      {/* Hero banner — desktop only */}
      {isDesktop && (
        <div style={{ background: "linear-gradient(135deg, #A8554A 0%, #7B3F35 100%)", padding: "48px 40px", marginBottom: 0 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#f0c4b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>MamaGuard · Baby Care Hub</p>
            <h1 style={{ fontSize: 42, fontWeight: 800, color: "white", lineHeight: 1.15, maxWidth: 600 }}>
              Trusted guidance for your first weeks at home.
            </h1>
            <p style={{ fontSize: 17, color: "#f5ddd7", marginTop: 14, maxWidth: 520, lineHeight: 1.65 }}>
              Myths gently corrected, warning signs clearly explained, and everyday newborn care made simple.
            </p>
          </div>
        </div>
      )}

      {/* Sticky header */}
      <div style={{ background: "white", borderBottom: "1px solid #f0e8e4", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: isDesktop ? 1100 : 480, margin: "0 auto", padding: isDesktop ? "16px 40px" : "20px 18px 14px" }}>
          {/* Mobile only title */}
          {!isDesktop && (
            <>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#8FA08A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>MamaGuard</p>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#2E2228", lineHeight: 1.2 }}>Baby Care Hub</h1>
              <p style={{ fontSize: 14, color: "#806d73", marginTop: 4, marginBottom: 12 }}>Trusted guidance for your first weeks</p>
            </>
          )}

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", alignItems: "center" }}>
            {isDesktop && <span style={{ fontSize: 13, fontWeight: 700, color: "#b09a94", flexShrink: 0, marginRight: 4 }}>Filter:</span>}
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, padding: isDesktop ? "8px 18px" : "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: activeFilter === f ? "#A8554A" : "#f0e8e4", color: activeFilter === f ? "white" : "#806d73", transition: "all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth: isDesktop ? 1100 : 480, margin: "0 auto", padding: isDesktop ? "28px 40px 60px" : "16px 14px 100px" }}>
        {isDesktop ? (
          // Desktop: 2-column grid
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {filtered.map(section => (
              <SectionCard key={section.id} section={section} isDesktop={isDesktop} />
            ))}
          </div>
        ) : (
          // Mobile: single column
          filtered.map(section => (
            <SectionCard key={section.id} section={section} isDesktop={false} />
          ))
        )}
      </div>
    </div>
  );
}

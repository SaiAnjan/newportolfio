"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronRight,
  Coffee,
  Disc3,
  Gauge,
  Heart,
  Home,
  MapPin,
  Music2,
  PackageOpen,
  Search,
  ShoppingBag,
  Sparkles,
  Thermometer,
  UserRound,
  Users,
  Waves,
} from "lucide-react";
import { useState } from "react";

import styles from "./prototype.module.css";

type Persona = "home" | "cafe";
type Tab = "circle" | "dna" | "utility" | "vibe";

const dnaNotes = [
  { label: "Citrus", value: 88, color: "#f4c14f" },
  { label: "Floral", value: 74, color: "#e49ab2" },
  { label: "Cacao", value: 64, color: "#714b3a" },
  { label: "Fermented", value: 49, color: "#bb566e" },
] as const;

function StatusBar() {
  return (
    <div className={styles.statusBar} aria-hidden="true">
      <span>9:41</span>
      <span className={styles.dynamicIsland} />
      <span className={styles.signal}>●●●</span>
    </div>
  );
}

function Onboarding({ onChoose }: { onChoose: (persona: Persona) => void }) {
  return (
    <div className={styles.onboarding}>
      <div className={styles.onboardingMesh} />
      <div className={styles.brandMark}><Coffee size={20} strokeWidth={2.2} /></div>
      <div className={styles.onboardingCopy}>
        <p className={styles.eyebrow}>WELCOME TO BREWCIRCLE</p>
        <h1>Your coffee taste,<br />in living colour.</h1>
        <p>Meet your coffee people, discover recipes and cafés, and let every cup shape your Coffee DNA.</p>
      </div>
      <div className={styles.personaChoices}>
        <button type="button" onClick={() => onChoose("home")} className={styles.personaCard}>
          <span className={styles.personaIcon}><Gauge size={20} /></span>
          <span><strong>I brew at home</strong><small>Recipes, gear &amp; brew circles</small></span>
          <ChevronRight size={18} />
        </button>
        <button type="button" onClick={() => onChoose("cafe")} className={styles.personaCard}>
          <span className={`${styles.personaIcon} ${styles.personaIconPink}`}><MapPin size={20} /></span>
          <span><strong>I drink at cafés</strong><small>Drinks, places &amp; café circles</small></span>
          <ChevronRight size={18} />
        </button>
      </div>
      <p className={styles.onboardingHint}>You can switch your circle anytime.</p>
    </div>
  );
}

function FeedCard({ persona, saved, tried, onSave, onTry }: {
  persona: Persona;
  saved: boolean;
  tried: boolean;
  onSave: () => void;
  onTry: () => void;
}) {
  const home = persona === "home";
  return (
    <article className={styles.feedCard}>
      <div className={`${styles.feedImage} ${home ? styles.homeBrewImage : styles.cafeBrewImage}`}>
        <span className={styles.imageTag}>{home ? "CIRCLE BREW" : "CAFÉ BREW"}</span>
        <div className={styles.cupArt} aria-hidden="true"><span /></div>
      </div>
      <div className={styles.feedBody}>
        <div className={styles.authorRow}>
          <span className={styles.avatar}>{home ? "AK" : "MR"}</span>
          <span><strong>{home ? "Aarav K." : "Mira Rao"}</strong><small>{home ? "Bengaluru · 12 min" : "Subko, Bandra · 28 min"}</small></span>
          <button type="button" aria-label="Like post" className={styles.iconButton}><Heart size={17} /></button>
        </div>
        <h3>{home ? "A bright V60 for slow mornings" : "Guava tonic that tastes like summer"}</h3>
        <p>{home ? "Ratnagiri washed · 15g / 250g · 92°C · 2:45" : "Espresso, guava shrub, tonic and pink pepper — sparkling, tart and quietly spicy."}</p>
        <div className={styles.notePills}>
          {(home ? ["Citrus", "Jasmine", "Caramel"] : ["Guava", "Fermented", "Pink pepper"]).map((note) => <span key={note}>{note}</span>)}
        </div>
        <div className={styles.cardActions}>
          <button type="button" onClick={onSave} className={saved ? styles.actionActive : undefined}>
            {saved ? <Check size={15} /> : <Bookmark size={15} />}{saved ? "Saved" : "Save"}
          </button>
          <button type="button" onClick={onTry} className={tried ? styles.actionActive : undefined}>
            {tried ? <Check size={15} /> : <Sparkles size={15} />}{tried ? "Added to journey" : home ? "Try recipe" : "Try this drink"}
          </button>
        </div>
      </div>
    </article>
  );
}

function CircleView({ persona }: { persona: Persona }) {
  const [saved, setSaved] = useState(false);
  const [tried, setTried] = useState(false);
  return (
    <div className={styles.screenContent}>
      <header className={styles.appHeader}>
        <div><p className={styles.eyebrow}>GOOD MORNING</p><h2>{persona === "home" ? "Circle Brews" : "Café Brews"}</h2></div>
        <button type="button" className={styles.profileButton} aria-label="Open profile"><UserRound size={18} /></button>
      </header>
      <div className={styles.storyRow} aria-label="Coffee circles">
        {["You", "Filter", "Espresso", "Cold"].map((item, index) => <div key={item}><span className={styles.storyBubble}>{index === 0 ? "+" : item.slice(0, 1)}</span><small>{item}</small></div>)}
      </div>
      <FeedCard persona={persona} saved={saved} tried={tried} onSave={() => setSaved(!saved)} onTry={() => setTried(!tried)} />
      <article className={styles.miniCard}>
        <span className={styles.miniAvatar}>{persona === "home" ? "RS" : "KC"}</span>
        <div><strong>{persona === "home" ? "Rhea saved your recipe" : "Kunal is at Araku Coffee"}</strong><p>{persona === "home" ? "“Trying this with a finer grind tomorrow.”" : "The city circle is loving their cacao cold brew."}</p></div>
      </article>
    </div>
  );
}

function DnaView() {
  return (
    <div className={styles.screenContent}>
      <header className={styles.appHeader}><div><p className={styles.eyebrow}>YOUR LIVING PROFILE</p><h2>Coffee DNA</h2></div><Sparkles size={21} /></header>
      <section className={styles.dnaHero}>
        <div className={styles.dnaMesh}><div className={styles.dnaCore}>72<small>% evolved</small></div></div>
        <p className={styles.dnaType}>The Bright Explorer</p>
        <p className={styles.dnaSummary}>You lean toward juicy, floral coffees with a warm cacao finish. Lately, fermented fruit notes are entering your orbit.</p>
      </section>
      <section className={styles.dnaPanel}>
        <div className={styles.sectionTitle}><h3>Your note spectrum</h3><span>18 cups learned</span></div>
        {dnaNotes.map((note) => <div className={styles.noteRow} key={note.label}><span>{note.label}</span><div><i style={{ width: `${note.value}%`, backgroundColor: note.color }} /></div><small>{note.value}</small></div>)}
      </section>
      <section className={styles.dnaInsight}>
        <Waves size={19} />
        <div><strong>Your DNA is shifting</strong><p>Three recent café drinks added guava and fermentation to your emerging notes.</p></div>
      </section>
    </div>
  );
}

function UtilityView({ persona }: { persona: Persona }) {
  return (
    <div className={styles.screenContent}>
      <header className={styles.appHeader}><div><p className={styles.eyebrow}>{persona === "home" ? "YOUR BREW BENCH" : "CURATED FOR YOUR DNA"}</p><h2>{persona === "home" ? "Setups" : "Marketplace"}</h2></div><Search size={20} /></header>
      {persona === "home" ? (
        <>
          <section className={styles.setupHero}><div><small>ACTIVE SETUP</small><h3>Morning filter</h3><p>Balanced for bright, clean cups</p></div><Gauge size={38} /></section>
          <div className={styles.gearList}>
            {[{ icon: <Disc3 />, name: "Timemore C2", meta: "18 clicks · medium fine" }, { icon: <Coffee />, name: "Hario V60 02", meta: "Ceramic · 2 pour recipe" }, { icon: <Thermometer />, name: "Fellow Stagg EKG", meta: "92°C target" }].map((gear) => <button type="button" key={gear.name}><span>{gear.icon}</span><span><strong>{gear.name}</strong><small>{gear.meta}</small></span><ChevronRight size={17} /></button>)}
          </div>
          <button type="button" className={styles.primaryButton}>Tune this setup</button>
        </>
      ) : (
        <>
          <section className={styles.marketHero}><small>DNA MATCH · 91%</small><h3>Fruity cold brews near you</h3><p>Picked from your love of guava, citrus and sparkling textures.</p></section>
          <div className={styles.marketGrid}>
            {[{ name: "Kerehaklu Naturals", price: "₹680", type: "Beans" }, { name: "Cold Brew Flight", price: "₹450", type: "Experience" }].map((item, index) => <article key={item.name}><div className={index ? styles.marketPink : styles.marketGold}><PackageOpen size={26} /></div><small>{item.type}</small><strong>{item.name}</strong><p>{item.price}</p></article>)}
          </div>
        </>
      )}
    </div>
  );
}

function VibeView() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`${styles.screenContent} ${styles.vibeScreen}`}>
      <header className={styles.appHeader}><div><p className={styles.eyebrow}>A SMALL ROOM FOR SLOW CUPS</p><h2>Vibe</h2></div><Music2 size={20} /></header>
      <section className={styles.albumArt}><div className={styles.vinyl}><Disc3 size={54} /></div><span>NOW POURING</span></section>
      <div className={styles.trackInfo}><h3>Soft light, first bloom</h3><p>BrewCircle radio · 24 listeners</p></div>
      <div className={styles.waveform}>{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${12 + ((index * 17) % 34)}px` }} />)}</div>
      <button type="button" onClick={() => setPlaying(!playing)} className={styles.primaryButton}>{playing ? "Pause room" : "Join vibe room"}</button>
      <p className={styles.vibeNote}>Vibe adds ambience. Your brews and Coffee DNA still lead the journey.</p>
    </div>
  );
}

export function BrewCirclePrototype() {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [tab, setTab] = useState<Tab>("circle");

  const choosePersona = (nextPersona: Persona) => {
    setPersona(nextPersona);
    setTab("circle");
  };

  return (
    <main className={styles.pageShell}>
      <div className={styles.portfolioBar}>
        <Link href="/#wip"><ArrowLeft size={16} /> Back to portfolio</Link>
        <a href="https://brew-circle.vercel.app" target="_blank" rel="noopener noreferrer">Open live MVP <ChevronRight size={15} /></a>
      </div>
      <section className={styles.prototypeStage} aria-label="Interactive BrewCircle mobile prototype">
        <div className={styles.device}>
          <StatusBar />
          <div className={styles.appViewport}>
            {!persona ? <Onboarding onChoose={choosePersona} /> : (
              <>
                {tab === "circle" && <CircleView persona={persona} />}
                {tab === "dna" && <DnaView />}
                {tab === "utility" && <UtilityView persona={persona} />}
                {tab === "vibe" && <VibeView />}
                <nav className={styles.bottomNav} aria-label="BrewCircle navigation">
                  <button type="button" onClick={() => setTab("circle")} className={tab === "circle" ? styles.navActive : undefined}><Home size={19} /><span>Circle</span></button>
                  <button type="button" onClick={() => setTab("dna")} className={tab === "dna" ? styles.navActive : undefined}><Sparkles size={19} /><span>DNA</span></button>
                  <button type="button" onClick={() => setTab("utility")} className={tab === "utility" ? styles.navActive : undefined}>{persona === "home" ? <Gauge size={19} /> : <ShoppingBag size={19} />}<span>{persona === "home" ? "Setups" : "Market"}</span></button>
                  <button type="button" onClick={() => setTab("vibe")} className={tab === "vibe" ? styles.navActive : undefined}><Music2 size={19} /><span>Vibe</span></button>
                </nav>
              </>
            )}
          </div>
          <div className={styles.homeIndicator} aria-hidden="true" />
        </div>
        <aside className={styles.prototypeNotes}>
          <p className={styles.eyebrow}>INTERACTIVE CONCEPT</p>
          <h1>BrewCircle makes taste social.</h1>
          <p>Choose a coffee persona, explore its circle, then watch Coffee DNA turn preferences into an evolving visual identity.</p>
          <div><span><Users size={16} /> Two community paths</span><span><Sparkles size={16} /> Living Coffee DNA</span><span><Coffee size={16} /> Recipes, cafés &amp; gear</span></div>
          {persona && <button type="button" onClick={() => setPersona(null)}>Restart as another persona</button>}
        </aside>
      </section>
    </main>
  );
}

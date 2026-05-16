import React, { useState, useEffect } from "react";

const LIVING_ROOM_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/616b9eea-fb39-447b-9825-ec196ba08851.jpg";
const BAR_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/f59e4a42-43cc-4f7d-a6ae-6f1364902f2d.jpg";
const PHOTO_LAB_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/6146f0c6-76d2-43f7-acfb-2125d7525175.jpg";

const GoldDivider = () => (
  <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "6px auto" }} />
);

const PhotoPlaceholder = ({ name, width = "160px", height = "200px" }: { name: string; width?: string; height?: string }) => (
  <div style={{ width, height, background: "linear-gradient(145deg, #EAD9B0, #D4BA82)", border: "2px solid rgba(201,168,76,0.5)", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 5, left: 5, width: 12, height: 12, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ position: "absolute", top: 5, right: 5, width: 12, height: 12, borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ position: "absolute", bottom: 5, left: 5, width: 12, height: 12, borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ position: "absolute", bottom: 5, right: 5, width: 12, height: 12, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ fontSize: "1.4rem", color: "#C9A84C", opacity: 0.4 }}>◈</div>
    <div style={{ fontSize: "0.45rem", color: "#6B4F1A", letterSpacing: "0.07em", textAlign: "center", lineHeight: 1.5, padding: "0 6px", textTransform: "uppercase" }}>ФОТО<br />{name}</div>
  </div>
);

const DecorArcs = () => (
  <>
    <div style={{ position: "absolute", bottom: -100, right: -100, width: 350, height: 350, borderRadius: "50%", border: "1.5px solid rgba(201,168,76,0.18)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: -80, left: -80, width: 280, height: 280, borderRadius: "50%", border: "1.5px solid rgba(201,168,76,0.13)", pointerEvents: "none" }} />
  </>
);

const SlideBg = () => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
);

const SLIDE_BG = "linear-gradient(135deg, #F5EDD6 0%, #EAD9B0 40%, #F0E5C4 70%, #E8D4A0 100%)";
const F = "'Montserrat', sans-serif";

// ────────────── SLIDE 1 ──────────────
const Slide1 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${LIVING_ROOM_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.22 }} />
    <div style={{ position: "absolute", bottom: -80, left: -80, width: 320, height: 320, borderRadius: "50%", border: "1.5px solid rgba(201,168,76,0.22)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", border: "1.5px solid rgba(201,168,76,0.18)", pointerEvents: "none" }} />
    <div style={{ position: "relative", zIndex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", padding: "0 60px" }}>
      <div style={{ color: "#C9A84C", fontFamily: F, fontSize: "1.4rem", opacity: 0.65, letterSpacing: "0.3em" }}>✦ ✦ ✦</div>
      <div style={{ width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)" }} />
      <h1 style={{ fontFamily: F, fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#2C1A06", fontWeight: 700, lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em" }}>
        Гостиная Времени
      </h1>
      <GoldDivider />
      <p style={{ fontFamily: F, fontSize: "clamp(0.75rem, 1.2vw, 1rem)", color: "#7A5C2E", maxWidth: "480px", lineHeight: 1.6, margin: 0 }}>
        Концепция дня рождения в формате тёплой домашней гостиной, где собираются самые близкие
      </p>
      <div style={{ width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)" }} />
      <div style={{ color: "#C9A84C", fontFamily: F, fontSize: "1rem", opacity: 0.6 }}>✦</div>
    </div>
  </div>
);

// ────────────── SLIDE 2 ──────────────
const Slide2 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    {/* Фото — правая половина */}
    <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "45%", backgroundImage: `url(${LIVING_ROOM_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", opacity: 1 }} />
    {/* Градиент-переход слева от фото */}
    <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%", background: "linear-gradient(90deg, #F0E5C4 0%, #EAD9B0 45%, rgba(234,217,176,0.85) 60%, transparent 100%)" }} />
    {/* Тёмный оверлей поверх фото для читаемости */}
    <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "45%", background: "linear-gradient(90deg, rgba(240,229,196,0.6) 0%, transparent 40%)" }} />
    <div style={{ position: "absolute", top: "15%", bottom: "15%", left: 10, width: 2, background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent)", pointerEvents: "none" }} />
    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "12px", padding: "32px 44px", maxWidth: "58%" }}>
      <div>
        <h2 style={{ fontFamily: F, fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>Смыслы</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 4 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: F, fontSize: "clamp(0.6rem, 1vw, 0.75rem)", color: "#3A2B0F", lineHeight: 1.75 }}>
        <p style={{ margin: 0 }}>Мы делаем не стандартный юбилей, а <strong style={{ color: "#6B4F1A" }}>тёплую домашнюю гостиную</strong>, где исполняется мечта именинника. В центре — большой стол, во главе которого он. Вокруг — его семья, дети, самые близкие люди.</p>
        <p style={{ margin: 0 }}>Ему не нужно развлекать гостей — он просто наблюдает, как все собираются, общаются, смеются, и чувствует, что всем <strong style={{ color: "#6B4F1A" }}>комфортно и кайфово</strong>.</p>
        <p style={{ margin: 0 }}>Картины оживают как <strong style={{ color: "#6B4F1A" }}>театральный перформанс</strong> — за стеклом появляется актёр, тень, видеовставка или живая сцена, рассказывающая истории именинника.</p>
        <p style={{ margin: 0 }}>Над всем этим — <strong style={{ color: "#6B4F1A" }}>фамильный герб</strong>. Старые часы отсчитывают не минуты, а эпохи. Потёртое кресло хранит тепло локтей. Рамки с выцветшими снимками вдруг оживают голосами друзей.</p>
        <p style={{ margin: 0, color: "#6B4F1A", fontWeight: 600 }}>Именно это мы и предлагаем — честно, душевно, с выдумкой и без пафоса.</p>
      </div>
    </div>
  </div>
);

// ────────────── SLIDES 3-7: PEOPLE GRIDS ──────────────
const PeopleSlide = ({ title, people, photoSize }: { title: string; people: string[]; photoSize: { w: string; h: string } }) => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", gap: "20px", padding: "20px 28px" }}>
    <SlideBg />
    <DecorArcs />
    <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
      <h2 style={{ fontFamily: F, fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>{title}</h2>
      <GoldDivider />
    </div>
    <div style={{ position: "relative", zIndex: 2, display: "flex", gap: people.length <= 3 ? "44px" : "20px", justifyContent: "center", alignItems: "flex-end", flexWrap: "nowrap" }}>
      {people.map((name, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <PhotoPlaceholder name={name} width={photoSize.w} height={photoSize.h} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: F, fontSize: "clamp(0.6rem, 0.9vw, 0.8rem)", color: "#2C1A06", fontWeight: 600, margin: 0, maxWidth: "160px", lineHeight: 1.3 }}>{name}</p>
            <div style={{ width: 30, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "4px auto 0" }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ────────────── SLIDE 8: WELCOME ──────────────
const Slide8 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 55%", display: "flex", flexDirection: "column", gap: "12px", padding: "28px 36px" }}>
      <div>
        <h2 style={{ fontFamily: F, fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>Welcome</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 10 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontFamily: F, fontSize: "clamp(0.58rem, 0.95vw, 0.72rem)", color: "#3A2B0F", lineHeight: 1.7 }}>
        {[
          "Гостей встречают хостес и вручают карточку с их особым местом за столом",
          "Изысканные welcome-закуски, созданные специально для этого вечера",
          "Работают фотографы и видеографы — каждый момент сохраняется в вечность",
          "Снимается SDE — трогательный фильм о жизни именинника прямо в день торжества",
          "Живой символ праздника: медведь, конь или олень — гости запомнят навсегда",
          "Атмосфера уютной гостиной: камин, мягкий свет — хочется остановиться и просто быть здесь",
        ].map((text, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "#C9A84C", fontSize: "0.6rem", marginTop: "3px", flexShrink: 0 }}>◈</span>
            <p style={{ margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 6, padding: "8px 12px", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 4, fontFamily: F, fontSize: "clamp(0.55rem, 0.88vw, 0.68rem)", color: "#6B4F1A", lineHeight: 1.5 }}>
        ♪ Живая музыка: Алексей Алексин (вокал, гитара) — или Ксения Аксютик, финалистка 14-го сезона «Голос»
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 45%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px", padding: "28px 36px 28px 0" }}>
      <div style={{ width: "100%", height: "55%", backgroundImage: `url(${LIVING_ROOM_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", borderRadius: 4, border: "2px solid rgba(201,168,76,0.4)", boxShadow: "0 4px 20px rgba(139,105,20,0.15)" }} />
      <div style={{ display: "flex", gap: "12px", flex: 1 }}>
        <PhotoPlaceholder name="Welcome-зона" width="50%" height="100%" />
        <PhotoPlaceholder name="Камин" width="50%" height="100%" />
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 9: WELCOME ZONES ──────────────
const Slide9 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 52%", display: "flex", flexDirection: "column", gap: "12px", padding: "28px 36px" }}>
      <div>
        <h2 style={{ fontFamily: F, fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>Welcome</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 14 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          { title: "Бар с дегустацией настоек", text: "Аутентичные аппараты в духе самогонного куба, бутыли с настойками на травах и ягодах. Не просто дегустация — история в каждом глотке." },
          { title: "Фотолаборатория «Шипр»", text: "Ретро-снимки на плёнку, будто найденные в старом альбоме. Каждый гость уходит с кусочком живой памяти этого вечера." },
          { title: "Семейно-дружеское древо", text: "Заранее подготовленный макет с ветками для каждого гостя. Фотографии на клейкой основе — гости вклеивают себя в нужное место. В финале именинник получает эту картину в подарок." },
        ].map((zone, i) => (
          <div key={i} style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>
            <p style={{ fontFamily: F, fontSize: "clamp(0.65rem, 1vw, 0.78rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 3px" }}>{zone.title}</p>
            <p style={{ fontFamily: F, fontSize: "clamp(0.55rem, 0.88vw, 0.66rem)", color: "#5A3E18", lineHeight: 1.7, margin: 0 }}>{zone.text}</p>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 48%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px", padding: "28px 36px 28px 0" }}>
      <div style={{ width: "100%", height: "50%", backgroundImage: `url(${BAR_IMG})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 4, border: "2px solid rgba(201,168,76,0.4)", boxShadow: "0 4px 20px rgba(139,105,20,0.15)" }} />
      <div style={{ display: "flex", gap: "12px", flex: 1 }}>
        <div style={{ flex: 1, backgroundImage: `url(${PHOTO_LAB_IMG})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 4, border: "2px solid rgba(201,168,76,0.4)" }} />
        <div style={{ flex: 1, backgroundImage: `url(${LIVING_ROOM_IMG})`, backgroundSize: "cover", backgroundPosition: "center bottom", borderRadius: 4, border: "2px solid rgba(201,168,76,0.4)" }} />
      </div>
    </div>
  </div>
);

// ────────────── SLIDE DATA ──────────────
const slides = [
  { id: 1, component: <Slide1 /> },
  { id: 2, component: <Slide2 /> },
  { id: 3, component: <PeopleSlide title="Ведущие" people={["Артем Демихов", "Лянка Грыу", "Александр Шпуньгин"]} photoSize={{ w: "180px", h: "230px" }} /> },
  { id: 4, component: <PeopleSlide title="Ведущий" people={["Артем Маслов", "Анна Банщикова", "Алексей Удодов", "Лариса Гузеева", "Владислав Сапунов"]} photoSize={{ w: "120px", h: "155px" }} /> },
  { id: 5, component: <PeopleSlide title="Артисты" people={["Лолита", "Хор Турецкого"]} photoSize={{ w: "230px", h: "280px" }} /> },
  { id: 6, component: <PeopleSlide title="Артисты" people={["Ваенга", "Юрий Антонов", "Александр Серов", "Браво"]} photoSize={{ w: "150px", h: "190px" }} /> },
  { id: 7, component: <PeopleSlide title="Артисты" people={["Александр Маршал", "Игорь Николаев", "Пелагея", "Сосо Павлиашвили"]} photoSize={{ w: "150px", h: "190px" }} /> },
  { id: 8, component: <Slide8 /> },
  { id: 9, component: <Slide9 /> },
];

// ────────────── MAIN ──────────────
export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 280);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(Math.min(current + 1, slides.length - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, animating]);

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#1A0F03", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "min(100vw, 177.78vh)", aspectRatio: "16/9", position: "relative", overflow: "hidden", boxShadow: "0 8px 60px rgba(0,0,0,0.7)" }}>
        <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.28s ease", width: "100%", height: "100%" }}>
          {slides[current].component}
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "14px 0 10px", alignItems: "center" }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? "#C9A84C" : "rgba(201,168,76,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
        ))}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";

const HALL_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/616b9eea-fb39-447b-9825-ec196ba08851.jpg";
const OLD_ROOM_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/316d3820-8a0f-438e-8c59-67ea35e30207.jpg";
const BAR_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/f59e4a42-43cc-4f7d-a6ae-6f1364902f2d.jpg";
const PHOTO_LAB_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/6146f0c6-76d2-43f7-acfb-2125d7525175.jpg";
// Слайд 10 — тафтинг с гербом (новая картинка)
const TUFTING_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/57b78135-abaf-4937-b32a-78f077dc2d7e.jpg";
// Слайд 11 — три реальных фото
const STATUE_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/749264e6-8ee7-4f77-958f-c612c6c3484f.jpg";
const BALLOON_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/2fb1bb4d-07f2-4c1e-82eb-5ea45e4469d6.jpg";
const ROPE_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/ea53929b-f3c0-4707-9717-ae059dfba0f8.jpg";

const FM = "'Montserrat', sans-serif";  // основные тексты
const FH = "'Playfair Display', serif"; // заголовки
const SLIDE_BG = "linear-gradient(135deg, #F5EDD6 0%, #EAD9B0 40%, #F0E5C4 70%, #E8D4A0 100%)";

const GoldDivider = () => (
  <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "6px auto" }} />
);

const SlideBg = () => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 15%, rgba(201,168,76,0.16) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(201,168,76,0.1) 0%, transparent 55%)", pointerEvents: "none" }} />
);

const DecorArcs = () => (
  <>
    <div style={{ position: "absolute", bottom: -100, right: -100, width: 360, height: 360, borderRadius: "50%", border: "1.5px solid rgba(201,168,76,0.15)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: -80, left: -80, width: 280, height: 280, borderRadius: "50%", border: "1.5px solid rgba(201,168,76,0.12)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: -40, left: "30%", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }} />
  </>
);

// Тонкий декор — вертикальная линия слева
const LeftLine = () => (
  <div style={{ position: "absolute", top: "15%", bottom: "15%", left: 10, width: 2, background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.35) 70%, transparent)", pointerEvents: "none" }} />
);

// Заглушка под фото персоны
const PhotoPlaceholder = ({ name, width = "160px", height = "200px" }: { name: string; width?: string; height?: string }) => (
  <div style={{ width, height, background: "linear-gradient(145deg, #EAD9B0, #D4BA82)", border: "2px solid rgba(201,168,76,0.5)", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 5, left: 5, width: 12, height: 12, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ position: "absolute", top: 5, right: 5, width: 12, height: 12, borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ position: "absolute", bottom: 5, left: 5, width: 12, height: 12, borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ position: "absolute", bottom: 5, right: 5, width: 12, height: 12, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C", opacity: 0.6 }} />
    <div style={{ fontSize: "1.3rem", color: "#C9A84C", opacity: 0.38 }}>◈</div>
    <div style={{ fontSize: "0.45rem", color: "#6B4F1A", letterSpacing: "0.07em", textAlign: "center", lineHeight: 1.5, padding: "0 6px", textTransform: "uppercase", fontFamily: FM }}>ФОТО<br />{name}</div>
  </div>
);

// Заглушка под прямоугольную картинку
const ImgPlaceholder = ({ flex, height, width }: { flex?: number; height?: string; width?: string }) => (
  <div style={{ flex: flex ?? 1, width: width ?? undefined, height: height ?? "100%", background: "linear-gradient(145deg, #EAD9B0, #D4BA82)", borderRadius: 4, border: "2px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 7, left: 7, width: 12, height: 12, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C", opacity: 0.5 }} />
    <div style={{ position: "absolute", top: 7, right: 7, width: 12, height: 12, borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C", opacity: 0.5 }} />
    <div style={{ position: "absolute", bottom: 7, left: 7, width: 12, height: 12, borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C", opacity: 0.5 }} />
    <div style={{ position: "absolute", bottom: 7, right: 7, width: 12, height: 12, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C", opacity: 0.5 }} />
    <div style={{ fontSize: "1.4rem", color: "#C9A84C", opacity: 0.28 }}>◈</div>
    <p style={{ fontFamily: FM, fontSize: "0.48rem", color: "#8B6914", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>место для фото</p>
  </div>
);

// ────────────── SLIDE 1 ──────────────
const Slide1 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${OLD_ROOM_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.22 }} />
    <DecorArcs />
    <div style={{ position: "relative", zIndex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "0 60px" }}>
      <div style={{ width: "340px", height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)" }} />
      <h1 style={{ fontFamily: FH, fontSize: "clamp(2.6rem, 6vw, 4.8rem)", color: "#2C1A06", fontWeight: 600, lineHeight: 1.08, margin: 0, letterSpacing: "0.01em" }}>
        Гостиная Времени
      </h1>
      <GoldDivider />
      <p style={{ fontFamily: FM, fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "#7A5C2E", maxWidth: "520px", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
        Концепция дня рождения в формате тёплой домашней гостиной, где собираются самые близкие
      </p>
      <div style={{ width: "340px", height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)" }} />
    </div>
  </div>
);

// ────────────── SLIDE 2 ──────────────
const Slide2 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "6%", right: "3%", bottom: "6%", width: "40%", backgroundImage: `url(${HALL_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", borderRadius: 6, border: "2px solid rgba(201,168,76,0.35)", boxShadow: "0 4px 28px rgba(58,43,15,0.18)" }} />
    <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "62%", background: "linear-gradient(135deg, #F5EDD6, #EAD9B0)" }} />
    <div style={{ position: "absolute", top: 0, right: "38%", bottom: 0, width: "20%", background: "linear-gradient(90deg, #EAD9B0, rgba(234,217,176,0))" }} />
    <SlideBg />
    <LeftLine />
    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "12px", padding: "30px 40px", width: "56%" }}>
      <div>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Смыслы</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 8 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontFamily: FM, fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)", color: "#3A2B0F", lineHeight: 1.78 }}>
        <p style={{ margin: 0 }}>Мы делаем не стандартный юбилей, а <strong style={{ color: "#6B4F1A" }}>тёплую домашнюю гостиную</strong>, где исполняется мечта именинника. В центре — большой стол, во главе которого он. Вокруг — его семья, дети, самые близкие люди.</p>
        <p style={{ margin: 0 }}>Ему не нужно развлекать гостей — он просто наблюдает, как все собираются, общаются, смеются, как подрастают дети, и чувствует, что всем <strong style={{ color: "#6B4F1A" }}>комфортно и кайфово</strong>.</p>
        <p style={{ margin: 0 }}>Картины оживают как <strong style={{ color: "#6B4F1A" }}>театральный перформанс</strong> — за стеклом появляется актёр, тень, видеовставка или живая сцена, рассказывающая истории именинника.</p>
        <p style={{ margin: 0 }}>Над всем этим — <strong style={{ color: "#6B4F1A" }}>фамильный герб</strong>. Старые часы отсчитывают не минуты, а эпохи. Потёртое кресло хранит тепло локтей. Рамки с выцветшими снимками вдруг оживают голосами друзей.</p>
        <p style={{ margin: 0, color: "#6B4F1A", fontWeight: 700 }}>Именно это мы и предлагаем — честно, душевно, с выдумкой и без пафоса.</p>
      </div>
    </div>
  </div>
);

// ────────────── SLIDES 3–7 ──────────────
const PeopleSlide = ({ title, people, photoSize }: { title: string; people: string[]; photoSize: { w: string; h: string } }) => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", gap: "16px", padding: "16px 28px" }}>
    <SlideBg />
    <DecorArcs />
    <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
      <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>{title}</h2>
      <GoldDivider />
    </div>
    <div style={{ position: "relative", zIndex: 2, display: "flex", gap: people.length <= 3 ? "48px" : "22px", justifyContent: "center", alignItems: "flex-end", flexWrap: "nowrap" }}>
      {people.map((name, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <PhotoPlaceholder name={name} width={photoSize.w} height={photoSize.h} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.75rem, 1.15vw, 0.95rem)", color: "#2C1A06", fontWeight: 600, margin: 0, maxWidth: "180px", lineHeight: 1.3 }}>{name}</p>
            <div style={{ width: 30, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "5px auto 0" }} />
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
    <LeftLine />
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 58%", display: "flex", flexDirection: "column", gap: "14px", padding: "30px 40px" }}>
      <div>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Welcome</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 12 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "13px", fontFamily: FM, fontSize: "clamp(0.72rem, 1.12vw, 0.88rem)", color: "#3A2B0F", lineHeight: 1.8 }}>
        <p style={{ margin: 0 }}>Ещё до того, как вечер официально начнётся, гостей встречают хостес — вручают небольшую карточку с указанием <strong style={{ color: "#6B4F1A" }}>сектора, где их ждёт место за столом</strong>. Это первый жест внимания, который сразу задаёт тон всему вечеру.</p>
        <p style={{ margin: 0 }}>В пространстве welcome-зоны расставлены <strong style={{ color: "#6B4F1A" }}>изысканные закуски</strong>, а фотографы и видеографы уже работают — каждый момент встречи, каждый взгляд и улыбка сохраняются в памяти.</p>
        <p style={{ margin: 0 }}>Параллельно снимается <strong style={{ color: "#6B4F1A" }}>SDE</strong> — трогательный фильм о жизни именинника, который будет показан гостям прямо в этот же вечер.</p>
        <p style={{ margin: 0 }}>И где-то среди гостей появляется символ праздника — <strong style={{ color: "#6B4F1A" }}>медведь, конь или олень</strong>. Неожиданный, тёплый, запоминающийся навсегда.</p>
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 42%", display: "flex", alignItems: "center", padding: "24px 32px 24px 0" }}>
      <ImgPlaceholder flex={undefined} width="100%" height="82%" />
    </div>
  </div>
);

// ────────────── SLIDE 9: WELCOME ZONES ──────────────
const Slide9 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <LeftLine />
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 52%", display: "flex", flexDirection: "column", gap: "12px", padding: "28px 36px" }}>
      <div>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Welcome</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 14 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {[
          { title: "Бар с дегустацией настоек", text: "Аутентичные аппараты в духе самогонного куба, бутыли с настойками на травах и ягодах. Не просто дегустация — история в каждом глотке." },
          { title: "Фотолаборатория «Шипр»", text: "Ретро-снимки на плёнку, будто найденные в старом альбоме. Каждый гость уходит с кусочком живой памяти этого вечера." },
          { title: "Семейно-дружеское древо", text: "Заранее подготовленный макет с ветками для каждого гостя. Фотографии на клейкой основе — гости вклеивают себя в нужное место. В финале именинник получает эту картину в подарок." },
        ].map((zone, i) => (
          <div key={i} style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "14px" }}>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.82rem, 1.25vw, 1rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>{zone.title}</p>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.08vw, 0.86rem)", color: "#5A3E18", lineHeight: 1.78, margin: 0 }}>{zone.text}</p>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 48%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px", padding: "28px 32px 28px 0" }}>
      <ImgPlaceholder flex={undefined} width="100%" height="50%" />
      <div style={{ display: "flex", gap: "12px", flex: 1 }}>
        <ImgPlaceholder />
        <ImgPlaceholder />
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 10: ТВОРЧЕСКИЕ ЗОНЫ ──────────────
const Slide10 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <DecorArcs />
    <LeftLine />
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 54%", display: "flex", flexDirection: "column", gap: "14px", padding: "30px 40px" }}>
      <div>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Welcome</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 14 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "14px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.82rem, 1.25vw, 1rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 6px" }}>Живопись: семейное полотно</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.08vw, 0.86rem)", color: "#5A3E18", lineHeight: 1.8, margin: 0 }}>
            Художник создаёт большое семейное полотно прямо на вечере — или делает скетчи гостей. Каждый портрет становится частью единой истории, которую именинник унесёт с собой как главный подарок вечера.
          </p>
        </div>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "14px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.82rem, 1.25vw, 1rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 6px" }}>Мастер-класс: тафтинг</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.08vw, 0.86rem)", color: "#5A3E18", lineHeight: 1.8, margin: 0 }}>
            Гости создают собственный арт-объект — коврик в технике тафтинг. Мастер направляет, каждый вносит свой стежок в общее произведение. В итоге — уникальная вещь, сделанная руками всех, кто был на этом вечере.
          </p>
        </div>
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 46%", display: "flex", alignItems: "center", padding: "24px 36px 24px 0" }}>
      <div style={{ width: "100%", height: "88%", backgroundImage: `url(${TUFTING_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", borderRadius: "6px", border: "2px solid rgba(201,168,76,0.45)", boxShadow: "0 6px 32px rgba(139,105,20,0.18)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(transparent, rgba(20,10,0,0.5))" }} />
        <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.58rem, 0.9vw, 0.72rem)", color: "rgba(255,240,200,0.9)", margin: 0, fontWeight: 600, letterSpacing: "0.04em" }}>
            Мастер-класс по тафтингу — фамильный герб
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 11: WELCOME — ЖИВЫЕ ОБРАЗЫ ──────────────
const Slide11 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <DecorArcs />
    <LeftLine />
    <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px 44px", gap: "18px" }}>
      {/* Заголовок */}
      <div>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Welcome</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 4 }} />
      </div>
      {/* Три блока с фото */}
      <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
        {[
          {
            img: STATUE_IMG,
            title: "Живые статуи / картины",
            text: "Артисты в образах, созданных специально в честь Владимира и его семьи. Они замирают в пространстве, как ожившие картины — и вдруг оживают, когда меньше всего ждёшь.",
          },
          {
            img: BALLOON_IMG,
            title: "Гимнастка на шаре",
            text: "Воздушная гимнастка работает на большом шаре, брендированном фамильным гербом. Грация, высота и символ рода — в одном незабываемом образе.",
          },
          {
            img: ROPE_IMG,
            title: "Канатоходец",
            text: "Артист балансирует на канате, натянутом между конструкциями. Каждый шаг — над головами гостей, над временем, над обычным вечером.",
          },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Фото */}
            <div style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              borderRadius: 6,
              border: "2px solid rgba(201,168,76,0.4)",
              boxShadow: "0 4px 18px rgba(58,43,15,0.12)",
              flexShrink: 0,
              overflow: "hidden",
            }} />
            {/* Текст */}
            <div style={{ borderTop: "2px solid rgba(201,168,76,0.5)", paddingTop: "8px" }}>
              <p style={{ fontFamily: FM, fontSize: "clamp(0.75rem, 1.15vw, 0.9rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>{item.title}</p>
              <p style={{ fontFamily: FM, fontSize: "clamp(0.62rem, 0.95vw, 0.75rem)", color: "#5A3E18", lineHeight: 1.7, margin: 0 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 12: БЛОК 1 — НАЧАЛО ПУТИ ──────────────
const ROOM_DECOR_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/f89bf134-7f67-4c27-b2b2-c552fe113f82.jpg";
const TUFTING_HERALDIC_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/bucket/57b78135-abaf-4937-b32a-78f077dc2d7e.jpg";

const Slide12 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <LeftLine />
    {/* Левая часть — текст */}
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 54%", display: "flex", flexDirection: "column", gap: "12px", padding: "28px 36px" }}>
      <div>
        <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase" }}>I блок</p>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Начало пути</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 12 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontFamily: FM, fontSize: "clamp(0.7rem, 1.1vw, 0.84rem)", color: "#3A2B0F", lineHeight: 1.82 }}>
        <p style={{ margin: 0 }}>
          Гости входят в зал и занимают места по секторам — каждый на своём, заранее обозначенном месте. Пространство уже дышит историей: мягкий свет, тишина предвкушения, запах тёплого дерева и воска.
        </p>
        <p style={{ margin: 0 }}>
          Вечер открывает <strong style={{ color: "#6B4F1A" }}>погружающий номер</strong>. По залу развешены картины — рамы, которые кажутся обычными. Но один за другим экраны начинают оживать.
        </p>
        <p style={{ margin: 0 }}>
          Голос рассказывает: это место, где хранятся самые тёплые воспоминания. Здесь живут моменты, которые невозможно забыть — первые шаги, смех за большим столом, летние вечера, когда все были вместе. И сегодня <strong style={{ color: "#6B4F1A" }}>мечта именинника сбылась</strong> — большая гостиная наполнена теми, кого он любит больше всего на свете.
        </p>
        <p style={{ margin: 0, color: "#6B4F1A", fontStyle: "italic", fontFamily: FH, fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)" }}>
          «Именно об этом он мечтал — чтобы все собрались. И вот — все здесь.»
        </p>
      </div>
    </div>
    {/* Правая часть — камин с гербом над ним */}
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 46%", display: "flex", flexDirection: "column", gap: 0, padding: "20px 28px 20px 0" }}>
      {/* Камин — основа */}
      <div style={{ flex: 1, backgroundImage: `url(${ROOM_DECOR_IMG})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 6, border: "2px solid rgba(201,168,76,0.4)", boxShadow: "0 6px 24px rgba(58,43,15,0.16)", position: "relative", overflow: "hidden" }}>
        {/* Фамильный герб поверх, над камином — как картина */}
        <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: "48%", aspectRatio: "1", backgroundImage: `url(${TUFTING_HERALDIC_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", borderRadius: 4, border: "3px solid rgba(201,168,76,0.8)", boxShadow: "0 4px 20px rgba(20,10,0,0.5)" }} />
        {/* Подпись под гербом */}
        <p style={{ position: "absolute", top: "calc(8% + 48% + 8px)", left: "50%", transform: "translateX(-50%)", fontFamily: FM, fontSize: "0.5rem", color: "rgba(201,168,76,0.9)", margin: 0, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Фамильный герб</p>
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 13: БЛОК 1 — СЕМЕЙНОЕ ДРЕВО ──────────────
const OAK_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/ecdbc15e-bfc8-4623-89c0-742804638a10.jpg";

const Slide13 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <LeftLine />
    {/* Левая часть — текст */}
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 52%", display: "flex", flexDirection: "column", gap: "12px", padding: "24px 36px" }}>
      <div>
        <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase" }}>I блок</p>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Начало пути</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 12 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontFamily: FM, fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.82 }}>
        <p style={{ margin: 0 }}>
          На сцене начинает рисоваться <strong style={{ color: "#6B4F1A" }}>родовое древо</strong> — могучий русский дуб. Он растёт медленно: ветвь за ветвью, имя за именем. Корни уходят глубоко в землю, ствол становится шире и прочнее с каждым поколением. Это история рода — живая, настоящая, сплетённая из судеб.
        </p>
        <p style={{ margin: 0 }}>
          Под звуки композиции <strong style={{ color: "#6B4F1A" }}>«Мои года, моё богатство»</strong> — в исполнении Хора Турецкого или солиста-оперного певца — зал наполняется особым теплом. Слова о времени, о том, что по-настоящему ценно, звучат как признание.
        </p>
        <p style={{ margin: 0 }}>
          На сцену выходят <strong style={{ color: "#6B4F1A" }}>танцовщики с большими листьями</strong> — золотыми, трепещущими, как живые. Они кружатся, переплетаются, создают образ дерева в движении. В финале каждый снимает верхний слой листа — и под ним оказывается <strong style={{ color: "#6B4F1A" }}>фотография</strong>: лица, моменты, история.
        </p>
      </div>
    </div>
    {/* Правая часть — только герб, без человека */}
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 48%", padding: "18px 28px 18px 0" }}>
      <div style={{ width: "100%", height: "100%", backgroundImage: `url(${OAK_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", borderRadius: 6, border: "2px solid rgba(201,168,76,0.4)", boxShadow: "0 6px 28px rgba(58,43,15,0.18)", position: "relative", overflow: "hidden" }}>
        {/* Обрезаем низ — убираем человека */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "32%", background: "linear-gradient(transparent, #EAD9B0)" }} />
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 14: БЛОК 1 — ЗОЛОТОЕ ДЕРЕВО ──────────────
const SWING_HAZE_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/b2972313-fb93-4b92-82b2-fc9f656710c3.jpg";

const Slide14 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    {/* Образ качелей — во всю высоту, лёгкая дымка */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${SWING_HAZE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55 }} />
    {/* Светлый беж-оверлей */}
    <div style={{ position: "absolute", inset: 0, background: "rgba(245,237,214,0.5)" }} />
    {/* Оверлей слева для читаемости текста */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(245,237,214,0.55) 0%, rgba(245,237,214,0.3) 45%, transparent 100%)" }} />
    {/* Дополнительная дымка */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)" }} />
    {/* Декор кольца */}
    <div style={{ position: "absolute", bottom: -80, right: -80, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.12)", pointerEvents: "none" }} />
    {/* Контент — слева */}
    <div style={{ position: "relative", zIndex: 2, width: "52%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px 40px", gap: "16px" }}>
      <div>
        <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase" }}>I блок</p>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Начало пути</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 0 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "14px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.1vw, 0.86rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 5px" }}>Дуэт ведущих</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.64rem, 0.98vw, 0.76rem)", color: "#3A2B0F", lineHeight: 1.78, margin: 0 }}>
            Из-за кулис раздаются два голоса — они перебивают друг друга, но не мешают, а дополняют. Ведущие начинают рассказывать <strong style={{ color: "#6B4F1A" }}>сказку про Золотое дерево</strong>: один подхватывает фразу, другой продолжает. История звучит как старинная легенда — про корни, про силу, про то, что остаётся.
          </p>
        </div>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "14px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.1vw, 0.86rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 5px" }}>Качели опускаются в зал</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.64rem, 0.98vw, 0.76rem)", color: "#3A2B0F", lineHeight: 1.78, margin: 0 }}>
            В середине повествования ведущие появляются перед гостями, рассказывая часть про качели — и в этот момент медленно опускаются <strong style={{ color: "#6B4F1A" }}>резные золотые качели</strong>. Ведущие взаимодействуют с гостями вокруг них.
          </p>
        </div>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "14px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.1vw, 0.86rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 5px" }}>Полёт по времени</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.64rem, 0.98vw, 0.76rem)", color: "#3A2B0F", lineHeight: 1.78, margin: 0 }}>
            Разговор ведущих плавно подводит к воспоминаниям. Под контент с фактами из жизни именинника <strong style={{ color: "#6B4F1A" }}>в зале появляется гимнастка на качелях</strong> — грациозно, невесомо, пока звучат истории, которые знают только близкие.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 15: БЛОК 1 — ИСТОРИЯ ИЗ ДЕТСТВА ──────────────
const APPLE_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/30da9912-b57c-4d91-a502-eaf94ee59585.jpg";

const Slide15 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${APPLE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.28 }} />
    <div style={{ position: "absolute", inset: 0, background: "rgba(245,237,214,0.72)" }} />
    <SlideBg />
    {/* Заголовок — компактный */}
    <div style={{ position: "relative", zIndex: 2, padding: "14px 40px 0", flexShrink: 0 }}>
      <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: 0, textTransform: "uppercase" }}>I блок · Начало пути</p>
      <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 5 }} />
    </div>
    {/* Два столбца — занимают весь оставшийся слайд */}
    <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", gap: "24px", padding: "12px 40px 18px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0", justifyContent: "space-evenly" }}>
        {[
          { title: "Номер с экранами", text: "На прозрачных экранах оживают мама и папа. Место действия — поле с хлопком и яблоневый сад. В зале появляется актёр — ребёнок Владимир (~8 класс), который взаимодействует с ожившими образами." },
          { title: "Мама Екатерина и платок", text: "На прозрачном экране появляется образ мамы Екатерины. После тёплого повествования ребёнок вручает ей платок — живой жест через экран, связывающий прошлое и настоящее." },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.78rem, 1.15vw, 0.9rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>{item.title}</p>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.78, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0", justifyContent: "space-evenly" }}>
        {[
          { title: "Папа Анатолий и яблоко", text: "Ребёнок начинает есть яблоко — и с экрана звучит голос папы Анатолия: «Уже на одно меньше». Две истории — на экране и в жизни — сплетаются в один момент." },
          { title: "Поздравление сыновей", text: "Сыновья сегодня — его отражение и его дело. Поздравление сыновей (без семьи). В финале появляются мальчики разных возрастов — вместе с настоящими внуками." },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.78rem, 1.15vw, 0.9rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>{item.title}</p>
            <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.78, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 16: БЛОК 1 — ЕДИНСТВЕННАЯ ЛЮБОВЬ ──────────────
const STEPPE_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/022e195c-3f5d-4079-a272-aeedb248c805.jpg";

const Slide16 = () => (
  <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: SLIDE_BG }}>
    {/* Фото степи/Казахстана — тёплый фон */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${STEPPE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.45 }} />
    {/* Светлый беж-оверлей */}
    <div style={{ position: "absolute", inset: 0, background: "rgba(245,237,214,0.6)" }} />
    <SlideBg />
    <div style={{ position: "absolute", bottom: -80, right: -80, width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.18)", pointerEvents: "none" }} />
    <LeftLine />
    {/* Контент */}
    <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px 44px", gap: "18px" }}>
      <div>
        <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase" }}>I блок</p>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#2C1A06", fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Начало пути</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 8, marginBottom: 0 }} />
      </div>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 34%", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)", color: "#3A2B0F", lineHeight: 1.85, margin: 0 }}>
            Ведущие рассказывают, что сыновья появятся в истории жизни героя чуть позже. А <strong style={{ color: "#6B4F1A" }}>первой была она</strong> — его единственная любовь.
          </p>
          <p style={{ fontFamily: FH, fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)", color: "#7A5C2E", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            Душевно-лиричное стихотворение про Казахстан — про землю, где всё началось.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", gap: "16px" }}>
          {[
            {
              title: "Детский хор",
              text: "Мальчишки, вышедшие со сцены, исполняют лиричную песню про любовь. Чистые голоса — как отражение самого светлого, что есть в жизни.",
            },
            {
              title: "Поздравление супруги",
              text: "Тёплый, личный, настоящий момент — слова, которые предназначены только ей. Та самая единственная, с которой всё и началось.",
            },
            {
              title: "Лолита",
              text: "Финальный аккорд блока — выступление Лолиты.",
            },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 8, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }} />
              <p style={{ fontFamily: FM, fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.08vw, 0.84rem)", color: "#5A3E18", lineHeight: 1.78, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 17: БЛОК 2 — СТАНОВЛЕНИЕ ──────────────
const SEA_PAINTING_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/be56cea2-181b-4883-adce-39c4bfd95b36.jpg";

const Slide17 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    <DecorArcs />
    <LeftLine />
    {/* Левая часть — текст */}
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 55%", display: "flex", flexDirection: "column", gap: "13px", padding: "26px 36px" }}>
      <div>
        <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 4px", textTransform: "uppercase" }}>II блок</p>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Становление</h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", marginTop: 7, marginBottom: 10 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontFamily: FM, fontSize: "clamp(0.7rem, 1.1vw, 0.84rem)", color: "#3A2B0F", lineHeight: 1.82 }}>
        <p style={{ margin: 0 }}>
          Вдохновившись любимым местом именинника в детстве — <strong style={{ color: "#6B4F1A" }}>речкой Чебенькой</strong> — мы исполним одну из его любимых песен о Море. Жизнь всегда начинается с малого, течёт и постепенно становится как море — или даже океан.
        </p>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.1vw, 0.86rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>«О море, море»</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.64rem, 0.98vw, 0.78rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0 }}>
            Исполняет <strong style={{ color: "#6B4F1A" }}>Хор Турецкого</strong> или оперный певец — альтернативный вариант по выбору.
          </p>
        </div>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.1vw, 0.86rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>Контент и кинетика</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.64rem, 0.98vw, 0.78rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0 }}>
            На экранах рисуется <strong style={{ color: "#6B4F1A" }}>детский рисунок моря</strong> — мазками, как будто рукой ребёнка. Дополняется использованием <strong style={{ color: "#6B4F1A" }}>кинетики</strong>.
          </p>
        </div>
        <div style={{ borderLeft: "2px solid #C9A84C", paddingLeft: "12px" }}>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.72rem, 1.1vw, 0.86rem)", color: "#2C1A06", fontWeight: 700, margin: "0 0 4px" }}>Поздравление</p>
          <p style={{ fontFamily: FM, fontSize: "clamp(0.64rem, 0.98vw, 0.78rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0 }}>
            Поздравление от <strong style={{ color: "#6B4F1A" }}>сестры и супруга</strong> — в формате историй из детства. Рассказывают, не выходя на сцену, создавая атмосферу живого, домашнего разговора.
          </p>
        </div>
      </div>
    </div>
    {/* Правая часть — детский рисунок моря */}
    <div style={{ position: "relative", zIndex: 2, flex: "0 0 45%", padding: "20px 28px 20px 0" }}>
      <div style={{ width: "100%", height: "100%", backgroundImage: `url(${SEA_PAINTING_IMG})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 6, border: "2px solid rgba(201,168,76,0.4)", boxShadow: "0 6px 28px rgba(58,43,15,0.18)" }} />
    </div>
  </div>
);

// ────────────── SLIDE 18: БЛОК 2 — ШКОЛЬНЫЙ ОПРОС ──────────────
const SCHOOL_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/898fa0a1-7cad-46ca-915d-ba0f27fa2acd.jpg";

const Slide18 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
    <SlideBg />
    {/* Фото класса — лёгкий фон */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${SCHOOL_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
    <div style={{ position: "absolute", inset: 0, background: "rgba(245,237,214,0.78)" }} />
    {/* Верхняя полоса — заголовок */}
    <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "flex-end", gap: "20px", padding: "18px 40px 12px", borderBottom: "2px solid rgba(201,168,76,0.3)", flexShrink: 0 }}>
      <div>
        <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase" }}>II блок · Становление</p>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Школьный опрос</h2>
      </div>
      <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#7A5C2E", margin: "0 0 4px", fontStyle: "italic", flex: 1 }}>
        Ведущая перевоплощается в учительницу — с указкой, журналом и строгим взглядом
      </p>
    </div>
    {/* Три карточки внизу */}
    <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", gap: "16px", padding: "16px 40px 20px" }}>
      {/* Карточка 1 — учительница */}
      <div style={{ flex: "0 0 38%", display: "flex", flexDirection: "column", gap: "10px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 8, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
        <p style={{ fontFamily: FM, fontSize: "clamp(0.8rem, 1.2vw, 0.94rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>Интерактивный блиц</p>
        <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0, flex: 1 }}>
          Ведущая задаёт вопросы про именинника — гости отвечают, ошибаются, смеются. Атмосфера живого урока. Блиц органично переходит в <strong style={{ color: "#6B4F1A" }}>театральный номер</strong>.
        </p>
      </div>
      {/* Карточка 2 — номер */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 8, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
        <p style={{ fontFamily: FM, fontSize: "clamp(0.8rem, 1.2vw, 0.94rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>Номер про учёбу и профессию</p>
        <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0, flex: 1 }}>
          Артисты с реквизитом разыгрывают путь — от парты до чертёжного стола. На экранах детские рисунки постепенно превращаются в <strong style={{ color: "#6B4F1A" }}>профессиональные чертежи</strong>.
        </p>
      </div>
      {/* Карточка 3 — поздравление */}
      <div style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", gap: "10px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 8, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
        <p style={{ fontFamily: FM, fontSize: "clamp(0.8rem, 1.2vw, 0.94rem)", color: "#2C1A06", fontWeight: 700, margin: 0 }}>Поздравление от друзей</p>
        <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0, flex: 1 }}>
          Слово берут <strong style={{ color: "#6B4F1A" }}>школьные и институтские друзья</strong> — те, с кем всё начиналось. Живые истории, которые не придумать.
        </p>
      </div>
    </div>
  </div>
);

// ────────────── SLIDE 19: БЛОК 2 — ПОПУРРИ ──────────────
const CONSTRUCTION_IMG = "https://cdn.poehali.dev/projects/b9e604be-bb2d-4161-84c1-bbe2c0c53faa/files/79d0ae8e-a100-4b4c-95b7-2f21e38eed05.jpg";

const Slide19 = () => (
  <div style={{ width: "100%", height: "100%", background: SLIDE_BG, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
    {/* Фото стройки — тёплый фон */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${CONSTRUCTION_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.22 }} />
    <div style={{ position: "absolute", inset: 0, background: "rgba(245,237,214,0.78)" }} />
    <SlideBg />
    {/* Заголовок-шапка */}
    <div style={{ position: "relative", zIndex: 2, padding: "18px 40px 0", flexShrink: 0 }}>
      <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#C9A84C", fontWeight: 700, margin: "0 0 3px", textTransform: "uppercase" }}>II блок · Становление</p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h2 style={{ fontFamily: FH, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#2C1A06", fontWeight: 600, margin: 0 }}>Номер про стройку</h2>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
        <p style={{ fontFamily: FM, fontSize: "clamp(0.68rem, 1vw, 0.8rem)", color: "#7A5C2E", margin: 0, fontStyle: "italic" }}>Попурри из песен</p>
      </div>
      <div style={{ width: "100%", height: 2, background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2), transparent)", marginTop: 8 }} />
    </div>
    {/* Три акта попурри */}
    <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", gap: "0", padding: "14px 40px 18px" }}>
      {[
        {
          num: "01",
          song: "Казахстан",
          action: "Выносим плов",
          text: "Торжественный выход с дымящимся блюдом. Тепло Казахстана — на столе и в сердцах. Начало пути через вкус и запах родины.",
          accent: "#C9A84C",
        },
        {
          num: "02",
          song: "Эх, дороги",
          action: "Смена дислокации",
          text: "На экранах — смена контента: новые города, новые объекты, новые горизонты. Жизнь в движении, дороги, которые ведут вперёд.",
          accent: "#B8943C",
        },
        {
          num: "03",
          song: "Сургут",
          action: "Кубы → логотип компании",
          text: "Танцовщики с кубами выстраивают в финале номера логотип компании. Дело всей жизни складывается в единый образ прямо перед залом.",
          accent: "#A07C28",
        },
      ].map((act, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 18px 0 0", borderRight: i < 2 ? "1px solid rgba(201,168,76,0.25)" : "none", marginRight: i < 2 ? "18px" : 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
            <span style={{ fontFamily: FH, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", color: "rgba(201,168,76,0.3)", fontWeight: 400, lineHeight: 1 }}>{act.num}</span>
            <div>
              <p style={{ fontFamily: FH, fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", color: "#2C1A06", fontWeight: 600, margin: 0, lineHeight: 1.2 }}>«{act.song}»</p>
              <p style={{ fontFamily: FM, fontSize: "clamp(0.62rem, 0.95vw, 0.74rem)", color: "#C9A84C", fontWeight: 700, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>{act.action}</p>
            </div>
          </div>
          <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${act.accent}, transparent)`, marginBottom: "10px" }} />
          <p style={{ fontFamily: FM, fontSize: "clamp(0.68rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.8, margin: 0, flex: 1 }}>{act.text}</p>
        </div>
      ))}
    </div>
    {/* Нижняя полоска — поздравление */}
    <div style={{ position: "relative", zIndex: 2, margin: "0 40px 16px", padding: "10px 16px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 6, display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: 3, height: "100%", minHeight: "24px", background: "#C9A84C", borderRadius: 2, flexShrink: 0 }} />
      <p style={{ fontFamily: FM, fontSize: "clamp(0.7rem, 1.05vw, 0.82rem)", color: "#3A2B0F", lineHeight: 1.7, margin: 0 }}>
        <strong style={{ color: "#6B4F1A" }}>Поздравление от коллег</strong> — те, кто строил рядом, знает цену каждому решению и каждой победе.
      </p>
    </div>
  </div>
);

// ────────────── SLIDES ──────────────
const slides = [
  { id: 1, component: <Slide1 /> },
  { id: 2, component: <Slide2 /> },
  { id: 3, component: <PeopleSlide title="Ведущие" people={["Артем Демихов", "Лянка Грыу", "Александр Шпуньгин", "Владислав Сапунов"]} photoSize={{ w: "155px", h: "200px" }} /> },
  { id: 4, component: <PeopleSlide title="Ведущие" people={["Артем Маслов", "Анна Банщикова", "Алексей Удодов", "Лариса Гузеева"]} photoSize={{ w: "135px", h: "172px" }} /> },
  { id: 5, component: <PeopleSlide title="Артисты" people={["Лолита", "Хор Турецкого"]} photoSize={{ w: "240px", h: "290px" }} /> },
  { id: 6, component: <PeopleSlide title="Артисты" people={["Ваенга", "Юрий Антонов", "Александр Серов", "Браво"]} photoSize={{ w: "155px", h: "195px" }} /> },
  { id: 7, component: <PeopleSlide title="Артисты" people={["Александр Маршал", "Игорь Николаев", "Пелагея", "Сосо Павлиашвили"]} photoSize={{ w: "155px", h: "195px" }} /> },
  { id: 8, component: <Slide8 /> },
  { id: 9, component: <Slide9 /> },
  { id: 10, component: <Slide10 /> },
  { id: 11, component: <Slide11 /> },
  { id: 12, component: <Slide12 /> },
  { id: 13, component: <Slide13 /> },
  { id: 14, component: <Slide14 /> },
  { id: 15, component: <Slide15 /> },
  { id: 16, component: <Slide16 /> },
  { id: 17, component: <Slide17 /> },
  { id: 18, component: <Slide18 /> },
  { id: 19, component: <Slide19 /> },
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
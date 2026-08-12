export const profile = {
  name: "Arnav Mangaonkar",
  initials: "AM",
  role: "AI / Robotics / Embedded Systems Engineer",
  positioning:
    "Engineer by Day, Photographer by Holiday.",
  heroHeadline: "Building Intelligent Systems for the Physical World.",
  heroSub:
    "(ノಠ益ಠ)ノ彡┻━┻",
  location: "Mumbai, Maharashtra, India",
  status: "Working",
  email: "mangaonkararnav@gmail.com",
  phone: "+91 86928 70096",
  links: {
    github: "https://github.com/ArnavDotExe",
    linkedin: "https://www.linkedin.com/in/arnavmangaonkar",
    instagram: "https://www.instagram.com/shillpkarr",
    email: "mailto:mangaonkararnav@gmail.com",
    resume: "/Arnav-Mangaonkar-Resume.pdf",
  },
  about: [
    "Hello There General Kenobi, I am Arnav a not so genius and obviously not a billionare or a playboy or a philanthropist, just a regular everyday guy who loves to build stuff and currently working on things that are not so everyday or regualar or (͡° ͜ʖ ͡°) by any means. ",
    "As much as I have been fasinated by Spiderman I keep my two lives separate, I'm a ML engineer by day and a photographer by night (and weekends). ",
    "aur woh kehte hai na 'jack of all trades, master of none but oftentimes better than master of one' sahi kehte hai, as I try to delve into all kinds of things and learn from it (hopefully) and apply that into my daily life."
  ],
  education: {
    // school: "SIES Graduate School of Technology",
    degree: "B.E. in Artificial Intelligence & Machine Learning",
    //location: "Navi Mumbai, MH",
    period: "2022 — 2026",
  },
  stats: [
    { label: "Years building", value: "4+" },
    { label: "Public repositories", value: "30+" },
    { label: "Shipped projects", value: "10+" },
    { label: "Published IP", value: "1" },
  ],
} as const;

export const dataSourceNote =
  "Content is sourced from Arnav's resume, public GitHub activity (github.com/ArnavDotExe), and details provided directly by Arnav. His LinkedIn profile could not be read programmatically — it requires an authenticated session and returned a sign-in wall on every automated fetch attempt — so LinkedIn-only details (e.g. certifications) are not represented here unless corroborated elsewhere.";

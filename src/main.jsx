import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Code2,
  BriefcaseBusiness,
  Menu,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";

import "./style.css";

const profile = {
  name: "Santhosh Markonda",
  role: "Full-Stack Developer",
  intro:
    "Computer Science graduate specializing in Frontend and Full-Stack Development. Experienced in JavaScript, React, Node.js, Express.js, MongoDB and SQL. Passionate about building responsive web applications and solving real-world problems.",
  email: "santhoshmarkonda786@gmail.com",
  phone: "+91 8331813411",
  location: "India",
  linkedin: "https://www.linkedin.com/in/santhosh-markonda/",
  github: "https://github.com/Santhoshmarkonda",
  leetcode: "https://leetcode.com/u/santhosh_2305/",
  resumeDrive:
    "https://drive.google.com/file/d/1FwdAFz3WPzYkyHQeQkfhTyuiyGpGbg4t/view?usp=sharing",
};

const projects = [
  {
    name: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application featuring product listings, product details, search, category filtering, sorting, and shopping cart functionality.",
    stack: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    github: "https://github.com/Santhoshmarkonda/E-commerce",
    live: "https://e-commerce-msk-5946.vercel.app/",
    label: "Full-Stack Application",
    mark: "EC",
    photo: "/projects/ecommerce.png", // ← drop this image in public/projects/
  },
  {
    name: "RiseUpp – Image Search",
    description:
      "A React-based image search application integrating the Unsplash API. Includes image search, category browsing, reusable components, and responsive layouts.",
    stack: ["React", "JavaScript", "CSS3", "Unsplash API"],
    github: "https://github.com/Santhoshmarkonda/RiseUpp-Application",
    live: "",
    label: "Frontend Application",
    mark: "RU",
    photo: "/projects/riseupp.png", // ← drop this image in public/projects/
  },
];

const skills = [
  ["HTML5", "HTML"],
  ["CSS3", "CSS"],
  ["JavaScript", "JS"],
  ["React.js", "RE"],
  ["Node.js", "N"],
  ["Express.js", "EX"],
  ["MongoDB", "M"],
  ["SQL", "DB"],
  ["Java", "J"],
];

const tools = [
  ["Git & GitHub", "GH"],
  ["VS Code", "VS"],
  ["Postman", "P"],
  ["Vercel", "V"],
];

/* ---------- Inline LeetCode glyph ---------- */
function LeetCodeIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

/* ---------- Project art with image fallback ---------- */
function ProjectArt({ project, index }) {
  const [imgFailed, setImgFailed] = React.useState(!project.photo);

  return (
    <div className={`project-art art-${index + 1}`}>
      {!imgFailed && project.photo && (
        <img
          src={project.photo}
          alt={`${project.name} preview`}
          className="project-photo"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      )}

      {/* Fallback gradient mark — shown only if image missing or failed */}
      {imgFailed && (
        <>
          <span className="project-mark">{project.mark}</span>
          <span className="project-number">0{index + 1}</span>
          <span className="project-label">{project.label}</span>
        </>
      )}

      {/* Overlay label always visible on photo version */}
      {!imgFailed && (
        <>
          <span className="project-number">0{index + 1}</span>
          <span className="project-label">{project.label}</span>
        </>
      )}
    </div>
  );
}

/* ---------- Scroll-reveal hook ---------- */
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ---------- Active nav section tracking ---------- */
function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navItems = ["Home", "About", "Skills", "Projects", "LeetCode", "Contact"];
  const active = useActiveSection(navItems.map((n) => n.toLowerCase()));
  const closeMenu = () => setMenuOpen(false);

  useReveal();

  // lock scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu}>
          SM<span>.</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          {navItems.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={closeMenu}
                className={active === id ? "active" : ""}
              >
                {item}
              </a>
            );
          })}

          <a
            href={profile.resumeDrive}
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >
            Resume <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main>
        {/* HOME */}
        <section className="hero section" id="home">
          <div className="hero-copy" data-reveal>
            <div className="eyebrow">
              <span className="status-dot" />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <p className="hello">Hello, I'm</p>

            <h1>
              Santhosh
              <br />
              <span>Markonda.</span>
            </h1>

            <h2>
              Full-Stack Developer
              <span className="slash"> / </span>
              MERN Stack
            </h2>

            <p className="hero-text">{profile.intro}</p>

            <div className="hero-actions">
              <a
                className="button primary"
                href="/resume.pdf"
                download="Santhosh_Markonda_Resume.pdf"
              >
                <Download size={17} />
                Download Resume
              </a>

              <a
                className="button secondary"
                href={profile.resumeDrive}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="social-row">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="photo-frame">
              <img
                className="profile-photo"
                src="/profile.png"
                alt="Santhosh Markonda"
                loading="eager"
              />
              <div className="photo-caption">
                <span>BUILDING FOR THE WEB</span>
              </div>
            </div>

            <div className="floating-card">
              <Code2 size={18} />
              <span>Build. Learn. Improve.</span>
            </div>

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </div>

          <a className="scroll-cue" href="#about">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </section>

        {/* ABOUT */}
        <section className="section about-section" id="about">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">01 — ABOUT ME</p>
            <h2>
              A little about <span>myself.</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-copy" data-reveal>
              <p className="lead">
                A Computer Science graduate passionate about building responsive and
                user-friendly web applications.
              </p>
              <p>
                I graduated with a specialization in Artificial Intelligence and Data
                Science. I have hands-on experience with frontend and backend
                technologies, REST API integration, and database management. I enjoy
                learning new technologies and improving my problem-solving skills.
              </p>

              <div className="about-facts">
                <div>
                  <Code2 />
                  <strong>Web Development</strong>
                  <span>Frontend & Backend</span>
                </div>
                <div>
                  <BriefcaseBusiness />
                  <strong>Career Goal</strong>
                  <span>Software Developer</span>
                </div>
                <div>
                  <MapPin />
                  <strong>Location</strong>
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="education" data-reveal>
              <p className="eyebrow">EDUCATION TIMELINE</p>
              <div className="timeline">
                <article className="timeline-item">
                  <span className="timeline-dot" />
                  <small>September 2021 — June 2025</small>
                  <h3>B.Tech – CSE (AI & Data Science)</h3>
                  <p>Kakinada Institute of Engineering and Technology</p>
                  <b>CGPA: 7.4</b>
                </article>
                <article className="timeline-item">
                  <span className="timeline-dot" />
                  <small>June 2019 — May 2021</small>
                  <h3>Intermediate – MPC</h3>
                  <p>Intermediate Education</p>
                  <b>Percentage: 95.4%</b>
                </article>
                <article className="timeline-item">
                  <span className="timeline-dot" />
                  <small>June 2018 — May 2019</small>
                  <h3>SSC</h3>
                  <p>Secondary School Education</p>
                  <b>CGPA: 9.8 / 10</b>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section skills-section" id="skills">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">02 — MY TOOLKIT</p>
            <h2>
              Skills & <span>technologies.</span>
            </h2>
            <p className="section-sub">
              Technologies and tools I use to build web applications.
            </p>
          </div>

          <div className="skill-groups">
            <div className="skill-panel" data-reveal>
              <div className="panel-title">
                <Code2 />
                <h3>Technical Skills</h3>
              </div>
              <div className="skill-grid">
                {skills.map(([name, mark]) => (
                  <div className="skill-chip" key={name}>
                    <span className="skill-logo">{mark}</span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-panel tools-panel" data-reveal>
              <div className="panel-title">
                <BriefcaseBusiness />
                <h3>Tools</h3>
              </div>
              <div className="skill-grid">
                {tools.map(([name, mark]) => (
                  <div className="skill-chip" key={name}>
                    <span className="skill-logo">{mark}</span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section projects-section" id="projects">
          <div className="section-heading project-heading" data-reveal>
            <div>
              <p className="eyebrow">03 — SELECTED WORK</p>
              <h2>
                Things I've <span>built.</span>
              </h2>
            </div>
            <p className="section-sub">
              A selection of projects where I turned concepts into working
              applications.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, i) => (
              <article className="project-card" key={project.name} data-reveal>
                <ProjectArt project={project} index={i} />

                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="tag-list">
                    {project.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github size={16} />
                      GitHub
                    </a>
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        Live Demo
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <span className="project-unavailable">No live deployment</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section className="section github-section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">04 — OPEN SOURCE</p>
            <h2>
              My GitHub <span>activity.</span>
            </h2>
          </div>

          <div className="github-panel" data-reveal>
            <div className="github-top">
              <div>
                <Github />
                <div>
                  <h3>Santhoshmarkonda</h3>
                  <p>Code, consistency and continuous learning.</p>
                </div>
              </div>
              <a href={profile.github} target="_blank" rel="noreferrer">
                Visit GitHub
                <ArrowUpRight size={15} />
              </a>
            </div>

            <img
              className="github-stats"
              src="https://github-readme-stats.vercel.app/api?username=Santhoshmarkonda&show_icons=true&hide_border=true&bg_color=141828&title_color=9baaff&text_color=e7e9f2&icon_color=9baaff"
              alt="GitHub statistics"
              loading="lazy"
            />

            <div className="calendar-wrap">
              <p className="eyebrow">CONTRIBUTION ACTIVITY</p>
              <img
                src="https://ghchart.rshah.org/9baaff/Santhoshmarkonda"
                alt="GitHub contribution calendar"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* LEETCODE */}
        <section className="section leetcode-section" id="leetcode">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">05 — PROBLEM SOLVING</p>
            <h2>
              My LeetCode <span>journey.</span>
            </h2>
            <p className="section-sub">
              Sharpening data structures & algorithms skills — one problem at a time.
            </p>
          </div>

          <div className="github-panel leetcode-panel" data-reveal>
            <div className="github-top">
              <div>
                <LeetCodeIcon />
                <div>
                  <h3>santhosh_2305</h3>
                  <p>Consistent practice in DSA & problem solving.</p>
                </div>
              </div>
              <a href={profile.leetcode} target="_blank" rel="noreferrer">
                Visit LeetCode
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="leetcode-cards">
              <img
                className="leetcode-stats"
                src="https://leetcard.jacoblin.cool/santhosh_2305?theme=dark&font=DM%20Sans&ext=activity"
                alt="LeetCode statistics and activity"
                loading="lazy"
              />
            </div>

            <div className="calendar-wrap leetcode-wrap">
              <p className="eyebrow">SOLVED PROBLEMS</p>
              <div className="leetcode-solved-row">
                <span className="lc-pill easy">Easy</span>
                <span className="lc-pill medium">Medium</span>
                <span className="lc-pill hard">Hard</span>
              </div>
              <p className="leetcode-hint">
                Live stats load from LeetCode. Click{" "}
                <a href={profile.leetcode} target="_blank" rel="noreferrer">
                  view profile
                </a>{" "}
                to see full breakdown.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">06 — GET IN TOUCH</p>
            <h2>
              Let's build something <span>great.</span>
            </h2>
            <p className="section-sub">
              Have an opportunity or want to connect? Send me a message.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-details" data-reveal>
              <a href={`mailto:${profile.email}`}>
                <span className="contact-icon">
                  <Mail />
                </span>
                <span>
                  <small>EMAIL</small>
                  <strong>{profile.email}</strong>
                </span>
              </a>
              <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>
                <span className="contact-icon">
                  <Phone />
                </span>
                <span>
                  <small>PHONE</small>
                  <strong>{profile.phone}</strong>
                </span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <span className="contact-icon">
                  <Linkedin />
                </span>
                <span>
                  <small>LINKEDIN</small>
                  <strong>Connect with me</strong>
                </span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <span className="contact-icon">
                  <Github />
                </span>
                <span>
                  <small>GITHUB</small>
                  <strong>Explore my code</strong>
                </span>
              </a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer">
                <span className="contact-icon">
                  <LeetCodeIcon size={18} />
                </span>
                <span>
                  <small>LEETCODE</small>
                  <strong>View my problem solving</strong>
                </span>
              </a>
            </div>

            <form
              className="contact-form"
              action={`mailto:${profile.email}`}
              method="post"
              encType="text/plain"
              data-reveal
            >
              <label>
                Your name
                <input name="name" placeholder="Enter your name" required />
              </label>
              <label>
                Your email
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label>
                Your message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your idea..."
                  required
                />
              </label>
              <button className="button primary" type="submit">
                Send Message
                <ArrowUpRight size={17} />
              </button>
              <small className="form-note">
                The form opens your email application. Connect a form service or
                backend for direct message submission.
              </small>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <a className="brand" href="#home">
          SM<span>.</span>
        </a>
        <p>
          Designed & built by Santhosh Markonda <Sparkles size={11} /> © 2026
        </p>
        <a href="#home" className="back-top">
          BACK TO TOP ↑
        </a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
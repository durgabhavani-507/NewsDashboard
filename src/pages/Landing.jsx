import React from "react";
import About from "./About";
import Contact from "./Contact";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      {/* ===== HOME SECTION (BOOTSTRAP 5 SLIDE CAROUSEL) ===== */}
      <section id="home" className="landing-banner">
        <div
          id="landingCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
          data-bs-pause="false"
        >
          {/* SLIDES */}
          <div className="carousel-inner">
            {/* SLIDE 1 */}
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                className="d-block w-100 banner-image"
                alt="Breaking News"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Trusted News. Real Stories.</h1>
                <p>Accurate and verified global news.</p>

                <Link to="/login" className="banner-btn primary">
                  Get Started
                </Link>

                {/* 👇 SLIDE BARS BELOW TEXT */}
                <div className="carousel-indicators custom-indicators">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      type="button"
                      data-bs-target="#landingCarousel"
                      data-bs-slide-to={i}
                      className={i === 0 ? "active" : ""}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
                className="d-block w-100 banner-image"
                alt="World News"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>World Updates</h1>
                <p>Breaking stories from every corner.</p>
              </div>
            </div>

            {/* SLIDE 3 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
                className="d-block w-100 banner-image"
                alt="Journalism"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Honest Journalism</h1>
                <p>Facts first. No noise.</p>
              </div>
            </div>

            {/* SLIDE 4 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                className="d-block w-100 banner-image"
                alt="Technology"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Tech & Innovation</h1>
                <p>Latest trends that shape tomorrow.</p>
              </div>
            </div>

            {/* SLIDE 5 */}
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                className="d-block w-100 banner-image"
                alt="Business"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Business & Economy</h1>
                <p>Market insights you can trust.</p>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#landingCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#landingCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="section-wrapper">
        <About />
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="section-wrapper">
        <Contact />
      </section>
    </>
  );
}

export default Landing;

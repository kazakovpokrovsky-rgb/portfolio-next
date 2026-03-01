'use client'

import { useState } from 'react'
import { urlFor } from '../sanity/client'

const styles = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root { --black: #000; --white: #fff; --gray: #999; }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: var(--white);
    color: var(--black);
    font-size: 14px;
    font-weight: 400;
  }

  header {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 28px 14px;
    background: var(--white);
    z-index: 100;
    animation: fadeIn 2s ease forwards;
    opacity: 0;
  }

  .header-name { line-height: 1.3; }
  .header-name .name { font-size: 14px; font-weight: 400; }
  .header-name .role { font-size: 14px; color: var(--gray); }

  .btn-info {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--black);
    padding: 0;
  }
  .btn-info:hover { color: var(--gray); }

  .page-index {
    margin-top: 60px;
    padding: 24px 28px 60px;
  }

.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 20px;
  }

  .project-card:first-child {
    grid-column: 1 / -1;
  }

  .project-card:first-child .project-thumb {
    aspect-ratio: 2 / 1;
  }
    .project-card:nth-child(4) {
    grid-column: 1 / -1;
  }

  .project-card:nth-child(4) .project-thumb {
    aspect-ratio: 2 / 1;
  }

 @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .info-body {
      grid-template-columns: 1fr !important;
      gap: 40px 0;
      max-width: 100%;
    }

    .screenshot-item {
      width: 85vw;
    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .project-card {
    cursor: pointer;
    animation: fadeIn 2s ease forwards;
    opacity: 0;
  }

  .project-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #e8e8e8;
    overflow: hidden;
    position: relative;
    transition: background 0.2s;
  }
 .project-thumb img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.3s;
  }

  .thumb-gif {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s;
  }
 .project-card:hover .project-thumb { background: #ddd; }

.project-title-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .project-card:hover .project-title-overlay { opacity: 1; }

  .project-caption {
    margin-top: 9px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: var(--black);
  }

  .subpage {
    position: fixed;
    inset: 0;
    background: var(--white);
    overflow-y: auto;
    z-index: 200;
  }

  .subpage-header {
    position: sticky;
    top: 0;
    height: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 28px 14px;
    background: var(--white);
  }

  .btn-back {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--black);
    padding: 0;
  }
  .btn-back:hover { color: var(--gray); }

  .subpage-label { font-size: 14px; color: var(--gray); }

  .project-player {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .project-player iframe { width: 100%; height: 100%; border: none; }
  .player-placeholder { color: #555; font-size: 12px; }

  .project-body { padding: 20px 28px 80px; }
  .project-body-title { font-size: 14px; font-weight: 400; margin-bottom: 4px; }
  .project-body-tags  { font-size: 14px; color: var(--gray); margin-bottom: 32px; }
  .project-body-desc-label { font-size: 14px; color: var(--gray); margin-bottom: 10px; }
  .project-body-desc {
    font-size: 14px;
    line-height: 1.65;
    color: #444;
    max-width: 560px;
    margin-bottom: 60px;
  }

  .screenshots-label { font-size: 12px; color: var(--gray); margin-bottom: 14px; }
  .screenshots-scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }
  .screenshots-scroll::-webkit-scrollbar { display: none; }
  .screenshot-item {
    flex: 0 0 auto;
    width: 52vw;
    background: #e8e8e8;
    overflow: hidden;
  }
  .screenshot-item img { width: 100%; height: 100%; cover; display: block; }

  .info-body {
    padding: 40px 28px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 80px;
    max-width: 1200px;
  }
  .info-bio-name { font-size: 14px; font-weight: 400; margin-bottom: 2px; }
  .info-bio-role { font-size: 12px; color: var(--gray); margin-bottom: 24px; }
  .info-bio-text { font-size: 14px; line-height: 1.65; color: #444; margin-bottom: 40px; }
  .info-bio-text p { margin-bottom: 12px; }
.info-bio-text p:last-child { margin-bottom: 0; }
  .contact-item { margin-bottom: 18px; }
  .contact-type { font-size: 12px; color: var(--gray); margin-bottom: 3px; }
  .contact-value {
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    color: var(--black);
    display: block;
        margin-bottom: 3px;
  }
  .contact-value:hover { color: var(--gray); }
`

export default function Portfolio({ projects }) {
  const [activePage, setActivePage] = useState(null) // null | 'project' | 'info'
  const [activeProject, setActiveProject] = useState(null)

  function openProject(p) {
    setActiveProject(p)
    setActivePage('project')
  }

  function closeProject() {
    setActivePage(null)
    setActiveProject(null)
  }

  function openInfo() { setActivePage('info') }
  function closeInfo() { setActivePage(null) }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* HEADER */}
      <header>
        <div className="header-name">
          <div className="name">GOSHA KAZAKOV-POKROVSKY</div>
        </div>
        <button className="btn-info" onClick={openInfo}>Info</button>
      </header>

{/* INDEX */}
<div className="page-index">
  <div className="projects-grid">
    {projects.map(p => {
const thumbUrl = p.thumbnail ? urlFor(p.thumbnail).width(2400).url() : null
      const gifUrl = p.thumbnailGif ? urlFor(p.thumbnailGif).format('gif').url() : null
      return (
       <div key={p._id} className="project-card" onClick={() => window.location.href = `/project/${p.slug.current}`}>
      <div className={`project-thumb ${thumbUrl ? 'has-image' : 'no-image'}`}>
  {thumbUrl && <img className="thumb-static" src={thumbUrl} alt={p.title} loading="lazy" />}
  <div className="project-title-overlay">{p.title}</div>
</div>
          
        </div>
      )
    })}
  </div>
</div>

      {/* PROJECT PAGE */}
      {activePage === 'project' && activeProject && (
        <div className="subpage">
          <div className="subpage-header">
            <button className="btn-back" onClick={closeProject}>Back</button>
            <span className="subpage-label">{activeProject.title}</span>
          </div>
          <div className="project-player">
            {activeProject.embedUrl
              ? <iframe src={activeProject.embedUrl} allowFullScreen allow="autoplay; encrypted-media" />
              : <div className="player-placeholder">Video coming soon</div>
            }
          </div>
          <div className="project-body">
            <div className="project-body-title">{activeProject.title}</div>
            <div className="project-body-tags">{activeProject.tags} — {activeProject.year}</div>
            {activeProject.description && (
              <>
                <div className="project-body-desc-label">About</div>
                <div className="project-body-desc">{activeProject.description}</div>
              </>
            )}
            {activeProject.screenshots && activeProject.screenshots.length > 0 && (
              <>
                <div className="screenshots-label">Images</div>
                <div className="screenshots-scroll">
                  {activeProject.screenshots.map((img, i) => (
                    <div key={i} className="screenshot-item">
                      <img src={urlFor(img).width(1200).url()} alt="" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

    {/* INFO PAGE */}
{activePage === 'info' && (
  <div className="subpage">
    <div className="subpage-header">
      <button className="btn-back" onClick={closeInfo}>Back</button>
    </div>
    <div className="info-body">
      <div>
       <div className="info-bio-name">ГОША КАЗАКОВ-ПОКРОВСКИЙ</div>
       <div className="info-bio-role"></div>
        <div className="info-bio-text">
          <p>Gosha Kazakov-Pokrovskiy is a director and screenwriter whose work moves between documentary and fiction, focusing on identity, landscape, and presence.</p>
  <p>With a background in philosophy (aesthetics) from Moscow State University, he approaches film through atmosphere and character rather than spectacle. His visual language is restrained, narrative-driven, and grounded in authenticity.</p>
  <p>Collaborations include Puma, L'Oréal, Dyson, New Era, La Roche-Posay, and J.Kim.</p>
  <p>Featured on Nowness, Booom TV, and Director's Library.</p>

        </div>
      </div>
      <div>
        <div className="contact-item">
          <div className="contact-type">Email</div>
          <a href="mailto:kazakovpokrovsky@gmail.com" className="contact-value">kazakovpokrovsky@gmail.com</a>
        </div>
        <div className="contact-item">
          <div className="contact-type">Instagram</div>
        <a href="https://www.instagram.com/kazakovpokrovsky" target="_blank" className="contact-value">@kazakovpokrovsky</a>
        </div>
        <div className="contact-item">
          <div className="contact-type">Representation</div>
          <a href="mailto:tsvetkova@hypepro.ru" className="contact-value">RU | Hype Film</a>
        
        </div>
      </div>
    </div>
  </div>
)}
    </>
  )
}
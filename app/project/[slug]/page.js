import { client, urlFor } from '../../../sanity/client'

export default async function ProjectPage({ params }) {
  const { slug } = await params
  
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      year,
      tags,
      description,
      thumbnail,
      embedUrl,
      "screenshots": screenshots[]{
        asset->
      }
    }`,
    { slug },
    { next: { revalidate: 0 } }
  )

  if (!project) return <div>Проект не найден</div>

  return (
    <div>
      <div style={{position:'sticky', top:0, height:'60px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 28px 14px', background:'#fff', zIndex:100}}>
        <a href="/" style={{fontSize:'13px', textDecoration:'none', color:'#000', fontFamily:'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Back</a>
        <span style={{fontSize:'11px', color:'#999', fontFamily:'Helvetica Neue, Helvetica, Arial, sans-serif'}}>{project.title}</span>
      </div>
      <div style={{width:'100%', aspectRatio:'16/9', background:'#111', display:'flex', alignItems:'center', justifyContent:'center'}}>
        {project.embedUrl
          ? <iframe src={project.embedUrl} style={{width:'100%', height:'100%', border:'none'}} allowFullScreen allow="autoplay; encrypted-media" />
          : <div style={{color:'#555', fontSize:'12px'}}>Video coming soon</div>
        }
      </div>
      <div style={{padding:'20px 28px 80px', fontFamily:'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
        <div style={{fontSize:'13px', marginBottom:'4px'}}>{project.title}</div>
        <div style={{fontSize:'11px', color:'#999', marginBottom:'32px'}}>{project.tags} — {project.year}</div>
        {project.description && (
          <>
            <div style={{fontSize:'11px', color:'#999', marginBottom:'10px'}}>About</div>
            <div style={{fontSize:'13px', lineHeight:'1.65', color:'#444', maxWidth:'560px', marginBottom:'60px'}}>{project.description}</div>
          </>
        )}
        {project.screenshots && project.screenshots.length > 0 && (
          <>
            <div style={{fontSize:'11px', color:'#999', marginBottom:'14px'}}>Images</div>
            <div style={{display:'flex', gap:'12px', overflowX:'auto', paddingBottom:'4px'}}>
              {project.screenshots.map((img, i) => (
                <div key={i} style={{flex:'0 0 auto', width:'52vw', aspectRatio:'16/9', background:'#e8e8e8', overflow:'hidden'}}>
                  <img src={urlFor(img).width(1200).url()} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
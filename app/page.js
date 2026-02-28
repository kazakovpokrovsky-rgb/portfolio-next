import { client } from '../sanity/client'
import Portfolio from '../components/Portfolio'

export default async function Home() {
const projects = await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      year,
      tags,
      description,
      thumbnail,
      thumbnailGif,
      embedUrl,
      screenshots,
      slug
    }
  `)

  return <Portfolio projects={projects} />
}

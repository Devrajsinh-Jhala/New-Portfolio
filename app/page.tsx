import Link from "next/link"

import { AnimeBanner } from "@/components/anime-banner"
import { Bookcase } from "@/components/bookcase"
import { HomeSides } from "@/components/home-sides"
import { Levels } from "@/components/levels"
import { NoteBox } from "@/components/note-box"
import { Page, Shared } from "@/components/page"
import { PostLink } from "@/components/post-list"
import { Skills } from "@/components/skills"
import { anime } from "@/lib/anime"
import { getPosts, toSummary } from "@/lib/blog"
import { getBooks, toSpine } from "@/lib/books"
import { education, levels } from "@/lib/experience"
import { getPackageStats, getPackageStatsForProject } from "@/lib/package-stats"
import { countWord, formatDate } from "@/lib/post-format"
import { getProjects } from "@/lib/projects"
import { getResearchWorks, getResearchYear } from "@/lib/research"

export default async function HomePage() {
  const packageStats = await getPackageStats()
  const packages = getProjects()
    .flatMap((project) => {
      const stats = getPackageStatsForProject(packageStats, project.slug)

      return stats ? [{ project, stats }] : []
    })
    .sort(
      (first, second) =>
        second.stats.downloadsLastMonth - first.stats.downloadsLastMonth
    )
  const papers = getResearchWorks()
  const posts = getPosts().slice(0, 3).map(toSummary)
  const books = getBooks().map(toSpine)

  return (
    <Page>
      <HomeSides
        pro={
          <>
            <Levels levels={levels} />
            <Skills />

            <section className="sec tight">
              <div className="duo">
                <div>
                  <h2 className="h">Open source</h2>
                  <ul className="rows">
                    {packages.map(({ project, stats }) => (
                      <li key={project.slug}>
                        <span className="mono">{stats.registry}</span>
                        <span className="t">
                          <Shared name={`project-${project.slug}`}>
                            <Link
                              className="shared"
                              href={`/projects/${project.slug}`}
                            >
                              {project.title}
                            </Link>
                          </Shared>
                          <span className="mono m">
                            {project.tagline ? `${project.tagline} ` : ""}
                            {stats.downloadsLastMonth.toLocaleString("en")}{" "}
                            downloads in 30 days.
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link className="more lk" href="/projects">
                    all projects →
                  </Link>
                </div>
                <div>
                  <h2 className="h">Research</h2>
                  <ul className="rows">
                    {papers.map((paper) => (
                      <li key={paper.slug}>
                        <span className="mono">{getResearchYear(paper)}</span>
                        <span className="t">
                          <Shared name={`paper-${paper.slug}`}>
                            <Link
                              className="shared"
                              href={`/research/${paper.slug}`}
                            >
                              {paper.title}
                            </Link>
                          </Shared>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link className="more lk" href="/research">
                    all {countWord(papers.length)} papers →
                  </Link>
                </div>
              </div>
            </section>

            <section className="sec flush">
              <h2 className="h">Education and awards</h2>
              <ul className="rows cols">
                {education.map((row) => (
                  <li key={row.what}>
                    <span className="mono">{row.when}</span>
                    <span className="t">
                      {row.what}
                      <span className="mono m">{row.where}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link className="more lk" href="/about">
                more about me →
              </Link>
            </section>
          </>
        }
        personal={
          <>
            <section className="sec tight">
              <div className="duo">
                <div>
                  <h2 className="h">Latest writing</h2>
                  <ul className="rows">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <span className="mono">
                          {formatDate(post.date, "month")}
                        </span>
                        <span className="t">
                          <PostLink post={post} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link className="more lk" href="/blog">
                    the whole blog →
                  </Link>
                </div>
                <div>
                  <h2 className="h">On the shelf</h2>
                  <Bookcase books={books} />
                  <Link className="more lk" href="/books">
                    all books and notes →
                  </Link>
                </div>
              </div>
            </section>

            <section className="sec flush">
              <h2 className="h">Anime I go back to</h2>
              <AnimeBanner anime={anime} titles="reel" />
            </section>

            <section className="sec flush">
              <h2 className="h">Leave a note</h2>
              <p className="sub">
                Tell me what you’re reading or building. Send opens your mail
                app with the note addressed to me.
              </p>
              <NoteBox />
            </section>
          </>
        }
      />
    </Page>
  )
}

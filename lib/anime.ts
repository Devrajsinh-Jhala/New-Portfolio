type Anime = {
  title: string
  by: string
  /** Wide banner artwork, served from AniList. */
  banner: string
  /** Shown behind the title if the artwork cannot load. */
  color: string
}

const anime: Anime[] = [
  {
    title: "Solo Leveling",
    by: "Chugong",
    banner:
      "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg",
    color: "#35bbf1",
  },
  {
    title: "Your Name",
    by: "Makoto Shinkai",
    banner:
      "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21519-1ayMXgNlmByb.jpg",
    color: "#0da1e4",
  },
  {
    title: "A Silent Voice",
    by: "Naoko Yamada",
    banner:
      "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
    color: "#5dbbe4",
  },
  {
    title: "The Garden of Words",
    by: "Makoto Shinkai",
    banner:
      "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16782.jpg",
    color: "#93e450",
  },
  {
    title: "Jujutsu Kaisen",
    by: "Gege Akutami",
    banner:
      "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    color: "#e45d5d",
  },
  {
    title: "I Want to Eat Your Pancreas",
    by: "Yoru Sumino",
    banner:
      "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99750-KPFW2Jv03b2B.jpg",
    color: "#f1c9f1",
  },
]

export { anime }
export type { Anime }

export const translations = {
  EN: {
    home: "Home",
    blogs: "Blogs",
    projects: "Projects",
    contact: "Contact",
    returnHome: "[!] RETURN_TO_ARCHIVE_[HOME]",
    returnBlogs: "[!] RETURN_TO_ARCHIVE_[BLOGS]",
    archiveLogs: "Archive of Logs",
  },
  JP: {
    home: "ホーム",
    blogs: "ブログ",
    projects: "プロジェクト",
    contact: "連絡先",
    returnHome: "[!] アーカイブへ戻る_[ホーム]",
    returnBlogs: "[!] アーカイブへ戻る_[ブログ]",
    archiveLogs: "ログアーカイブ",
  },
  NOR: {
    home: "Hjem",
    blogs: "Blogger",
    projects: "Prosjekter",
    contact: "Kontakt",
    returnHome: "[!] TILBAKE_TIL_ARKIV_[HJEM]",
    returnBlogs: "[!] TILBAKE_TIL_ARKIV_[BLOGGER]",
    archiveLogs: "Loggarkiv",
  },
} as const;

export type Language = keyof typeof translations;

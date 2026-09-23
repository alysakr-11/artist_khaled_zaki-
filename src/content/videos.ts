// The artist's YouTube playlist, as embedded on the legacy video gallery page.
// Titles are the published YouTube titles.
export const playlistUrl = "https://www.youtube.com/playlist?list=PLmnTCnFjM5ZEp54A07e-J3I3xh9DThBrW";

export type Video = { id: string; title: string; channel: string };

export const videos: Video[] = [
  { id: "u5m4Kq4wnv8", title: "Khaled Zaki, Venice Biennale 2013", channel: "Khaled Zaki" },
  { id: "wdy8AOouXtQ", title: "Venice Biennale Project", channel: "Khaled Zaki" },
  { id: "RiyaWrpaJog", title: "“Resurrection” — Khaled Zaki", channel: "Goodbird Films" },
  { id: "oMFKdi7EpXQ", title: "“Resurrection”, a new project by Khaled Zaki — Trailer", channel: "Goodbird Films" },
  { id: "vU0UGB2nY-Y", title: "Carving a marble portrait", channel: "Khaled Zaki" },
  {
    id: "mSCSj5eYwyo",
    title: "First Award, Galaa Square project, Cairo, 2000",
    channel: "Khaled Zaki",
  },
  {
    id: "FPbF-dGacVs",
    title: "Completion of the Perneb Tomb, Metropolitan Museum, 2003",
    channel: "Khaled Zaki",
  },
  { id: "k34aBDA1H_s", title: "The Popular Committee", channel: "Khaled Zaki" },
  { id: "nDLq3RMmiEY", title: "Running with the Ring", channel: "Khaled Zaki" },
];

import connection from "../../src/database";

export async function createSong() {
  const song: { name: string; youtubeLink: string; score: number } = {
    name: "That's Life - Frank Sinatra",
    youtubeLink: "https://www.youtube.com/watch?v=TnlPtaPxXfc",
    score: 0,
  };
  return song;
}

export async function createEmptyNameSong() {
  const song = {
    name: "",
    youtubeLink: "abc",
  };
  return song;
}
export async function createEmptyYoutubeLink() {
  const song = {
    name: "abc",
    youtubeLink: "",
  };
  return song;
}

export async function createTopRatedSong() {
  const song: { name: string; youtubeLink: string; score: number } = {
    name: "That's Life - Frank Sinatra",
    youtubeLink: "https://www.youtube.com/watch?v=TnlPtaPxXfc",
    score: 11,
  };
  return song;
}

export async function createLowRatedSong() {
  const song: { name: string; youtubeLink: string; score: number } = {
    name: "Flores - Luiza Sonza ft. Vitão",
    youtubeLink: "https://www.youtube.com/watch?v=meL5o_pmU_w",
    score: -4,
  };
  return song;
}

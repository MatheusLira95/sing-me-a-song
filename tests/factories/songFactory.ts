import connection from "../../src/database";

async function createSong() {
  const song: { name: string; youtubeLink: string; score: number } = {
    name: "That's Life - Frank Sinatra",
    youtubeLink: "https://www.youtube.com/watch?v=TnlPtaPxXfc",
    score: 0,
  };
  return song;
}

async function createEmptyNameSong() {
  const song = {
    name: "",
    youtubeLink: "abc",
  };
  return song;
}
async function createEmptyYoutubeLink() {
  const song = {
    name: "abc",
    youtubeLink: "",
  };
  return song;
}

export { createSong, createEmptyNameSong, createEmptyYoutubeLink };

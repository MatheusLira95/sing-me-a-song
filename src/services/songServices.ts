import * as songRepository from "../repositories/songRepository";

export function validateYouTubeUrl(url: string) {
  if (url) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
      return true;
    }
  }
  return false;
}

export async function getSong(ramdom: number) {
  let result;

  if (ramdom <= 0.7) {
    result = await songRepository.getTopRated();
  }
  if (!result) {
    result = await songRepository.getLowRated();
  }
  if (!result) {
    return undefined;
  }
  return result;
}

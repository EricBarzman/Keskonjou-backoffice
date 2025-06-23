import type { ISong } from "../types/song.type";

/** 
 *  L'algorithme KESKONJOU, qui génère une setlist en sélectionnant les chansons
 *  @param {*} duration Durée de la setlist (en secondes)
 *  @param {*} songs La liste des chansons parmi lesquelles choisir
 */
function generateSetlist({
  duration,
  acceptedLimit,
  songs,
}: {
  duration: number,
  acceptedLimit: number,
  songs: ISong[]
}) {

  const setlist : ISong[] = [];
  let currentDuration = 0;
  
  function pickRandomSongAndRemoveItFromList(list : ISong[]) {
    const randIndex = Math.round(Math.random() * (list.length - 1))
    const tune = list[randIndex];
    currentDuration += tune.duration!;
    setlist.push(tune);
    list.splice(randIndex, 1)
  }

  // Remplit la setlist au-delà de la limite
  while (currentDuration <= duration || songs.length > 0)
    pickRandomSongAndRemoveItFromList(songs);

  // Si la durée actuelle se situe dans la fourchette de la limite acceptée, c'est bon
  if (currentDuration > (duration - acceptedLimit) && currentDuration < (duration + acceptedLimit))
    return setlist;

  // Sinon, retire la dernière chanson et diminue la durée totale de celle-ci
  const lastTune = setlist[setlist.length - 1]
  currentDuration -= lastTune.duration!;
  setlist.pop();

  // Cherche les possibilités en regardant la durée des chansons restantes
  const possibilitiesLeft = songs.filter((tune) => tune.duration! <= duration - currentDuration)

  // Si aucune, arrêter
  if (possibilitiesLeft.length < 1) return setlist;

  // Sinon, reprendre
  pickRandomSongAndRemoveItFromList(possibilitiesLeft);
  return setlist;
}


export default generateSetlist;
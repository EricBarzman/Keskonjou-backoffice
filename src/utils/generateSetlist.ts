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

  // Accumulateurs liste et durée
  const setlist: ISong[] = [];
  let currentDuration = 0;
  

  // Factorisation du processus
  function pickRndAndUpdate(list: ISong[]) {
    // Pick random index
    let randIndex = Math.round(Math.random() * (list.length - 1))
    if (randIndex < 0) randIndex = 0;
    // Pick a tune
    const tune = list[randIndex];
    // Update duration
    currentDuration += tune.duration!;
    // met la tune dans la setlist
    setlist.push(tune);
    // retire la tune de la liste
    list.splice(randIndex, 1)
  }

  // Remplit la setlist au-delà de la limite, tant qu'il y a des chansons, et que leur durée suffira
  while (
    currentDuration <= duration &&
    songs.length !== 0
  ) pickRndAndUpdate(songs);

  // Si la durée actuelle se situe dans la fourchette de la limite acceptée, c'est bon
  if (currentDuration >= (duration - acceptedLimit)
    && currentDuration <= (duration + acceptedLimit)
  ) {
    return setlist
  };

  // On a dépassé la limite acceptable
  // S'il ne reste aucune chanson dont la durée nous ramène
  // à un interval plus petit que l'actuel,
  // par rapport au point visé, on laisse tomber
  const lastTune = setlist[setlist.length - 1];
  if (!songs.some(song =>
    duration - (song.duration! + currentDuration - lastTune.duration!) < currentDuration - duration
  ))
    return setlist;

  // Sinon, retire la dernière chanson et diminue la durée totale de celle-ci
  // if (currentDuration - lastTune.duration! < )
  currentDuration -= lastTune!.duration!;
  setlist.pop();

  if (songs.length === 0) return setlist

  // S'il ne reste aucune possibilité d'une chanson avec une durée complétant ce qui reste du temps total
  // dans la limite acceptée, arrêter
  if (!songs.some(song => song.duration! <= (duration - currentDuration) + acceptedLimit)) return setlist;

  // Sinon, trier les possibilités restantes, et filtrer une dernière fois
  const optionsLeft = songs.filter(song => song.duration! <= duration - currentDuration + acceptedLimit);

  // Tant que leftOptions a une song avec une durée convenable, on continue
  while (optionsLeft.some(song => song.duration! <= duration - currentDuration + acceptedLimit))
    pickRndAndUpdate(optionsLeft);

  return setlist;
}


export default generateSetlist;
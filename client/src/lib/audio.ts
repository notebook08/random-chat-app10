// Utility to play sounds
export function playSound(name: 'join' | 'swipe' | 'match') {
  const fileMap = {
    join: '/sounds/join.mp3',
    swipe: '/sounds/swipe.mp3',
    match: '/sounds/match.mp3',
  };
  const audio = new Audio(fileMap[name]);
  audio.volume = 0.5;
  audio.play();
}

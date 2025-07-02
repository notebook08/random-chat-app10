
export const playSound = (soundName: string) => {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = 0.3; // Adjust volume as needed
    audio.play().catch(error => {
      console.log('Sound play failed:', error);
    });
  } catch (error) {
    console.log('Sound loading failed:', error);
  }
};

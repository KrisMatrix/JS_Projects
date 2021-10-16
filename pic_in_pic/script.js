const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    //navigator.mediaDevices read-only property returns a MediaDevices object, 
    // which provides access to connected media input devices like cameras and 
    // microphones, as well as screen sharing.
    //getDisplayMedia() Prompts the user to select a display or portion of a 
    // display (such as a window) to capture as a MediaStream for sharing or 
    // recording purposes. Returns a promise that resolves to a MediaStream.
    videoElement.srcObject = mediaStream;
    videoElement.onloadededmetadata = () => {
      videoElement.play();
    }
  } catch(error) {
    console.log('Whoops, error here:', error);
  }
}

// Event listener
button.addEventListener('click', async () => {
  //Disable Button
  button.disabled = true;
  //start pic in pic
  await videoElement.requestPictureInPicture();
  // reset button
  button.disabled = false;
});

//on load
selectMediaStream();

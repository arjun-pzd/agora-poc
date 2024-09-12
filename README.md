
# Agora Video Call Service

This project is a React-based video call application using Agora.io. It demonstrates how to set up real-time video and audio communication with Agora, allowing users to join, leave, mute, and unmute during the call. The UI is styled with circular buttons for starting/ending calls and muting/unmuting audio, with a full-screen remote video and a smaller local video overlay.

## Features

- **Video Call**: Real-time video and audio using Agora.io.
- **Local and Remote Streams**: Display local video in a small window over the remote video.
- **UI Enhancements**: Circular buttons for starting/ending calls and muting/unmuting.
- **Mute/Unmute**: Toggle the microphone during the video call.

## Requirements

- **Node.js** and **npm**: Ensure you have Node.js installed (preferably the latest stable version).
- **Agora.io Account**: You will need an Agora App ID and Token. Create an account at [Agora.io](https://www.agora.io) if you don't have one.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/arjun-pzd/agora-poc.git
cd agora-poc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Agora Credentials

- Create an account at [Agora.io](https://www.agora.io) and generate an App ID and Temporary Token for your project.
- Update the Agora credentials in the `VideoCall.js` file:
  
```js
const APP_ID = 'YOUR_APP_ID';
const TOKEN = 'YOUR_TEMPORARY_TOKEN';
```

### 4. Run the Application

```bash
npm start
```

The app will be running at `http://localhost:3000`.

## Usage

### Joining a Call

- Click on the "Start Call" button to join the video call.
- Your local video will appear as a small window on the top-right corner, while the remote video will take up the full screen.
- You can mute/unmute your microphone by clicking the "Mute" button.

### Leaving a Call

- Click the "End Call" button to leave the video call.

## Customization

You can further customize this project by:

1. **UI Enhancements**: Modify the layout and design to suit your application's needs.
2. **Token Management**: Implement server-side token generation for a more secure production environment.

## Agora Documentation

For more information about Agora's features and APIs, refer to the [Agora Documentation](https://docs.agora.io/en/).

## License

This project is licensed under the MIT License.

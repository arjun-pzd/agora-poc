import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = '2ecffeb313234a7ebcfce81885d37b33';
const TOKEN = '007eJxTYAgM6j/gnPvreELn9Mi67pubTNR/z9pd1rcoKU1AOayd454Cg1FqclpaapKxobGRsUmieWpSclpyqoWhhYVpirF5krFx/fH7aQ2BjAzmu4yYGBkgEMRnYShJLS5hYAAAmhcgjQ==';
const CHANNEL = 'test';

const VideoCall = () => {
  const [client, setClient] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState({});
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const initClient = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      setClient(agoraClient);
    };
    initClient();

    return () => {
      if (client) {
        client.leave();
      }
      localTracks.forEach(track => track.close());
    };
  }, []);

  const joinChannel = async () => {
    if (!client) return;

    try {
      await client.join(APP_ID, CHANNEL, TOKEN, null);
      const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks([localAudioTrack, localVideoTrack]);
      await client.publish([localAudioTrack, localVideoTrack]);
      localVideoTrack.play(localVideoRef.current);
      setJoined(true);

      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack.play(remoteVideoRef.current);
        }
        setRemoteUsers((prevUsers) => ({ ...prevUsers, [user.uid]: user }));
      });

      client.on('user-left', (user) => {
        setRemoteUsers((prevUsers) => {
          const { [user.uid]: removedUser, ...remainingUsers } = prevUsers;
          return remainingUsers;
        });
      });
    } catch (err) {
      console.error('Error joining Agora channel:', err);
    }
  };

  const leaveChannel = async () => {
    if (!client) return;

    try {
      await client.leave();
      localTracks.forEach(track => track.close());
      setLocalTracks([]);
      setJoined(false);
    } catch (err) {
      console.error('Error leaving Agora channel:', err);
    }
  };

  const toggleMute = async () => {
    if (localTracks.length > 0) {
      const audioTrack = localTracks[0];
      if (muted) {
        await audioTrack.setEnabled(true);
        setMuted(false);
      } else {
        await audioTrack.setEnabled(false);
        setMuted(true);
      }
    }
  };

  return (
    <div>
      <h1>Agora Video Call Service</h1>
      <div className="video-container">
        <div ref={remoteVideoRef} className="remote-video"></div>
        <div ref={localVideoRef} className="local-video"></div>
      </div>
      <div className="controls">
        {joined ? (
          <>
            <button className="end-call-button" onClick={leaveChannel}>
              End Call
            </button>
            <button className="mute-button" onClick={toggleMute}>
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </>
        ) : (
          <button className="start-call-button" onClick={joinChannel}>
            Start Call
          </button>
        )}
      </div>

      <style>{`
        .controls {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .start-call-button, .end-call-button, .mute-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .start-call-button {
          background-color: #1060eb;
        }

        .end-call-button {
          background-color: #e64d43;
        }

        .mute-button {
          background-color: gray;
        }

        .video-container {
          position: relative;
          height: 80vh;
          max-width: 80vw;
          background-color: #000;
          aspect-ratio: 4 / 3;
          margin: 20px auto;
          border-radius: 12px;
        }

        .remote-video {
          width: 100%;
          height: 100%;
          background-color: #000;
          border-radius: 12px;
        }

        .local-video {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 150px;
          aspect-ratio: 4 / 3;
          background-color: #000;
          border: 1px solid #fff;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default VideoCall;

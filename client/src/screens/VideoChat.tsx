import { useCallback, useEffect, useState } from "react";
import { playSound } from "../lib/audio";
import { useSocket } from "../context/SocketProvider";
import { usePremium } from "../context/PremiumProvider";
import peerservice from "../service/peer";
import ReactPlayer from "react-player";
import { Button } from "../components/ui/button";
import Messages from "../components/Messages";
import ChatTimer from "../components/ChatTimer";
import PremiumPaywall from "../components/PremiumPaywall";
import ReportUserModal from "../components/ReportUserModal";
import BlockUserModal from "../components/BlockUserModal";
import { ScreenShare, StepBack, StepForward, Crown } from "lucide-react";
import { ClipLoader } from "react-spinners"; // Import the spinner
import { useTheme } from "../components/theme-provider";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/VideoChat.css";

interface Offer {
  offer: RTCSessionDescriptionInit;
  from: string;
}

interface Answer {
  answer: RTCSessionDescriptionInit;
  from: string;
}

interface NegotiationDone {
  answer: RTCSessionDescriptionInit;
  to: string;
}

export default function VideoChat() {
  const { socket } = useSocket();
  const { isPremium, setPremium } = usePremium();
  const location = useLocation();
  const [remoteChatToken, setRemoteChatToken] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [flag, setFlag] = useState(false);
  const [messagesArray, setMessagesArray] = useState<
    Array<{ sender: string; message: string }>
  >([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isVoiceOnly, setIsVoiceOnly] = useState(false);
  const [partnerPremium, setPartnerPremium] = useState(false);

  // Reporting state
  const [showReport, setShowReport] = useState(false);
  const [showReportEnd, setShowReportEnd] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [suspended, setSuspended] = useState(false);

  // Blocking state
  const [showBlock, setShowBlock] = useState(false);
  const [blockSubmitted, setBlockSubmitted] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const loaderColor = theme.theme === "dark" ? "#D1D5DB" : "#4B5563";

  // Initialize voice-only mode from location state
  useEffect(() => {
    const state = location.state as { genderFilter?: string; voiceOnly?: boolean };
    if (state?.voiceOnly && isPremium) {
      setIsVoiceOnly(true);
      setIsCameraOn(false);
    }
  }, [location.state, isPremium]);

  const handlePremiumPurchase = useCallback((plan: string) => {
    // Simulate payment processing
    console.log(`Processing payment for ${plan} plan`);
    
    // Calculate expiry date
    const now = new Date();
    const expiry = new Date(now);
    if (plan === "weekly") {
      expiry.setDate(now.getDate() + 7);
    } else {
      expiry.setMonth(now.getMonth() + 1);
    }
    
    // Set premium status
    setPremium(true, expiry);
    setShowPaywall(false);
    
    // Show success message
    alert(`🎉 Welcome to Premium! Your ${plan} subscription is now active until ${expiry.toLocaleDateString()}`);
  }, [setPremium]);

  const handleTimeUp = useCallback(() => {
    alert("⏰ Time's up! Your 15-minute chat session with this person has ended. Upgrade to Premium to continue chatting with them!");
    handleSkip();
  }, []);

  const handleUpgrade = useCallback(() => {
    setShowPaywall(true);
  }, []);

  const getUserStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: !isVoiceOnly,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000, // CD-quality audio sample rate
        sampleSize: 16, // Higher sample size
        channelCount: 2 // Stereo audio
      }
    });
    // const processedStream = processAudio(stream);
    setMyStream(stream);
  }, [isVoiceOnly]);

  useEffect(() => {
    getUserStream();
  }, [getUserStream, myStream]);

  const toggleCamera = useCallback(() => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      const sender = peerservice.peer
        .getSenders()
        .find((s) => s.track?.kind === "video");

      if (videoTrack && sender) {
        if (isCameraOn) {
          sender.replaceTrack(null); // Disable video by replacing with null
          videoTrack.stop(); // Stop the track
        } else {
          navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            const newVideoTrack = stream.getVideoTracks()[0];
            sender.replaceTrack(newVideoTrack); // Enable video by replacing track
            setMyStream((prevStream) => {
              if (prevStream) {
                prevStream.removeTrack(videoTrack);
                prevStream.addTrack(newVideoTrack);
              }
              return prevStream;
            });
          });
        }
        setIsCameraOn(!isCameraOn); // Update the camera state
      }
    }
  }, [myStream, isCameraOn]);

  const toggleMic = useCallback(() => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      const sender = peerservice.peer
        .getSenders()
        .find((s) => s.track?.kind === "audio");

      if (audioTrack && sender) {
        if (isMicOn) {
          sender.replaceTrack(null); // Disable audio by replacing with null
          audioTrack.stop(); // Stop the track
        } else {
          navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const newAudioTrack = stream.getAudioTracks()[0];
            sender.replaceTrack(newAudioTrack); // Enable audio by replacing track
            setMyStream((prevStream) => {
              if (prevStream) {
                prevStream.removeTrack(audioTrack);
                prevStream.addTrack(newAudioTrack);
              }
              return prevStream;
            });
          });
        }
        setIsMicOn(!isMicOn); // Update the mic state
      }
    }
  }, [myStream, isMicOn]);


  const sendStream = useCallback(() => {
    if (myStream) {
      // console.log("send Stream");
      const videoTrack = myStream.getVideoTracks()[0];
      const audioTrack = myStream.getAudioTracks()[0];

      const senders = peerservice.peer.getSenders();

      if (videoTrack) {
        const videoSender = senders.find((s) => s.track === videoTrack);
        if (!videoSender) {
          peerservice.peer.addTrack(videoTrack, myStream); // Add video first
        }
      }

      if (audioTrack) {
        const audioSender = senders.find((s) => s.track === audioTrack);
        if (!audioSender) {
          peerservice.peer.addTrack(audioTrack, myStream); // Add audio second
        }
      }
    }
  }, [myStream]);

  const handleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      const videoTrack = myStream?.getVideoTracks()[0];
      const screenSender = peerservice.peer
        .getSenders()
        .find((s) => s.track?.kind === "video");

      if (videoTrack && screenSender) {
        screenSender.replaceTrack(videoTrack);
      }

      // Stop all tracks in the screen stream
      screenStream?.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      setMyStream(myStream); // Reset local view back to the webcam stream
      setIsScreenSharing(false);

      // Renegotiate after stopping screen sharing
      if (peerservice.peer.signalingState === "stable") {
        const offer = await peerservice.getOffer();
        socket?.emit("peer:nego:needed", { offer, targetChatToken: remoteChatToken });
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        setScreenStream(stream);
        setMyStream(stream);
        setIsScreenSharing(true);

        const screenTrack = stream.getVideoTracks()[0];
        const videoSender = peerservice.peer
          .getSenders()
          .find((s) => s.track?.kind === "video");

        if (videoSender) {
          videoSender.replaceTrack(screenTrack);
        } else {
          peerservice.peer.addTrack(screenTrack, stream);
        }

        if (peerservice.peer.signalingState === "stable") {
          const offer = await peerservice.getOffer();
          socket?.emit("peer:nego:needed", { offer, targetChatToken: remoteChatToken });
        }
      } catch (error) {
        console.error("Error sharing screen:", error);
      }
    }
  }, [isScreenSharing, myStream, screenStream, remoteChatToken, socket]);

  const setAudioBandwidth = (peerConnection: RTCPeerConnection) => {
    const sender = peerConnection
      .getSenders()
      .find((s) => s.track && s.track.kind === "audio");
    if (sender) {
      const parameters = sender.getParameters();
      parameters.encodings[0] = {
        maxBitrate: 128000 // Set a high bitrate for audio, 128 kbps
      };
      sender.setParameters(parameters);
    }
  };

  const handleUserJoined = useCallback(
    async (remoteId: string) => {
      setRemoteChatToken(remoteId);
      setPartnerPremium(false); // Reset partner premium status for new connection
      playSound('match'); // Play match found sound
      setShowReport(true); // Show report option on match
      const offer = await peerservice.getOffer();
      socket?.emit("offer", { offer, to: remoteId });
    },
    [socket]
  );

  const handleIncommingOffer = useCallback(
    async ({ offer, from }: Offer) => {
      setRemoteChatToken(from);
      await getUserStream();

      if (peerservice.peer.signalingState === "stable") {
        const answer = await peerservice.getAnswer(offer);
        setAudioBandwidth(peerservice.peer);
        socket?.emit("answer", { answer, to: from });
        // console.log("Answer created and sent");
        sendStream();
      } else {
        console.warn(
          "Cannot handle incoming offer in signaling state:",
          peerservice.peer.signalingState
        );
      }
    },
    [getUserStream, socket, sendStream]
  );

  const handleIncommingAnswer = useCallback(
    async ({ answer }: Answer) => {
      if (peerservice.peer.signalingState === "have-local-offer") {
        await peerservice.setRemoteDescription(answer);
        sendStream();
        // console.log("get Answer");
      } else {
        console.warn("Peer not in a proper state to set remote description.");
      }
    },
    [sendStream]
  );

  const modifySDP = (sdp: string) => {
    return sdp.replace(
      /a=fmtp:111 .*opus.*/,
      "a=fmtp:111 maxplaybackrate=48000;stereo=1;sprop-stereo=1;maxaveragebitrate=510000;useinbandfec=1"
    );
  };

  const handleNegotiationNeeded = useCallback(async () => {
    if (peerservice.peer.signalingState === "stable") {
      const currentOffer = await peerservice.getOffer();

      if (currentOffer && currentOffer.sdp) {
        const modifiedSDP = modifySDP(currentOffer.sdp);

        // Create a new RTCSessionDescription with the modified SDP
        const modifiedOffer = new RTCSessionDescription({
          type: currentOffer.type,
          sdp: modifiedSDP
        });

        setAudioBandwidth(peerservice.peer);

        socket?.emit("peer:nego:needed", {
          offer: modifiedOffer,
          targetChatToken: remoteChatToken
        });

        // console.log("Negotiation initiated with modified SDP.");
      }
    } else {
      console.warn("Peer is not in a stable state for negotiation.");
    }
  }, [remoteChatToken, socket]);

  // const handleNegotiationNeeded = useCallback(async () => {

  //   if (peerservice.peer.signalingState === "stable") {
  //     const currentOffer = await peerservice.getOffer();
  //     socket?.emit("peer:nego:needed", {
  //       offer: currentOffer,
  //       to: remoteSocketId,
  //     });
  //     console.log("Negotiation initiated.");
  //   } else {
  //     console.warn("Peer is not in a stable state for negotiation.");
  //   }
  // }, [remoteSocketId, socket]);

  const handleNegotiationIncomming = useCallback(
    async ({ offer, from }: Offer) => {
      if (
        peerservice.peer.signalingState === "stable" ||
        peerservice.peer.signalingState === "have-local-offer"
      ) {
        const answer = await peerservice.getAnswer(offer);
        socket?.emit("peer:nego:done", { answer, to: from });
      } else {
        console.warn(
          "Cannot handle negotiation in state:",
          peerservice.peer.signalingState
        );
      }
      // console.log("nego:incomming");
    },
    [socket]
  );

  const handleNegotiationFinal = useCallback(
    async ({ answer }: NegotiationDone) => {
      if (
        peerservice.peer.signalingState === "have-local-offer" ||
        peerservice.peer.signalingState === "have-remote-offer"
      ) {
        await peerservice.setRemoteDescription(answer);
        sendStream();
        // console.log("Final negotiation step completed.");
      } else if (peerservice.peer.signalingState === "stable") {
        console.log("Connection is stable, no need for further negotiation.");
      } else {
        console.warn(
          "Cannot set remote description: Peer connection is in state",
          peerservice.peer.signalingState
        );
      }
    },
    [sendStream]
  );

  const handleSkip = useCallback(async () => {
    // console.log("Skipping current user");

    peerservice.peer.getTransceivers().forEach((transceiver) => {
      if (transceiver.stop) {
        transceiver.stop();
      }
    });

    peerservice.peer.getSenders().forEach((sender) => {
      if (sender.track) {
        sender.track.stop();
        peerservice.peer.removeTrack(sender);
      }
    });

    peerservice.peer.onicecandidate = null;
    peerservice.peer.ontrack = null;
    peerservice.peer.onnegotiationneeded = null;

    if (peerservice.peer.signalingState !== "closed") {
      // console.log("closed");
      peerservice.peer.close();
    }
    peerservice.initPeer();
    setMessagesArray([]);
    setFlag(false);

    setRemoteStream(null);
    setRemoteChatToken(null);

    socket?.emit("skip");
  }, [socket]);

  useEffect(() => {
    if (flag !== true) {
      peerservice.peer.addEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
      setFlag(false);
    }

    return () => {
      peerservice.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [flag, handleNegotiationNeeded]);

  useEffect(() => {
    const handleTrackEvent = (event: RTCTrackEvent) => {
      const [incomingStream] = event.streams; // Get the MediaStream from event.streams
      // console.log("Received track event:", event.track);
      setRemoteStream(incomingStream);
    };

    peerservice.peer.addEventListener("track", handleTrackEvent);

    return () => {
      peerservice.peer.removeEventListener("track", handleTrackEvent);
    };
  }, [isScreenSharing, sendStream, flag]);

  const userDisConnected = useCallback(async () => {
    // console.log("You've been skipped. Looking for a new user...");
    setFlag(true);
    peerservice.peer.getTransceivers().forEach((transceiver) => {
      if (transceiver.stop) {
        transceiver.stop();
      }
    });

    peerservice.peer.getSenders().forEach((sender) => {
      peerservice.peer.removeTrack(sender);
    });

    peerservice.peer.onicecandidate = null;
    peerservice.peer.ontrack = null;
    peerservice.peer.onnegotiationneeded = null;

    if (peerservice.peer.signalingState !== "closed") {
      // console.log("closed");
      peerservice.peer.close();
    }

    setRemoteStream(null);
    setRemoteChatToken(null);
    setPartnerPremium(false); // Reset partner premium status

    peerservice.initPeer();
    setMessagesArray([]);
  }, []);

  useEffect(() => {
    socket?.on("skipped", userDisConnected);

    return () => {
      socket?.off("skipped", userDisConnected);
    };
  }, [socket, userDisConnected]);

  useEffect(() => {
    peerservice.peer.onicecandidate = (event) => {
      if (event.candidate) {
        // console.log("Sending ICE candidate:", event.candidate);
        socket?.emit("ice-candidate", {
          candidate: event.candidate,
          to: remoteChatToken
        });
      }
    };
  }, [socket, remoteChatToken]);

  useEffect(() => {
    socket?.on("ice-candidate", (data) => {
      if (data.candidate) {
        const candidate = new RTCIceCandidate(data.candidate);
        peerservice.peer
          .addIceCandidate(candidate)
          .then(() => {
            // console.log("Added ICE candidate:", candidate);
          })
          .catch((error) => {
            console.error("Error adding ICE candidate:", error);
          });
      }
    });

    return () => {
      socket?.off("ice-candidate");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("user:connect", handleUserJoined);
    socket?.on("offer", handleIncommingOffer);
    socket?.on("answer", handleIncommingAnswer);
    socket?.on("peer:nego:needed", handleNegotiationIncomming);
    socket?.on("peer:nego:final", handleNegotiationFinal);
    socket?.on("partnerDisconnected", userDisConnected);
    
    // Handle premium status exchange
    socket?.on("partner:premium:status", ({ isPremium }) => {
      setPartnerPremium(isPremium);
    });

    return () => {
      socket?.off("user:connect", handleUserJoined);
      socket?.off("offer", handleIncommingOffer);
      socket?.off("answer", handleIncommingAnswer);
      socket?.off("peer:nego:needed", handleNegotiationIncomming);
      socket?.off("peer:nego:final", handleNegotiationFinal);
      socket?.off("partnerDisconnected", userDisConnected);
      socket?.off("partner:premium:status");
    };
  }, [
    handleIncommingAnswer,
    handleIncommingOffer,
    handleNegotiationFinal,
    handleNegotiationIncomming,
    handleUserJoined,
    socket,
    userDisConnected
  ]);

  // Send premium status to partner when connected
  useEffect(() => {
    if (remoteChatToken && socket) {
      socket.emit("send:premium:status", { 
        isPremium, 
        targetChatToken: remoteChatToken 
      });
    }
  }, [isPremium, remoteChatToken, socket]);

  const handleCleanup = useCallback(() => {
    // console.log("Cleaning up...");

    // Stop camera stream
    if (myStream) {
      myStream.getTracks().forEach((track) => {
        // console.log("Stopping track:", track);
        track.stop(); // Stop each media track (video/audio)
      });
      setMyStream(null); // Clear the state to ensure the stream is stopped
    }

    // Stop screen sharing stream
    if (screenStream) {
      screenStream.getTracks().forEach((track) => {
        // console.log("Stopping screen sharing track:", track);
        track.stop(); // Stop each screen sharing track
      });
      setScreenStream(null);
      setIsScreenSharing(false);
    }

    // Disconnect the socket
    if (socket) {
      socket.disconnect();
    }

    // Close and reset Peer Connection
    if (peerservice.peer.signalingState !== "closed") {
      peerservice.peer.close();
      peerservice.initPeer(); // Re-initialize the peer connection if needed
    }

    navigate("/");
    window.location.reload();
  }, [myStream, navigate, screenStream, socket]);

  // Reporting logic
  const handleReport = (reason: string) => {
    // Save report count in localStorage (for demo, use socket/userId in real app)
    const count = Number(localStorage.getItem(`ajnabicam_reports_${remoteChatToken}`) || 0) + 1;
    localStorage.setItem(`ajnabicam_reports_${remoteChatToken}`, String(count));
    setReportSubmitted(true);
    setShowReport(false);
    setShowReportEnd(false);
    // If 20 or more reports, suspend for 24h
    if (count >= 20) {
      localStorage.setItem("ajnabicam_suspend_until", String(Date.now() + 24*60*60*1000));
      setSuspended(true);
    }
    // Show warning if reported (not suspended)
    if (count < 20) {
      alert("You have been reported. Please follow decency guidelines or your account may be suspended.");
    }
    setTimeout(() => setReportSubmitted(false), 2000);
  };

  // Blocking logic
  const handleBlock = () => {
    if (remoteChatToken) {
      let blocked = JSON.parse(localStorage.getItem("ajnabicam_blocked") || "[]");
      if (!blocked.includes(remoteChatToken)) {
        blocked.push(remoteChatToken);
        localStorage.setItem("ajnabicam_blocked", JSON.stringify(blocked));
      }
      setBlockSubmitted(true);
      setShowBlock(false);
      setTimeout(() => setBlockSubmitted(false), 2000);
    }
  };

  // Prevent matching with blocked users (pseudo, backend should enforce)
  useEffect(() => {
    const blocked = JSON.parse(localStorage.getItem("ajnabicam_blocked") || "[]");
    if (blocked.includes(remoteChatToken)) {
      alert("You have blocked this user. You will not be matched with them again.");
      handleSkip();
    }
  }, [remoteChatToken, handleSkip]);

  // Check for suspension (localStorage, simple demo)
  useEffect(() => {
    const suspendUntil = localStorage.getItem("ajnabicam_suspend_until");
    if (suspendUntil && Date.now() < Number(suspendUntil)) {
      setSuspended(true);
    }
  }, []);

  // Show suspension message if needed
  if (suspended) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="bg-rose-100 border border-rose-300 rounded-2xl p-8 shadow-xl flex flex-col items-center">
          <h2 className="text-2xl font-bold text-rose-600 mb-4">Account Suspended</h2>
          <p className="text-rose-500 text-center mb-4">Your account has been suspended for 24 hours due to excessive amounts of reports.</p>
          <p className="text-xs text-rose-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Native app-like layout
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-200 flex flex-col items-center justify-between overflow-y-auto">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between px-4 pt-4 pb-2 z-20">
        <Button variant="ghost" className="rounded-full p-2 bg-white/70 shadow-md" onClick={handleCleanup}>
          <StepBack size={22} className="text-rose-400" />
        </Button>
        <div className="flex-1 flex justify-center">
          <span className="font-bold text-lg text-rose-500 tracking-wide">AjnabiCam</span>
        </div>
        <div className="w-10" /> {/* Spacer for symmetry */}
      </div>

      {/* Timer chip */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white/80 px-4 py-1 rounded-full shadow text-rose-500 font-semibold text-sm border border-rose-200">
          <ChatTimer
            isPremium={isPremium}
            isConnected={remoteChatToken !== null}
            partnerPremium={partnerPremium}
            onTimeUp={handleTimeUp}
            onUpgrade={handleUpgrade}
          />
        </div>
      </div>

      {/* WhatsApp VC-style Streams area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2 pb-32 pt-8 relative">
        {/* Remote (partner) stream large, full area */}
        <div className="w-full h-[60vh] max-w-lg mx-auto rounded-3xl shadow-2xl bg-black/80 overflow-hidden relative animate-fadein border border-fuchsia-100 flex items-center justify-center">
          {remoteStream ? (
            isVoiceOnly ? (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-teal-400">
                <div className="text-7xl mb-2 animate-pop">�</div>
                <p className="text-white text-lg font-semibold drop-shadow">Partner's Voice</p>
              </div>
            ) : (
              <ReactPlayer
                className="w-full h-full object-cover"
                url={remoteStream}
                playing
                muted={false}
                width="100%"
                height="100%"
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-300">
              <ClipLoader color={loaderColor} size={40} />
              <p className="text-gray-500 mt-2 text-xs">Waiting for user to connect...</p>
            </div>
          )}
          {/* My stream as movable PiP */}
          {myStream && !isVoiceOnly && (
            <div
              id="my-pip"
              className="absolute bottom-4 right-4 w-24 h-40 bg-black/80 rounded-xl shadow-lg border-2 border-white cursor-move z-30 flex items-center justify-center"
              style={{ touchAction: 'none' }}
              draggable
              onDragStart={e => {
                e.dataTransfer.setDragImage(new Image(), 0, 0);
              }}
              onTouchStart={e => {
                e.currentTarget.style.zIndex = '50';
              }}
            >
              <ReactPlayer
                className="w-full h-full object-cover rounded-xl"
                url={myStream}
                playing
                muted
                width="100%"
                height="100%"
              />
            </div>
          )}
        </div>
        {/* (Removed duplicate large myStream view; only PiP remains) */}
        {/* My voice card if voice only */}
        {myStream && isVoiceOnly && (
          <div className="w-full h-32 max-w-lg mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden relative animate-fadein border border-rose-100 mt-4 flex flex-col items-center justify-center">
            <div className="text-6xl mb-2 animate-pop">🎙️</div>
            <p className="text-white text-lg font-semibold drop-shadow">Your Voice</p>
            {isPremium && (
              <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full text-xs font-bold text-white mt-2">
                <Crown className="h-3 w-3" /> PREMIUM
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Controls Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex flex-col items-center pb-4">
        <div className="w-full max-w-md mx-auto flex flex-row justify-between items-center gap-2 bg-white/90 rounded-2xl shadow-2xl px-3 py-2 border border-rose-100 animate-fadein">
          <Button className="flex-1 mx-1 p-3 bg-rose-500 text-white rounded-xl text-lg font-bold shadow-md" onClick={handleSkip} disabled={remoteChatToken === null}>
            <StepForward size={22} />
            <span className="ml-2">Skip</span>
          </Button>
          <Button className={`flex-1 mx-1 p-3 rounded-xl text-lg font-bold shadow-md flex items-center justify-center ${isCameraOn ? 'bg-gray-200 text-rose-500' : 'bg-rose-500 text-white'}`} onClick={toggleCamera}>
            {isCameraOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" /><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" /></svg>
            )}
          </Button>
          <Button className={`flex-1 mx-1 p-3 rounded-xl text-lg font-bold shadow-md flex items-center justify-center ${isMicOn ? 'bg-gray-200 text-rose-500' : 'bg-rose-500 text-white'}`} onClick={toggleMic}>
            {isMicOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v2m0 0a6 6 0 01-6-6v-2a6 6 0 016-6 6 6 0 016 6v2a6 6 0 01-6 6zm0 0v-2" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v2m0 0a6 6 0 01-6-6v-2a6 6 0 016-6 6 6 0 016 6v2a6 6 0 01-6 6zm0 0v-2" /><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" /></svg>
            )}
          </Button>
          <Button className="flex-1 mx-1 p-3 bg-fuchsia-500 text-white rounded-xl text-lg font-bold shadow-md" onClick={handleScreenShare}>
            <ScreenShare size={22} />
          </Button>
        </div>
        <div className="w-full max-w-md mx-auto flex flex-row gap-2 mt-2">
          <Button className="flex-1 bg-gray-100 text-gray-700 font-semibold rounded-xl" onClick={() => setShowBlock(true)}>
            Block
          </Button>
          <Button className="flex-1 bg-rose-100 text-rose-700 font-semibold rounded-xl" onClick={() => setShowReport(true)}>
            Report
          </Button>
        </div>
        {/* Premium-only Start Chat button */}
        {isPremium && (
          <div className="w-full max-w-md mx-auto mt-2">
            <Button className="w-full py-3 text-base font-bold rounded-xl bg-green-500 text-white shadow-md">
              Start Chat
            </Button>
          </div>
        )}
      </div>

      {/* (Removed type message box for all users) */}

      {/* Modals and Toasts */}
      <PremiumPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchase={handlePremiumPurchase}
      />
      <ReportUserModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        onSubmit={handleReport}
      />
      <ReportUserModal
        isOpen={showReportEnd}
        onClose={() => setShowReportEnd(false)}
        onSubmit={handleReport}
      />
      <BlockUserModal
        isOpen={showBlock}
        onClose={() => setShowBlock(false)}
        onBlock={handleBlock}
      />
      {reportSubmitted && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 px-4 py-2 rounded-full shadow-lg z-50">
          Thank you for your report.
        </div>
      )}
      {blockSubmitted && (
        <div className="fixed bottom-40 left-1/2 -translate-x-1/2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full shadow-lg z-50">
          User blocked. You won't be matched again.
        </div>
      )}
    </div>
  );
}
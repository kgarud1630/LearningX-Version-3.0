import React, { useState } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, Users, MessageCircle, 
  Hand, Settings, MoreVertical, Send, Smile, Paperclip, Phone,
  PhoneOff, Volume2, VolumeX, Maximize, Minimize
} from 'lucide-react';

const LiveClassInterface = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const classInfo = {
    title: "Advanced React Patterns & Performance",
    instructor: "Sarah Johnson",
    duration: "2h 30m",
    participants: 47,
    startTime: "2:00 PM EST"
  };

  const participants = [
    { id: 1, name: "Sarah Johnson", role: "instructor", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150", isPresenting: true },
    { id: 2, name: "Mike Chen", role: "student", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", handRaised: true },
    { id: 3, name: "Emma Davis", role: "student", avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 4, name: "Alex Rodriguez", role: "student", avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 5, name: "You", role: "student", avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: true }
  ];

  const chatMessages = [
    { id: 1, user: "Sarah Johnson", message: "Welcome everyone! We'll start with React.memo and useMemo", time: "2:05 PM", isInstructor: true },
    { id: 2, user: "Mike Chen", message: "Thanks! Looking forward to this session", time: "2:06 PM" },
    { id: 3, user: "Emma Davis", message: "Can you share the slides?", time: "2:07 PM" },
    { id: 4, user: "Sarah Johnson", message: "Slides are now shared on your screen", time: "2:08 PM", isInstructor: true },
    { id: 5, user: "Alex Rodriguez", message: "Great explanation of useMemo!", time: "2:15 PM" },
    { id: 6, user: "You", message: "Question about the dependency array", time: "2:16 PM", isCurrentUser: true }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add message logic here
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">{classInfo.title}</h1>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <span>Instructor: {classInfo.instructor}</span>
              <span className="mx-2">•</span>
              <span>{classInfo.duration}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {classInfo.participants} participants
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              🔴 LIVE
            </div>
            <button className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Container */}
          <div className="flex-1 relative bg-black">
            {/* Main Presenter Video */}
            <div className="w-full h-full relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Instructor presenting"
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay Info */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg">
                <div className="font-medium">{classInfo.instructor}</div>
                <div className="text-sm text-gray-300">Instructor</div>
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>

              {/* Screen Share Indicator */}
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Monitor className="h-4 w-4 mr-1" />
                Screen Sharing
              </div>
            </div>

            {/* Participant Videos Grid */}
            <div className="absolute bottom-4 right-4 grid grid-cols-2 gap-2">
              {participants.slice(1, 5).map((participant) => (
                <div key={participant.id} className="relative">
                  <div className="w-24 h-18 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                    {participant.handRaised && (
                      <div className="absolute top-1 right-1 text-yellow-400">
                        <Hand className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                    {participant.name.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
            <div className="flex items-center justify-center space-x-4">
              {/* Mic Control */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
              </button>

              {/* Video Control */}
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5 text-white" /> : <Video className="h-5 w-5 text-white" />}
              </button>

              {/* Raise Hand */}
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-3 rounded-full transition-colors ${
                  isHandRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <Hand className="h-5 w-5 text-white" />
              </button>

              {/* Leave Call */}
              <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
                <PhoneOff className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Sidebar Tabs */}
          <div className="border-b border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageCircle className="h-4 w-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('participants')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'participants'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Participants ({classInfo.participants})
              </button>
            </nav>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        message.isInstructor ? 'text-blue-400' : 
                        message.isCurrentUser ? 'text-green-400' : 'text-gray-300'
                      }`}>
                        {message.user}
                      </span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                      {message.isInstructor && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                          Instructor
                        </span>
                      )}
                    </div>
                    <div className="text-gray-200 text-sm">{message.message}</div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-700 p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="text-gray-400 hover:text-white p-2">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white p-2">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Participants Tab */}
          {activeTab === 'participants' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="relative">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {participant.isPresenting && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-gray-800"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        participant.isCurrentUser ? 'text-green-400' : 'text-white'
                      }`}>
                        {participant.name}
                        {participant.isCurrentUser && ' (You)'}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">{participant.role}</div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {participant.handRaised && (
                        <Hand className="h-4 w-4 text-yellow-400" />
                      )}
                      {participant.role === 'instructor' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveClassInterface;
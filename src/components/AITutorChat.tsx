import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Paperclip, Smile, MoreVertical, 
  Lightbulb, BookOpen, Code, Calculator, Zap, Star,
  ThumbsUp, ThumbsDown, Copy, RefreshCw, Minimize,
  Maximize, Volume2, VolumeX
} from 'lucide-react';

const AITutorChat = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm Alex, your AI learning assistant. I'm here to help you with programming, math, science, and any other subjects you're studying. What would you like to learn about today?",
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        "Explain React hooks",
        "Help with calculus",
        "JavaScript debugging tips",
        "Study plan for data structures"
      ]
    }
  ]);

  const quickActions = [
    { icon: Code, label: "Code Help", color: "bg-blue-100 text-blue-600" },
    { icon: Calculator, label: "Math Problem", color: "bg-green-100 text-green-600" },
    { icon: BookOpen, label: "Concept Explanation", color: "bg-purple-100 text-purple-600" },
    { icon: Lightbulb, label: "Study Tips", color: "bg-yellow-100 text-yellow-600" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: generateAIResponse(message),
        timestamp: new Date(),
        codeExample: message.toLowerCase().includes('code') || message.toLowerCase().includes('react') ? 
          `function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}` : undefined
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('react') || lowerMessage.includes('hook')) {
      return "Great question about React hooks! Hooks are functions that let you use state and other React features in functional components. The most common ones are useState for managing state and useEffect for side effects. Here's a simple example of a custom hook:";
    } else if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return "JavaScript is a versatile programming language! What specific aspect would you like to explore? I can help with concepts like closures, async/await, array methods, or debugging techniques.";
    } else if (lowerMessage.includes('math') || lowerMessage.includes('calculus')) {
      return "I'd be happy to help with math! Whether it's algebra, calculus, statistics, or any other mathematical concept, I can break it down step by step. What specific problem or concept are you working on?";
    } else if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      return "Effective studying is key to success! Here are some proven techniques: 1) Active recall - test yourself regularly, 2) Spaced repetition - review material at increasing intervals, 3) Pomodoro technique - study in focused 25-minute blocks. What subject are you studying?";
    } else {
      return "I understand you're asking about that topic. Could you provide a bit more detail so I can give you the most helpful explanation? I'm here to break down complex concepts into easy-to-understand parts!";
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Bot className="h-6 w-6 mr-2" />
          <span className="font-medium">AI Tutor</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <Bot className="h-8 w-8 mr-3" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold">AI Tutor - Alex</h3>
              <p className="text-sm text-blue-100">Always here to help you learn</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <Minimize className="h-4 w-4" />
            </button>
            <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.label)}
              className={`${action.color} p-3 rounded-xl hover:opacity-80 transition-opacity flex items-center text-sm font-medium`}
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {msg.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`rounded-2xl p-3 ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  
                  {msg.codeExample && (
                    <div className="mt-3 bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                      <pre>{msg.codeExample}</pre>
                    </div>
                  )}
                  
                  <div className={`text-xs mt-2 ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>

              {/* AI Message Actions */}
              {msg.type === 'ai' && (
                <div className="flex items-center space-x-2 mt-2 ml-10">
                  <button className="text-gray-400 hover:text-green-600 p-1">
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600 p-1">
                    <ThumbsDown className="h-3 w-3" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 p-1">
                    <Copy className="h-3 w-3" />
                  </button>
                  <button className="text-gray-400 hover:text-purple-600 p-1">
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Suggestions */}
              {msg.suggestions && (
                <div className="mt-3 ml-10 space-y-2">
                  {msg.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left text-sm bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <Paperclip className="h-5 w-5" />
          </button>
          
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <Smile className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <Zap className="h-3 w-3 mr-1" />
            Powered by AI • Always learning
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorChat;
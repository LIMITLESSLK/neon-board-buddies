import { useState, useRef, useEffect } from "react";
import { Send, Smile, Hash, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

const mockMessages: Message[] = [
  { id: "1", username: "CyberKnight", message: "Anyone up for a chess match?", timestamp: "14:23" },
  { id: "2", username: "NeonQueen", message: "Just finished an epic Monopoly game! 🎲", timestamp: "14:25" },
  { id: "3", username: "QuantumPlayer", message: "The new poker update is amazing!", timestamp: "14:27", isOwn: true },
  { id: "4", username: "GlowMaster", message: "Looking for Scrabble partners", timestamp: "14:28" },
  { id: "5", username: "PixelWarrior", message: "Who's ready for the tournament?", timestamp: "14:30" },
];

const quickReactions = ["🎮", "🔥", "⚡", "🎲", "🏆", "😄"];

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineCount] = useState(2847);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        username: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const addReaction = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Chat header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hash className="w-8 h-8 text-neon-cyan" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
              Global Arena
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="status-online" />
              <span>{onlineCount.toLocaleString()} players online</span>
            </div>
            <Badge variant="outline" className="border-neon-green/50">
              <Volume2 className="w-3 h-3 mr-1" />
              Live Chat
            </Badge>
          </div>
        </div>

        {/* Chat container */}
        <div className="bg-gradient-surface border border-border rounded-xl overflow-hidden">
          {/* Messages */}
          <ScrollArea className="h-96 p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`chat-bubble ${message.isOwn ? 'own' : ''} max-w-xs lg:max-w-md`}>
                    {!message.isOwn && (
                      <div className="text-xs font-semibold text-neon-cyan mb-1">
                        {message.username}
                      </div>
                    )}
                    <div className="text-sm text-foreground">{message.message}</div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="chat-bubble">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-xs text-muted-foreground">Someone is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat input */}
          <div className="border-t border-border p-4">
            {/* Quick reactions */}
            <div className="flex gap-2 mb-3">
              {quickReactions.map((emoji, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-border hover:border-primary/50 hover:glow-purple"
                  onClick={() => addReaction(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>

            {/* Message input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="bg-input border-border pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} className="btn-neon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
import { useState } from "react";
import { UserPlus, MessageSquare, UserCheck, UserX, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'in-game';
  lastSeen?: string;
  currentGame?: string;
  level: number;
}

interface FriendRequest {
  id: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  sentAt: string;
}

const mockFriends: Friend[] = [
  { id: "1", username: "CyberKnight", avatar: "⚡", status: "online", level: 42 },
  { id: "2", username: "NeonQueen", avatar: "👑", status: "in-game", currentGame: "Cyber Chess", level: 38 },
  { id: "3", username: "PixelWarrior", avatar: "🛡️", status: "online", level: 35 },
  { id: "4", username: "GlowMaster", avatar: "✨", status: "offline", lastSeen: "2 hours ago", level: 41 },
  { id: "5", username: "StarForge", avatar: "⭐", status: "in-game", currentGame: "Neon Monopoly", level: 29 },
];

const mockRequests: FriendRequest[] = [
  { id: "1", username: "VoidHunter", avatar: "🎮", mutualFriends: 3, sentAt: "2 hours ago" },
  { id: "2", username: "ByteQueen", avatar: "💎", mutualFriends: 1, sentAt: "5 hours ago" },
];

const FriendSystem = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusIndicator = (status: Friend['status']) => {
    switch (status) {
      case 'online':
        return <div className="status-online" />;
      case 'offline':
        return <div className="status-offline" />;
      case 'in-game':
        return <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse-glow" />;
    }
  };

  const getStatusText = (friend: Friend) => {
    switch (friend.status) {
      case 'online':
        return <span className="text-neon-green text-xs">Online</span>;
      case 'offline':
        return <span className="text-muted-foreground text-xs">Last seen {friend.lastSeen}</span>;
      case 'in-game':
        return <span className="text-neon-purple text-xs">Playing {friend.currentGame}</span>;
    }
  };

  const filteredFriends = mockFriends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-neon-pink" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gaming Network
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Connect with fellow gamers and build your gaming community
          </p>
        </div>

        {/* Friend system tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-surface border border-border mb-8">
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Friends ({mockFriends.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Requests ({mockRequests.length})
            </TabsTrigger>
            <TabsTrigger value="find" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Find Friends
            </TabsTrigger>
          </TabsList>

          {/* Friends list */}
          <TabsContent value="friends" className="space-y-6">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* Friends grid */}
            <ScrollArea className="h-96">
              <div className="grid gap-4">
                {filteredFriends.map((friend, index) => (
                  <div 
                    key={friend.id}
                    className="friend-card animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-xl">
                            {friend.avatar}
                          </div>
                          <div className="absolute -bottom-1 -right-1">
                            {getStatusIndicator(friend.status)}
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-foreground">{friend.username}</div>
                          <div className="flex items-center gap-2">
                            {getStatusText(friend)}
                            <Badge variant="outline" className="text-xs">
                              Lvl {friend.level}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="btn-cyan">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-destructive/50 hover:border-destructive">
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Friend requests */}
          <TabsContent value="requests" className="space-y-6">
            <div className="grid gap-4">
              {mockRequests.map((request, index) => (
                <div 
                  key={request.id}
                  className="friend-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-xl">
                        {request.avatar}
                      </div>
                      
                      <div>
                        <div className="font-semibold text-foreground">{request.username}</div>
                        <div className="text-sm text-muted-foreground">
                          {request.mutualFriends} mutual friends • {request.sentAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="btn-neon">
                        <UserCheck className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="border-destructive/50 hover:border-destructive">
                        <UserX className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Find friends */}
          <TabsContent value="find" className="space-y-6">
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Find New Gaming Partners</h3>
              <p className="text-muted-foreground mb-6">
                Search for players by username or connect through game matches
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search username..."
                    className="pl-10 bg-input border-border"
                  />
                </div>
                <Button className="w-full btn-neon">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Search Players
                </Button>
              </div>

              <div className="mt-8 p-4 bg-gradient-surface border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Quick Match</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Play games to automatically discover new friends with similar interests
                </p>
                <Button className="btn-cyan">
                  Find Match
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FriendSystem;
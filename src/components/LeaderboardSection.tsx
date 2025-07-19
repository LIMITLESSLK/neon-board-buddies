import { useState } from "react";
import { Trophy, Medal, Crown, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Player {
  rank: number;
  username: string;
  score: number;
  change: number;
  avatar: string;
  title: string;
  games: number;
  winRate: number;
}

const mockLeaderboard: Player[] = [
  { rank: 1, username: "QuantumMaster", score: 2847, change: 2, avatar: "🏆", title: "Grandmaster", games: 156, winRate: 89 },
  { rank: 2, username: "CyberNinja", score: 2734, change: 1, avatar: "⚡", title: "Elite", games: 143, winRate: 87 },
  { rank: 3, username: "NeonKnight", score: 2689, change: -1, avatar: "🔮", title: "Master", games: 134, winRate: 85 },
  { rank: 4, username: "GlowWarrior", score: 2567, change: 3, avatar: "🎯", title: "Expert", games: 121, winRate: 82 },
  { rank: 5, username: "PixelSage", score: 2456, change: 0, avatar: "🧙", title: "Expert", games: 109, winRate: 80 },
  { rank: 6, username: "VoidHunter", score: 2389, change: -2, avatar: "🎮", title: "Advanced", games: 98, winRate: 78 },
  { rank: 7, username: "StarForge", score: 2334, change: 1, avatar: "⭐", title: "Advanced", games: 87, winRate: 76 },
  { rank: 8, username: "ByteQueen", score: 2298, change: 4, avatar: "👑", title: "Advanced", games: 82, winRate: 75 },
  { rank: 9, username: "CodeSamurai", score: 2267, change: -1, avatar: "⚔️", title: "Skilled", games: 79, winRate: 73 },
  { rank: 10, username: "FluxRider", score: 2234, change: 2, avatar: "🌊", title: "Skilled", games: 76, winRate: 72 },
];

const LeaderboardSection = () => {
  const [selectedTab, setSelectedTab] = useState("overall");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-neon-cyan" />;
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3:
        return <Trophy className="w-6 h-6 text-neon-pink" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 text-neon-green text-xs">
          <TrendingUp className="w-3 h-3" />
          +{change}
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-destructive text-xs">
          <TrendingUp className="w-3 h-3 rotate-180" />
          {change}
        </div>
      );
    }
    return <div className="text-xs text-muted-foreground">—</div>;
  };

  const getTitleColor = (title: string) => {
    switch (title) {
      case "Grandmaster":
        return "bg-gradient-primary text-primary-foreground";
      case "Elite":
        return "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50";
      case "Master":
        return "bg-neon-pink/20 text-neon-pink border border-neon-pink/50";
      case "Expert":
        return "bg-neon-purple/20 text-neon-purple border border-neon-purple/50";
      case "Advanced":
        return "bg-neon-green/20 text-neon-green border border-neon-green/50";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Hall of Fame
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compete with the best players worldwide and claim your spot among the legends
          </p>
        </div>

        {/* Leaderboard tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface border border-border">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="chess">Chess</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-8">
            {/* Top 3 podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {mockLeaderboard.slice(0, 3).map((player, index) => (
                <div 
                  key={player.rank}
                  className={`rank-card text-center relative ${
                    player.rank === 1 ? 'md:order-2 transform md:scale-110' : 
                    player.rank === 2 ? 'md:order-1' : 'md:order-3'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {player.rank === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-primary-foreground animate-pulse-glow">
                        Champion
                      </Badge>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    {getRankIcon(player.rank)}
                  </div>
                  
                  <div className="text-4xl mb-2">{player.avatar}</div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{player.username}</h3>
                  <Badge className={getTitleColor(player.title)}>{player.title}</Badge>
                  
                  <div className="mt-4 space-y-2">
                    <div className="text-2xl font-bold text-neon-cyan">{player.score.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    {getChangeIndicator(player.change)}
                  </div>
                </div>
              ))}
            </div>

            {/* Full leaderboard */}
            <div className="bg-gradient-surface border border-border rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground mb-4">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">Player</div>
                  <div className="col-span-2">Rating</div>
                  <div className="col-span-2">Games</div>
                  <div className="col-span-2">Win Rate</div>
                  <div className="col-span-1">Change</div>
                </div>
                
                <div className="space-y-2">
                  {mockLeaderboard.map((player, index) => (
                    <div 
                      key={player.rank}
                      className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg transition-all duration-300 hover:bg-border/50 ${
                        player.rank <= 3 ? 'bg-primary/5 border border-primary/20' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="col-span-1 flex items-center">
                        {getRankIcon(player.rank)}
                      </div>
                      
                      <div className="col-span-4 flex items-center gap-3">
                        <span className="text-2xl">{player.avatar}</span>
                        <div>
                          <div className="font-semibold text-foreground">{player.username}</div>
                          <Badge className={`text-xs ${getTitleColor(player.title)}`}>
                            {player.title}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="col-span-2">
                        <div className="font-bold text-neon-cyan">{player.score.toLocaleString()}</div>
                      </div>
                      
                      <div className="col-span-2">
                        <div className="text-foreground">{player.games}</div>
                      </div>
                      
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="text-foreground">{player.winRate}%</div>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star 
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(player.winRate / 20) ? 'text-neon-cyan fill-current' : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-1">
                        {getChangeIndicator(player.change)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* View more button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-primary/50 hover:border-primary hover:glow-purple">
            View Full Rankings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
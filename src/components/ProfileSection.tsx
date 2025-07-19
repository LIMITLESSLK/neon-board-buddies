import { useState } from "react";
import { Settings, Trophy, Star, Calendar, Edit3, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface GameStats {
  game: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
  bestStreak: number;
  timeSpent: string;
}

const mockAchievements: Achievement[] = [
  { id: "1", title: "First Victory", description: "Win your first game", icon: "🎯", earned: true },
  { id: "2", title: "Chess Master", description: "Win 50 chess games", icon: "♟️", earned: true },
  { id: "3", title: "Speed Demon", description: "Complete a game in under 5 minutes", icon: "⚡", earned: true },
  { id: "4", title: "Social Butterfly", description: "Add 10 friends", icon: "🦋", earned: false, progress: 7, maxProgress: 10 },
  { id: "5", title: "Quiz Genius", description: "Get 30 daily quizzes correct", icon: "🧠", earned: false, progress: 23, maxProgress: 30 },
  { id: "6", title: "Unstoppable", description: "Win 10 games in a row", icon: "🔥", earned: false, progress: 6, maxProgress: 10 },
];

const mockGameStats: GameStats[] = [
  { game: "Cyber Chess", gamesPlayed: 89, wins: 67, winRate: 75, bestStreak: 12, timeSpent: "34h 22m" },
  { game: "Neon Monopoly", gamesPlayed: 34, wins: 19, winRate: 56, bestStreak: 5, timeSpent: "18h 45m" },
  { game: "HoloWords", gamesPlayed: 67, wins: 45, winRate: 67, bestStreak: 8, timeSpent: "21h 15m" },
  { game: "Quantum Poker", gamesPlayed: 23, wins: 14, winRate: 61, bestStreak: 4, timeSpent: "12h 33m" },
];

const avatarOptions = ["🎮", "⚡", "🔮", "🎯", "🧙", "👑", "⭐", "🛡️", "✨", "🌊", "🔥", "💎"];

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("🎮");
  const [profile, setProfile] = useState({
    username: "QuantumPlayer",
    bio: "Master strategist and chess enthusiast. Always looking for the next challenge!",
    level: 42,
    xp: 23750,
    nextLevelXp: 25000,
    joinDate: "March 2024",
    gamesPlayed: 213,
    totalWins: 145,
    currentStreak: 7,
  });

  const xpProgress = (profile.xp / profile.nextLevelXp) * 100;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile header */}
        <div className="bg-gradient-surface border border-border rounded-xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar section */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl animate-pulse-glow">
                {selectedAvatar}
              </div>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full btn-cyan"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              )}
            </div>

            {/* Profile info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{profile.username}</h1>
                <Badge className="bg-gradient-primary text-primary-foreground">
                  Level {profile.level}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-primary/50 hover:border-primary hover:glow-purple"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              
              {/* XP Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="text-foreground">{profile.xp.toLocaleString()} / {profile.nextLevelXp.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-neon-cyan">{profile.gamesPlayed}</div>
                  <div className="text-xs text-muted-foreground">Games Played</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-green">{profile.totalWins}</div>
                  <div className="text-xs text-muted-foreground">Total Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-pink">{profile.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Current Streak</div>
                </div>
              </div>
            </div>

            {/* Join date */}
            <div className="text-center">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                Joined {profile.joinDate}
              </div>
            </div>
          </div>
        </div>

        {/* Profile tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-surface border border-border mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-6">
              <h3 className="text-2xl font-bold text-foreground">Game Statistics</h3>
              
              {mockGameStats.map((stat, index) => (
                <div 
                  key={stat.game}
                  className="game-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-foreground">{stat.game}</h4>
                    <Badge variant="outline" className="border-primary/50">
                      {stat.winRate}% Win Rate
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-neon-cyan">{stat.gamesPlayed}</div>
                      <div className="text-xs text-muted-foreground">Games</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-neon-green">{stat.wins}</div>
                      <div className="text-xs text-muted-foreground">Wins</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-neon-pink">{stat.bestStreak}</div>
                      <div className="text-xs text-muted-foreground">Best Streak</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-neon-purple">{stat.timeSpent}</div>
                      <div className="text-xs text-muted-foreground">Time Played</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Achievements tab */}
          <TabsContent value="achievements" className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Achievements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAchievements.map((achievement, index) => (
                <div 
                  key={achievement.id}
                  className={`game-card ${achievement.earned ? 'glow-purple' : ''} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        {achievement.earned && (
                          <Badge className="bg-neon-green/20 text-neon-green border border-neon-green/50">
                            <Trophy className="w-3 h-3 mr-1" />
                            Earned
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      
                      {!achievement.earned && achievement.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">{achievement.progress} / {achievement.maxProgress}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-gradient-primary transition-all duration-500"
                              style={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings tab */}
          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Profile Settings</h3>
            
            <div className="game-card space-y-6">
              {/* Avatar selection */}
              <div>
                <Label className="text-base font-semibold text-foreground mb-4 block">Choose Avatar</Label>
                <div className="grid grid-cols-6 gap-3">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
                        selectedAvatar === avatar 
                          ? 'bg-gradient-primary glow-purple' 
                          : 'bg-surface border border-border hover:border-primary/50'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="bg-input border-border"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="bg-input border-border min-h-[100px]"
                    placeholder="Tell other players about yourself..."
                  />
                </div>
              </div>

              {/* Save button */}
              <Button className="w-full btn-neon">
                <Settings className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProfileSection;
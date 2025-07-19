import WelcomeBanner from "@/components/WelcomeBanner";
import GameSection from "@/components/GameSection";
import ChatRoom from "@/components/ChatRoom";
import FriendSystem from "@/components/FriendSystem";
import LeaderboardSection from "@/components/LeaderboardSection";
import QuizSection from "@/components/QuizSection";
import ProfileSection from "@/components/ProfileSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Welcome banner with animated background */}
      <WelcomeBanner />
      
      {/* Main content sections */}
      <div className="relative">
        {/* Floating background elements for visual depth */}
        <div className="fixed top-1/4 left-0 w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl animate-float" />
        <div className="fixed bottom-1/4 right-0 w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Game selection section */}
        <GameSection />
        
        {/* Chat room for community interaction */}
        <ChatRoom />
        
        {/* Leaderboard to showcase top players */}
        <LeaderboardSection />
        
        {/* Daily quiz challenge */}
        <QuizSection />
        
        {/* Friend system and social features */}
        <FriendSystem />
        
        {/* User profile and customization */}
        <ProfileSection />
      </div>
    </div>
  );
};

export default Index;

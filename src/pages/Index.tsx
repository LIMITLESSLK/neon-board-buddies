import WelcomeBanner from "@/components/WelcomeBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Welcome banner with animated background */}
      <WelcomeBanner />
      
      {/* Floating background elements for visual depth */}
      <div className="relative">
        <div className="fixed top-1/4 left-0 w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl animate-float" />
        <div className="fixed bottom-1/4 right-0 w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Index;

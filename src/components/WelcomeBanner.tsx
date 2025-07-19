import { useState } from "react";
import { Play, Gamepad2, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WelcomeBanner = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const stats = [
    { icon: Gamepad2, label: "Games", value: "15+" },
    { icon: Users, label: "Players", value: "2.4K" },
    { icon: Trophy, label: "Matches", value: "12.8K" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-darker to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main title */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            MindVault
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            The Ultimate Gaming Experience
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Challenge friends, climb leaderboards, and master your favorite board games 
            in our neon-powered digital arena
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-3 animate-pulse-glow">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button className="btn-neon group">
            <Play className="w-5 h-5 mr-2 group-hover:animate-bounce-subtle" />
            Explore Games
          </Button>
          
          <div className="flex gap-3">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary/50 hover:border-primary hover:glow-purple">
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-surface border-border">
                <DialogHeader>
                  <DialogTitle className="text-center text-foreground">Welcome Back!</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" className="bg-input border-border" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" className="bg-input border-border" />
                  </div>
                  <Button className="w-full btn-cyan">Sign In</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button className="btn-cyan">
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-surface border-border">
                <DialogHeader>
                  <DialogTitle className="text-center text-foreground">Join MindVault</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Choose a username" className="bg-input border-border" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" className="bg-input border-border" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" className="bg-input border-border" />
                  </div>
                  <Button className="w-full btn-neon">Create Account</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Gamepad2, 
  MessageCircle, 
  Trophy, 
  Brain, 
  Users, 
  User 
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/games", label: "Games", icon: Gamepad2 },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/quiz", label: "Quiz", icon: Brain },
    { path: "/friends", label: "Friends", icon: Users },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-surface border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            GameHub
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "text-sm",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex overflow-x-auto space-x-1 scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "flex-shrink-0",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Link to={item.path} className="flex items-center gap-1">
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
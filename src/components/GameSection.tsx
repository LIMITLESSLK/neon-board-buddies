import { useState } from "react";
import { Play, Users, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import chessImage from "@/assets/chess-neon.jpg";
import monopolyImage from "@/assets/monopoly-neon.jpg";
import scrabbleImage from "@/assets/scrabble-neon.jpg";
import pokerImage from "@/assets/poker-neon.jpg";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  players: string;
  duration: string;
  difficulty: number;
  online: number;
  category: string;
}

const games: Game[] = [
  {
    id: "chess",
    title: "Cyber Chess",
    description: "Master the ultimate strategy game with futuristic neon pieces",
    image: chessImage,
    players: "2",
    duration: "15-45 min",
    difficulty: 4,
    online: 234,
    category: "Strategy"
  },
  {
    id: "monopoly",
    title: "Neon Monopoly",
    description: "Build your digital empire in this cyberpunk property trading game",
    image: monopolyImage,
    players: "2-6",
    duration: "60-120 min",
    difficulty: 3,
    online: 156,
    category: "Economic"
  },
  {
    id: "scrabble",
    title: "HoloWords",
    description: "Create glowing words with holographic letter tiles",
    image: scrabbleImage,
    players: "2-4",
    duration: "30-60 min",
    difficulty: 3,
    online: 89,
    category: "Word"
  },
  {
    id: "poker",
    title: "Quantum Poker",
    description: "High-stakes holographic poker with digital cards",
    image: pokerImage,
    players: "2-8",
    duration: "20-90 min",
    difficulty: 4,
    online: 312,
    category: "Card"
  },
];

const GameSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < difficulty ? 'text-neon-cyan fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Choose Your Battlefield
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into our collection of reimagined classic games with cutting-edge visuals and competitive gameplay
          </p>
        </div>

        {/* Games grid */}
        <div className="grid-games">
          {games.map((game, index) => (
            <div 
              key={game.id}
              className="game-card group cursor-pointer"
              onMouseEnter={() => setHoveredCard(game.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Game image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Online indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="status-online" />
                  <span className="text-xs text-white font-medium">{game.online}</span>
                </div>

                {/* Category badge */}
                <Badge className="absolute top-3 left-3 bg-gradient-primary text-primary-foreground">
                  {game.category}
                </Badge>
              </div>

              {/* Game info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {game.description}
                  </p>
                </div>

                {/* Game stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{game.duration}</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">Difficulty:</span>
                    <div className="flex gap-1">
                      {getDifficultyStars(game.difficulty)}
                    </div>
                  </div>
                </div>

                {/* Play button */}
                <Button 
                  className={`w-full transition-all duration-300 ${
                    hoveredCard === game.id ? 'btn-neon' : 'btn-cyan'
                  }`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary/50 hover:border-primary hover:glow-purple">
            Load More Games
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
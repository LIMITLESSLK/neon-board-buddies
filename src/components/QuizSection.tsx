import { useState, useEffect } from "react";
import { Brain, Clock, Zap, Gift, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const dailyQuiz: QuizQuestion = {
  id: "daily-1",
  question: "In chess, what is the special move where a king and rook move simultaneously?",
  options: ["En passant", "Castling", "Promotion", "Zugzwang"],
  correct: 1,
  explanation: "Castling is a special chess move involving the king and either rook, helping to safeguard the king while developing the rook."
};

const QuizSection = () => {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentStreak] = useState(7);
  const [todayXP] = useState(150);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // Reset for next day
          return 86400;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === dailyQuiz.correct;
  const progress = showResult ? 100 : (selectedAnswer !== null ? 75 : 0);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-neon-purple animate-pulse-glow" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Daily Brain Teaser
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Test your gaming knowledge and earn XP with our daily quiz challenge
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-surface border border-border rounded-xl p-6 text-center animate-slide-up">
            <Zap className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
            <div className="text-2xl font-bold text-neon-cyan">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>

          <div className="bg-gradient-surface border border-border rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Gift className="w-8 h-8 text-neon-pink mx-auto mb-3" />
            <div className="text-2xl font-bold text-neon-pink">{todayXP} XP</div>
            <div className="text-sm text-muted-foreground">Today's Earned</div>
          </div>

          <div className="bg-gradient-surface border border-border rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Clock className="w-8 h-8 text-neon-green mx-auto mb-3" />
            <div className="text-2xl font-bold text-neon-green">{formatTime(timeLeft)}</div>
            <div className="text-sm text-muted-foreground">Next Reset</div>
          </div>
        </div>

        {/* Quiz card */}
        <div className="game-card bg-gradient-surface border border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              Daily Challenge
            </Badge>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {dailyQuiz.question}
            </h3>
          </div>

          {/* Answer options */}
          <div className="space-y-3 mb-8">
            {dailyQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? showResult
                      ? index === dailyQuiz.correct
                        ? 'border-neon-green bg-neon-green/10 text-neon-green'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'border-primary bg-primary/10 text-primary'
                    : showResult && index === dailyQuiz.correct
                      ? 'border-neon-green bg-neon-green/10 text-neon-green'
                      : 'border-border bg-surface hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && (
                    selectedAnswer === index
                      ? index === dailyQuiz.correct
                        ? <CheckCircle2 className="w-5 h-5 text-neon-green" />
                        : <XCircle className="w-5 h-5 text-destructive" />
                      : index === dailyQuiz.correct
                        ? <CheckCircle2 className="w-5 h-5 text-neon-green" />
                        : null
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          {!showResult ? (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full btn-neon"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Result message */}
              <div className={`p-4 rounded-lg border ${
                isCorrect 
                  ? 'border-neon-green bg-neon-green/10' 
                  : 'border-destructive bg-destructive/10'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-neon-green" />
                      <span className="font-semibold text-neon-green">Correct!</span>
                      <Badge className="bg-neon-green/20 text-neon-green border border-neon-green/50">
                        +50 XP
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-destructive" />
                      <span className="font-semibold text-destructive">Incorrect</span>
                      <Badge className="bg-destructive/20 text-destructive border border-destructive/50">
                        +10 XP
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{dailyQuiz.explanation}</p>
              </div>

              {/* Next action */}
              <Button variant="outline" className="w-full border-primary/50 hover:border-primary hover:glow-purple">
                Come Back Tomorrow
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
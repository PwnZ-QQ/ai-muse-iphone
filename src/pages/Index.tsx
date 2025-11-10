import { useState } from "react";
import QuickActions from "@/components/QuickActions";
import CodeEditor from "@/components/CodeEditor";
import AIChat from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<string | null>(null);

  const handleActionClick = (action: string) => {
    setActiveView(action);
  };

  const handleBack = () => {
    setActiveView(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            {activeView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-8 px-3"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">AI Ready</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {!activeView && <QuickActions onActionClick={handleActionClick} />}
        
        {activeView === 'editor' && (
          <div className="max-w-4xl mx-auto h-[calc(100vh-120px)]">
            <CodeEditor onClose={handleBack} />
          </div>
        )}
        
        {activeView === 'chat' && (
          <div className="max-w-2xl mx-auto h-[calc(100vh-120px)]">
            <AIChat onClose={handleBack} />
          </div>
        )}
        
        {activeView === 'templates' && (
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">Code Templates</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
        
        {activeView === 'terminal' && (
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">Terminal</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
import { useState } from "react";
import QuickActions from "@/components/QuickActions";
import WebEditor from "@/components/WebEditor";
import AIChat from "@/components/AIChat";
import Terminal from "@/components/Terminal";
import Templates from "@/components/Templates";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<string | null>(null);
  const [templateData, setTemplateData] = useState<{
    html: string;
    css: string;
    js: string;
  } | null>(null);

  const handleActionClick = (action: string) => {
    setActiveView(action);
  };

  const handleBack = () => {
    setActiveView(null);
    setTemplateData(null);
  };

  const handleSelectTemplate = (template: { html: string; css: string; js: string }) => {
    setTemplateData(template);
    setActiveView('editor');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
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
          <div className="max-w-7xl mx-auto h-[calc(100vh-120px)]">
            <WebEditor 
              onClose={handleBack}
              initialHtml={templateData?.html}
              initialCss={templateData?.css}
              initialJs={templateData?.js}
            />
          </div>
        )}
        
        {activeView === 'chat' && (
          <div className="max-w-2xl mx-auto h-[calc(100vh-120px)]">
            <AIChat onClose={handleBack} />
          </div>
        )}
        
        {activeView === 'templates' && (
          <div className="max-w-2xl mx-auto h-[calc(100vh-120px)]">
            <Templates 
              onClose={handleBack}
              onSelectTemplate={handleSelectTemplate}
            />
          </div>
        )}
        
        {activeView === 'terminal' && (
          <div className="max-w-4xl mx-auto h-[calc(100vh-120px)]">
            <Terminal onClose={handleBack} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
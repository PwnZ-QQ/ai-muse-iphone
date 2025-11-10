import { Button } from "@/components/ui/button";
import { Code2, MessageSquare, FileCode, Terminal, Sparkles } from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const actions = [
    { id: 'editor', label: 'Editor', icon: Code2, color: 'text-primary' },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare, color: 'text-accent' },
    { id: 'templates', label: 'Templates', icon: FileCode, color: 'text-code-function' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-code-string' },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4">
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI IDE
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Mobile code editor powered by AI
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            variant="outline"
            className="h-24 flex-col gap-2 hover:bg-secondary/50 hover:border-primary/50 transition-all"
          >
            <action.icon className={`w-6 h-6 ${action.color}`} />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
        <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Features
        </h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Code completion & suggestions</li>
          <li>• Real-time error detection</li>
          <li>• Multi-language support</li>
          <li>• Smart code formatting</li>
        </ul>
      </div>
    </div>
  );
};

export default QuickActions;
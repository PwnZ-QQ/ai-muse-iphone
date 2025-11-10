import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Terminal as TerminalIcon, X, Trash2 } from "lucide-react";

interface TerminalProps {
  onClose?: () => void;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const Terminal = ({ onClose }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'AI IDE Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

    if (!trimmed) return;

    let output = '';
    let isError = false;

    switch (trimmed) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  date     - Show current date and time
  echo     - Echo text (e.g., echo hello)
  whoami   - Display current user
  ls       - List files (demo)
  pwd      - Print working directory
  version  - Show terminal version`;
        break;
      
      case 'clear':
        setLines([]);
        return;
      
      case 'date':
        output = new Date().toString();
        break;
      
      case 'whoami':
        output = 'developer';
        break;
      
      case 'ls':
        output = 'index.html  style.css  script.js  README.md';
        break;
      
      case 'pwd':
        output = '/home/developer/projects/ai-ide';
        break;
      
      case 'version':
        output = 'AI IDE Terminal v1.0.0\nNode.js simulator';
        break;
      
      default:
        if (trimmed.startsWith('echo ')) {
          output = cmd.substring(5);
        } else {
          output = `Command not found: ${trimmed}\nType 'help' for available commands`;
          isError = true;
        }
    }

    setLines(prev => [...prev, { 
      type: isError ? 'error' : 'output', 
      content: output 
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const clearTerminal = () => {
    setLines([
      { type: 'output', content: 'AI IDE Terminal v1.0.0' },
      { type: 'output', content: 'Type "help" for available commands' },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-editor-bg rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={clearTerminal}
            className="h-8 px-3 text-xs"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
          {onClose && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="font-mono text-sm space-y-1">
            {lines.map((line, idx) => (
              <div 
                key={idx}
                className={
                  line.type === 'input' 
                    ? 'text-primary' 
                    : line.type === 'error'
                    ? 'text-destructive'
                    : 'text-muted-foreground'
                }
              >
                {line.content.split('\n').map((text, i) => (
                  <div key={i}>{text}</div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground"
              placeholder="Enter command..."
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
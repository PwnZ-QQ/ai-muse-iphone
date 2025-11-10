import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, Download, FileCode, X } from "lucide-react";
import { toast } from "sonner";

interface CodeEditorProps {
  onClose?: () => void;
}

const CodeEditor = ({ onClose }: CodeEditorProps) => {
  const [code, setCode] = useState(`// Welcome to Mobile AI IDE
// Start coding here...

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Developer'));`);

  const runCode = () => {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.join(' ')),
      };
      
      const func = new Function('console', code);
      func(customConsole);
      
      toast.success('Code executed', {
        description: logs.length > 0 ? logs.join('\n') : 'No output',
      });
    } catch (error) {
      toast.error('Execution error', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded code.js');
  };

  return (
    <div className="flex flex-col h-full bg-editor-bg rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={runCode}
            className="h-8 px-3 text-xs"
          >
            <Play className="w-3 h-3 mr-1" />
            Run
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={downloadCode}
            className="h-8 px-3 text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Save
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

      {/* Code Area */}
      <div className="flex-1 p-4 overflow-auto">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full min-h-[400px] font-mono text-sm bg-editor-bg border-0 resize-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
          placeholder="// Start coding..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
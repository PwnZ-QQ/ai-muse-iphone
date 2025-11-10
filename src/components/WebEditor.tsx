import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, Download, FileCode, X, Eye, Code2 } from "lucide-react";
import { toast } from "sonner";

interface WebEditorProps {
  onClose?: () => void;
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
}

const WebEditor = ({ onClose, initialHtml, initialCss, initialJs }: WebEditorProps) => {
  const [html, setHtml] = useState(initialHtml || `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Start coding here...</p>
</body>
</html>`);

  const [css, setCss] = useState(initialCss || `body {
    font-family: system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f5f5f5;
}

h1 {
    color: #333;
}`);

  const [js, setJs] = useState(initialJs || `console.log('Hello from JavaScript!');

// Add your code here`);

  const [preview, setPreview] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  const updatePreview = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('JavaScript Error:', error);
            }
          </script>
        </body>
      </html>
    `;
    setPreview(combinedCode);
  };

  const downloadFiles = () => {
    // Create HTML file with inline CSS and JS
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded index.html');
  };

  return (
    <div className="flex flex-col h-full bg-editor-bg rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Web Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowPreview(!showPreview)}
            className="h-8 px-3 text-xs"
          >
            {showPreview ? (
              <>
                <Code2 className="w-3 h-3 mr-1" />
                Code Only
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 mr-1" />
                Show Preview
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={updatePreview}
            className="h-8 px-3 text-xs"
          >
            <Play className="w-3 h-3 mr-1" />
            Run
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={downloadFiles}
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

      {/* Editor and Preview */}
      <div className={`flex-1 flex ${showPreview ? 'flex-col md:flex-row' : ''} overflow-hidden`}>
        {/* Code Editor */}
        <div className={`${showPreview ? 'md:w-1/2' : 'w-full'} flex flex-col border-r border-border`}>
          <Tabs defaultValue="html" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4">
              <TabsTrigger value="html" className="data-[state=active]:bg-primary/10">
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="data-[state=active]:bg-primary/10">
                CSS
              </TabsTrigger>
              <TabsTrigger value="js" className="data-[state=active]:bg-primary/10">
                JavaScript
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="flex-1 m-0">
              <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-full font-mono text-sm bg-editor-bg border-0 resize-none focus-visible:ring-0 rounded-none"
                placeholder="<!-- HTML code here -->"
                spellCheck={false}
              />
            </TabsContent>
            
            <TabsContent value="css" className="flex-1 m-0">
              <Textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-full font-mono text-sm bg-editor-bg border-0 resize-none focus-visible:ring-0 rounded-none"
                placeholder="/* CSS styles here */"
                spellCheck={false}
              />
            </TabsContent>
            
            <TabsContent value="js" className="flex-1 m-0">
              <Textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                className="w-full h-full font-mono text-sm bg-editor-bg border-0 resize-none focus-visible:ring-0 rounded-none"
                placeholder="// JavaScript code here"
                spellCheck={false}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="md:w-1/2 flex flex-col bg-background">
            <div className="px-4 py-2 bg-card border-b border-border">
              <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                srcDoc={preview}
                title="preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebEditor;
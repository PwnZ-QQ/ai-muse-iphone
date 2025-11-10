import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode, X, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface TemplatesProps {
  onClose?: () => void;
  onSelectTemplate?: (template: { name: string; html: string; css: string; js: string }) => void;
}

const templates = [
  {
    id: 'basic',
    name: 'Basic HTML Template',
    description: 'Simple HTML page with CSS and JS',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>Welcome to my page</p>
        <button id="myButton">Click me</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f0f0f0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}`,
    js: `document.getElementById('myButton').addEventListener('click', function() {
    alert('Button clicked!');
});

console.log('Page loaded!');`,
  },
  {
    id: 'card',
    name: 'Card Layout',
    description: 'Responsive card grid',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Layout</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Featured Cards</h1>
        <div class="card-grid">
            <div class="card">
                <h3>Card 1</h3>
                <p>This is card content</p>
            </div>
            <div class="card">
                <h3>Card 2</h3>
                <p>This is card content</p>
            </div>
            <div class="card">
                <h3>Card 3</h3>
                <p>This is card content</p>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
    css: `body {
    font-family: system-ui, -apple-system, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    color: white;
    text-align: center;
    margin-bottom: 40px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

.card h3 {
    margin-bottom: 10px;
    color: #333;
}`,
    js: `const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    });
});`,
  },
  {
    id: 'interactive',
    name: 'Interactive Counter',
    description: 'Counter with animations',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="counter-container">
        <h1>Counter App</h1>
        <div class="counter" id="counter">0</div>
        <div class="buttons">
            <button id="decrease">-</button>
            <button id="reset">Reset</button>
            <button id="increase">+</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
    css: `body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.counter-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    text-align: center;
}

h1 {
    margin: 0 0 30px 0;
    color: #333;
}

.counter {
    font-size: 72px;
    font-weight: bold;
    color: #667eea;
    margin: 30px 0;
    transition: transform 0.3s;
}

.buttons {
    display: flex;
    gap: 15px;
}

button {
    padding: 15px 30px;
    font-size: 24px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
}

#decrease {
    background: #ff6b6b;
    color: white;
}

#reset {
    background: #4ecdc4;
    color: white;
}

#increase {
    background: #95e1d3;
    color: #333;
}

button:hover {
    transform: scale(1.1);
}`,
    js: `let count = 0;
const counterDisplay = document.getElementById('counter');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');
const increaseBtn = document.getElementById('increase');

function updateDisplay() {
    counterDisplay.textContent = count;
    counterDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 200);
}

decreaseBtn.addEventListener('click', () => {
    count--;
    updateDisplay();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

increaseBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});`,
  },
];

const Templates = ({ onClose, onSelectTemplate }: TemplatesProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (template: typeof templates[0]) => {
    const fullCode = `<!-- ${template.name} -->
${template.html}

<!-- CSS -->
<style>
${template.css}
</style>

<!-- JavaScript -->
<script>
${template.js}
</script>`;

    navigator.clipboard.writeText(fullCode);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Template copied to clipboard!');
  };

  const useTemplate = (template: typeof templates[0]) => {
    if (onSelectTemplate) {
      onSelectTemplate({
        name: template.name,
        html: template.html,
        css: template.css,
        js: template.js,
      });
      toast.success('Template loaded!');
      onClose?.();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Code Templates</span>
        </div>
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

      {/* Templates List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => useTemplate(template)}
                  className="flex-1"
                >
                  Use Template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(template)}
                >
                  {copiedId === template.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Templates;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Check, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LANGUAGES = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "C#",
  "Go",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Rust",
];

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("Python");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing prompt",
        description: "Please enter a prompt to generate code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: { prompt, language },
      });

      if (error) throw error;

      setGeneratedCode(data.code);
      toast({
        title: "Success!",
        description: "Code generated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gencraft-code-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Saved!",
      description: "Code saved to your device",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Code Generation</CardTitle>
          <CardDescription>
            Describe the code functionality you need
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Programming Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Example: Create a function to sort a list..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
          
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-gradient-hero hover:shadow-glow transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Code"
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedCode && (
        <Card className="shadow-soft animate-in fade-in slide-in-from-bottom duration-500">
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
            <CardDescription>Your AI-generated code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {generatedCode}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="outline" className="flex-1">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button onClick={handleSave} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodeGenerator;

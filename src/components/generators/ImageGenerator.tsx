import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Check, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing prompt",
        description: "Please enter a prompt to generate an image",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt },
      });

      if (error) throw error;

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Success!",
        description: "Image generated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedImage);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Image URL copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `gencraft-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Saved!",
      description: "Image saved to your device",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Image Generation</CardTitle>
          <CardDescription>
            Describe the image you want to create
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Example: A serene mountain landscape at sunset..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
              "Generate Image"
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedImage && (
        <Card className="shadow-soft animate-in fade-in slide-in-from-bottom duration-500">
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
            <CardDescription>Your AI-generated image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg overflow-hidden bg-muted/50">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-auto"
              />
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
                    Copy URL
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

export default ImageGenerator;

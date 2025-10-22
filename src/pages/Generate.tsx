import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, Code } from "lucide-react";
import TextGenerator from "@/components/generators/TextGenerator";
import ImageGenerator from "@/components/generators/ImageGenerator";
import CodeGenerator from "@/components/generators/CodeGenerator";

const Generate = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-hero bg-clip-text text-transparent">
              AI Generation Studio
            </h1>
            <p className="text-muted-foreground">
              Choose your creation type and let AI do the magic
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 p-1 bg-muted/50">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <TextGenerator />
            </TabsContent>

            <TabsContent value="image">
              <ImageGenerator />
            </TabsContent>

            <TabsContent value="code">
              <CodeGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Generate;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Image, Code } from "lucide-react";
import Navigation from "@/components/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="mb-8 inline-block p-4 rounded-2xl bg-gradient-hero shadow-glow animate-in fade-in duration-700">
            <Sparkles className="h-16 w-16 text-primary-foreground" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-in slide-in-from-bottom duration-700">
            Welcome to GenCraft
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in duration-700 delay-150">
            Your creative generation studio. Craft stunning text, images, and code with the power of AI.
            All in one beautiful, easy-to-use platform.
          </p>
          
          <Link to="/generate">
            <Button 
              size="lg" 
              className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 animate-in zoom-in duration-700 delay-300"
            >
              Start Creating
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="py-20 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-in slide-in-from-left duration-700">
            <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Text Generation</h3>
            <p className="text-muted-foreground">
              Generate compelling content, articles, and creative writing with advanced AI models.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-in slide-in-from-bottom duration-700 delay-150">
            <div className="mb-4 p-3 rounded-xl bg-secondary/10 w-fit">
              <Image className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Image Creation</h3>
            <p className="text-muted-foreground">
              Bring your imagination to life with AI-powered image generation from simple prompts.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-in slide-in-from-right duration-700 delay-300">
            <div className="mb-4 p-3 rounded-xl bg-accent/10 w-fit">
              <Code className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Code Generation</h3>
            <p className="text-muted-foreground">
              Generate clean, efficient code snippets in multiple programming languages instantly.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-card shadow-medium">
            <h2 className="text-4xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators using GenCraft to bring their ideas to life.
            </p>
            <Link to="/generate">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 GenCraft. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

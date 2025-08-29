import { MessageCircle, Brain, Rocket } from 'lucide-react'
import { FeatureCard } from '@/components/FeatureCard'
import { HealthIntakeForm } from '@/components/HealthIntakeForm'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 animate-fade-in">
            Talk Freely.<br />
            Understand Deeply.<br />
            Heal Confidently.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Your private AI health companion for teens & youth. From conversation → clarity → care — all in one safe space.
          </p>

          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <a 
              href="#intake"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover-lift glow-border transition-all duration-300"
            >
              Start Free Check-in
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={MessageCircle}
            title="🗣️ Dialogue"
            description="Chat naturally, no judgment. Share your thoughts and feelings in a completely safe, private space designed just for you."
            delay={200}
          />
          <FeatureCard
            icon={Brain}
            title="🧠 Understanding"
            description="AI explains in plain language. Get clear insights about your mental state with personalized summaries and gentle guidance."
            delay={400}
          />
          <FeatureCard
            icon={Rocket}
            title="🚀 Next Steps"
            description="Personalized tips + downloadable report. Receive actionable wellness strategies and track your progress over time."
            delay={600}
          />
        </div>

        {/* Health Intake Section */}
        <section id="intake" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Begin Your Wellness Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A quick, private check-in to help us understand you better and personalize your experience.
            </p>
          </div>
          
          <HealthIntakeForm />
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            ©️ 2025 SereneMind • Made with ❤️ for better days
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index

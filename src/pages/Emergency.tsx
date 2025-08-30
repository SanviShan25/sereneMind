import { Phone } from 'lucide-react'

export default function Emergency() {
  const helplines = [
    {
      name: "National Suicide Prevention Helpline",
      number: "9152987821",
      description: "24/7 crisis support"
    },
    {
      name: "Vandrevala Foundation",
      number: "9999666555",
      description: "Mental health support"
    },
    {
      name: "AASRA",
      number: "9820466726",
      description: "Emotional support helpline"
    },
    {
      name: "iCALL",
      number: "9152987821",
      description: "Psychosocial helpline"
    },
    {
      name: "Sneha Foundation",
      number: "04424640050",
      description: "Suicide prevention helpline"
    },
    {
      name: "Youth Helpline",
      number: "9867728090",
      description: "Support for young adults"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Emergency Contacts</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you're in crisis or need immediate support, reach out to these trusted helplines. 
            You're not alone, and help is available 24/7.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {helplines.map((helpline, index) => (
            <div key={index} className="glass-card glass-glow glow-border p-6 rounded-xl hover-lift">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {helpline.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {helpline.description}
                  </p>
                  <a 
                    href={`tel:${helpline.number}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    {helpline.number}
                  </a>
                </div>
                <div className="ml-4">
                  <a
                    href={`tel:${helpline.number}`}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-card p-6 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Remember: You Matter
            </h3>
            <p className="text-muted-foreground">
              Your life has value and meaning. These feelings are temporary, but your life is precious. 
              Reaching out for help is a sign of strength, not weakness.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
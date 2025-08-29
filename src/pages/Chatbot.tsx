import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Send, Download, User, Bot, ArrowLeft } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface IntakeData {
  fullName: string
  email: string
  date: string
  timestamp: string
}

export default function Chatbot() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null)

  useEffect(() => {
    // Load intake data from localStorage
    const savedIntake = localStorage.getItem('sereneMindIntake')
    if (!savedIntake) {
      toast({
        title: "Please complete the intake form first",
        description: "Redirecting you to the homepage...",
        variant: "destructive",
      })
      navigate('/')
      return
    }

    const data = JSON.parse(savedIntake)
    setIntakeData(data)

    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: `Hi ${data.fullName}! I'm your AI wellness companion. I'm here to listen without judgment and help you understand your feelings better. What's on your mind today?`,
      sender: 'ai',
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [navigate, toast])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    // Simple response generation (replace with actual AI)
    const responses = [
      "I hear you, and what you're feeling is completely valid. Can you tell me more about what's been weighing on your mind lately?",
      "Thank you for sharing that with me. It takes courage to express these feelings. How long have you been experiencing this?",
      "That sounds really challenging. You're not alone in feeling this way. What usually helps you feel a bit better, even if just for a moment?",
      "I appreciate you trusting me with this. Your feelings matter, and I'm here to help you work through them. What would support look like for you right now?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generatePDFReport = () => {
    const reportData = {
      intake: intakeData,
      conversation: messages,
      generatedAt: new Date().toISOString(),
    }
    
    // Simple text report generation (replace with actual PDF library)
    const reportText = `
SereneMind Wellness Report
Generated: ${new Date().toLocaleDateString()}

Participant: ${intakeData?.fullName}
Session Date: ${intakeData?.date}

Conversation Summary:
${messages.map(msg => `${msg.sender.toUpperCase()}: ${msg.content}`).join('\n\n')}

Next Steps:
• Continue regular check-ins with yourself
• Practice mindfulness and self-compassion
• Consider talking to a trusted friend or counselor
• Remember: seeking help is a sign of strength

---
SereneMind - Your AI Wellness Companion
    `.trim()

    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sereneMind-report-${new Date().getTime()}.txt`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Report Downloaded",
      description: "Your wellness report has been saved to your device.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card glass-glow h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <div>
                      <h1 className="text-xl font-bold gradient-text">AI Wellness Chat</h1>
                      <p className="text-sm text-muted-foreground">Safe • Private • Supportive</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'glass-card border border-border/50'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'ai' && (
                            <Bot className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className="text-xs opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {message.sender === 'user' && (
                            <User className="h-5 w-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="glass-card border border-border/50 rounded-2xl p-4">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-5 w-5 text-primary" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-6 border-t border-border/50">
                <div className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Share what's on your mind..."
                    className="flex-1 glass-card border-border/50 focus:border-primary/50"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Intake Summary */}
            {intakeData && (
              <Card className="glass-card glass-glow p-6">
                <h3 className="text-lg font-semibold gradient-text mb-4">Session Info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{intakeData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{intakeData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{intakeData.date}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions */}
            <Card className="glass-card glass-glow p-6">
              <h3 className="text-lg font-semibold gradient-text mb-4">Actions</h3>
              <Button
                onClick={generatePDFReport}
                className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
                disabled={messages.length < 2}
              >
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Export your conversation and insights for future reference or to share with a trusted person.
              </p>
            </Card>

            {/* Privacy Notice */}
            <Card className="glass-card p-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 This conversation is private and stored locally on your device only.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
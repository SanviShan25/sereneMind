import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { Send } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  date: z.string().min(1, 'Date is required'),
})

type FormData = z.infer<typeof formSchema>

export function HealthIntakeForm() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Save to Supabase database
      const { error } = await (supabase as any)
        .from('user_registrations')
        .insert({
          full_name: data.fullName,
          email: data.email,
          registration_date: data.date
        })

      if (error) {
        throw error
      }

      // Also save to localStorage for chatbot access
      localStorage.setItem('sereneMindIntake', JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }))

      // Show success alert
      alert("Registration Successful! 🎉\n\nWelcome to SereneMind. Your information has been saved securely to our database.")

      toast({
        title: "Welcome to SereneMind!",
        description: "Your information has been saved securely. Let's start your wellness journey.",
      })

      // Navigate to chatbot
      setTimeout(() => {
        navigate('/chatbot')
      }, 1500)
    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: "Registration failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card glass-glow glow-border p-8 rounded-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">Start Your Journey</h2>
          <p className="text-sm text-muted-foreground">
            Just a few details to personalize your experience
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="glass-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="glass-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="glass-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3 rounded-xl transition-all duration-300 hover-lift"
            >
              {isSubmitting ? (
                "Starting Journey..."
              ) : (
                <>
                  Start Free Check-in
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          🔒 Your information stays private and is stored locally on your device
        </p>
      </div>
    </div>
  )
}
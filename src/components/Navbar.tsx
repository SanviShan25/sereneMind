import { Link, useLocation } from 'react-router-dom'
import { Brain } from 'lucide-react'

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl glass-glow">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">SereneMind</h1>
              <p className="text-xs text-muted-foreground">AI Wellness Companion</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/emergency"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                location.pathname === '/emergency'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Emergency
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
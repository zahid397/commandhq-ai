import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Brain, Rocket } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-16 text-center">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <Zap className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            CommandHQ<span className="text-primary">.ai</span>
          </h1>

          <p className="text-xl text-muted-foreground">
            AI-Powered DevOps Command Center
          </p>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Intelligent incident response, automated deployment orchestration, and
            cost optimization—all powered by AI agents working together to keep your
            infrastructure running smoothly.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Launch Dashboard
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/incidents">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Incidents
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Incident Commander</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered incident analysis with root cause detection and automated
              response recommendations.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
              <Rocket className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Deployment Orchestrator</h3>
            <p className="text-sm text-muted-foreground">
              Smart deployment planning with canary analysis and intelligent rollback
              suggestions.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Cost Optimizer</h3>
            <p className="text-sm text-muted-foreground">
              Real-time cost anomaly detection with actionable optimization
              recommendations.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24">
          <p className="text-sm font-medium text-muted-foreground">POWERED BY</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <span className="text-sm font-semibold">Next.js 14</span>
            <span className="text-sm font-semibold">TypeScript</span>
            <span className="text-sm font-semibold">Tailwind CSS</span>
            <span className="text-sm font-semibold">shadcn/ui</span>
            <span className="text-sm font-semibold">Zustand</span>
          </div>
        </div>
      </div>
    </div>
  );
}

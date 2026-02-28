# 📄 Complete README.md for CommandHQ.ai

### README.md

```markdown
# ⚡ CommandHQ.ai

> AI-Powered DevOps Command Center for Intelligent Infrastructure Management

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://andhq-ai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**🚀 [Live Demo](https://andhq-ai.vercel.app)** | **📖 [Documentation](#documentation)** | **🎯 [Features](#features)**

---

## 📖 Overview

CommandHQ.ai is an intelligent DevOps command center that orchestrates **4 AI agents** working together to manage infrastructure, respond to incidents, optimize deployments, and reduce costs—all in real-time.

Built for the **[FLIR App Challenge 2025]** hackathon, this MVP demonstrates how AI can revolutionize DevOps operations through autonomous agent collaboration.

### 🎯 The Problem

Modern DevOps teams face:
- ⚠️ **Manual incident triage** taking 30+ minutes
- 🚀 **Risky deployments** without intelligent rollback decisions
- 💰 **Cloud cost overruns** going undetected for weeks
- 📚 **Outdated runbooks** that slow down incident response

### ✨ The Solution

CommandHQ.ai deploys **4 specialized AI agents** that:
1. 🧠 **Incident Commander** - Analyzes incidents, detects root causes, suggests fixes
2. 🚀 **Deployment Orchestrator** - Plans canary deployments, recommends rollbacks
3. 📖 **Runbook Generator** - Auto-creates step-by-step response procedures
4. 💰 **Cost Optimizer** - Detects anomalies, provides optimization strategies

---

## ✨ Features

### 🎛️ Real-Time Dashboard
- **Live metrics** from infrastructure (CPU, memory, latency, costs)
- **Activity feed** with real-time event streaming
- **System health** monitoring at a glance
- **Interactive charts** with drill-down capabilities

### 🚨 Intelligent Incident Management
- **AI-powered root cause analysis** with confidence scores
- **Automatic severity classification** (critical, high, medium, low)
- **Service impact tracking** across microservices
- **Recommended actions** for immediate remediation
- **Auto-generated runbooks** for recurring issues

### 🚀 Smart Deployment Orchestration
- **Multi-stage deployment pipelines** (Pre-checks → Build → Canary → Validation → Rollout)
- **Canary analysis** with 10% traffic testing
- **Intelligent rollback suggestions** on failure detection
- **Real-time deployment timelines** with progress tracking

### 💰 Cost Optimization Engine
- **Real-time cost anomaly detection** (spikes, sustained increases)
- **Service-level cost breakdown** with variance analysis
- **AI-powered optimization recommendations**
- **Budget compliance monitoring**

### 📚 Automated Runbook Generation
- **Incident-to-runbook** auto-creation
- **Step-by-step procedures** with commands
- **Safety warnings** for destructive operations
- **Category organization** (incident, deployment, maintenance)

### 🎨 Modern UI/UX
- **Dark mode support** with system preference detection
- **Fully responsive** (desktop, tablet, mobile)
- **Real-time updates** without page refreshes
- **Interactive tooltips** and data visualizations
- **shadcn/ui components** for consistent design

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Interactive data visualization

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight global state

### Backend
- **Next.js API Routes** - Serverless functions
- **TypeScript** - End-to-end type safety

### AI & Simulation
- **Custom Agent System** - 4 specialized AI agents
- **Simulation Engine** - Auto-generates realistic events
- **Mock Data System** - JSON-based infrastructure data

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** (optional)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/commandhq-ai.git
cd commandhq-ai

# 2. Install dependencies
npm install

# 3. Create environment file (optional)
cp .env.example .env.local

# 4. Run development server
npm run dev

# 5. Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start

# Or deploy to Vercel (recommended)
vercel
```

---

## 📁 Project Structure

```
commandhq-ai/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── api/                  # API routes
│   │   │   ├── agents/           # AI agent endpoints
│   │   │   └── simulate/         # Simulation endpoints
│   │   ├── dashboard/            # Dashboard page
│   │   ├── incidents/            # Incidents page
│   │   ├── deployments/          # Deployments page
│   │   ├── costs/                # Cost optimization page
│   │   ├── runbooks/             # Runbooks page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/               # Layout components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── incidents/            # Incident components
│   │   ├── deployments/          # Deployment components
│   │   ├── costs/                # Cost components
│   │   └── runbooks/             # Runbook components
│   ├── lib/                      # Core libraries
│   │   ├── agents/               # AI agent implementations
│   │   │   ├── agent-orchestrator.ts
│   │   │   ├── incident-commander.ts
│   │   │   ├── deployment-orchestrator.ts
│   │   │   ├── runbook-generator.ts
│   │   │   └── cost-optimizer.ts
│   │   ├── simulation/           # Event simulation
│   │   ├── mock-data/            # JSON mock data
│   │   ├── store/                # Zustand state management
│   │   ├── types/                # TypeScript types
│   │   └── utils.ts              # Utility functions
│   └── hooks/                    # Custom React hooks
│       ├── use-simulation.ts
│       └── use-agents.ts
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🎮 Usage Guide

### Starting a Simulation

1. Navigate to the **Dashboard** page
2. Click **"Start Simulation"** button
3. Watch as the system auto-generates:
   - New incidents (30% probability every 10s)
   - Deployments (30% probability)
   - Cost alerts (20% probability)
4. Click **"Stop Simulation"** to pause event generation
5. Click **"Reset"** to clear all data

### Analyzing an Incident

1. Go to **Incidents** page
2. Click **"Analyze with AI"** on any incident
3. AI Incident Commander will:
   - Detect root cause
   - Assess impact
   - Suggest actions
   - Generate a runbook
4. View the generated runbook in **Runbooks** page

### Managing Deployments

1. Go to **Deployments** page
2. Click **"Start Deployment"**
3. Watch the multi-stage pipeline:
   - Pre-deployment checks
   - Build & package
   - Canary deployment (10% traffic)
   - Validation
   - Full rollout (100% traffic)
4. If deployment fails, click **"Rollback"** for AI suggestions

### Optimizing Costs

1. Go to **Cost Optimization** page
2. Click **"Analyze Costs"**
3. AI Cost Optimizer will:
   - Detect anomalies
   - Calculate variance
   - Provide optimization recommendations
4. Review service-level cost breakdowns

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=CommandHQ.ai
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Configuration (Optional - uses mock AI by default)
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_ENABLE_REAL_AI=false

# Simulation Settings
NEXT_PUBLIC_SIMULATION_INTERVAL=10000
NEXT_PUBLIC_INCIDENT_PROBABILITY=0.3
NEXT_PUBLIC_DEPLOYMENT_PROBABILITY=0.3
NEXT_PUBLIC_COST_ALERT_PROBABILITY=0.2

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

### Customization

#### Change Theme Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(221.2 83.2% 53.3%)", // Change primary color
      // ... other colors
    }
  }
}
```

#### Adjust Simulation Timing

Edit `.env.local`:

```bash
# Generate events every 5 seconds instead of 10
NEXT_PUBLIC_SIMULATION_INTERVAL=5000
```

#### Add Custom Services

Edit `src/lib/simulation/simulation-engine.ts`:

```typescript
private services = [
  'api-gateway',
  'auth-service',
  'your-custom-service', // Add here
];
```

---

## 📡 API Documentation

### POST /api/agents

Execute AI agent actions.

**Request:**
```json
{
  "action": "analyze_incident",
  "payload": {
    "id": "incident-001",
    "title": "Database Connection Pool Exhausted",
    "severity": "critical",
    // ... other incident fields
  }
}
```

**Actions:**
- `analyze_incident` - Get AI analysis of incident
- `plan_deployment` - Create deployment plan
- `generate_runbook` - Generate runbook from incident
- `suggest_rollback` - Get rollback recommendation
- `analyze_costs` - Analyze cost metrics

**Response:**
```json
{
  "analysis": {
    "rootCause": "Database connection pool exhaustion...",
    "impactAssessment": "Critical - 50% of API requests failing",
    "suggestedActions": ["Scale database read replicas..."],
    "estimatedResolutionTime": "15-30 minutes",
    "confidence": 0.92
  },
  "action": "🚨 IMMEDIATE ACTION REQUIRED...",
  "runbook": { /* Runbook object */ }
}
```

### POST /api/simulate

Generate simulated events.

**Request:**
```json
{
  "type": "incident" // or "deployment", "cost_alert", "metrics"
}
```

**Response:**
```json
{
  "id": "incident-123",
  "title": "High API Latency Detected",
  "severity": "high",
  "status": "open",
  "affectedServices": ["api-gateway"],
  "detectedAt": "2026-02-28T10:30:00Z"
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# - Link to existing project or create new
# - Configure environment variables
# - Deploy to production
```

### Manual Deployment

```bash
# 1. Build production bundle
npm run build

# 2. Start production server
npm start

# 3. Access at http://localhost:3000
```

### Environment Variables on Vercel

Add these in **Vercel Dashboard → Settings → Environment Variables**:

- `NEXT_PUBLIC_APP_URL` = `https://your-domain.vercel.app`
- `OPENAI_API_KEY` = `sk-your-key` (if using real AI)

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build test
npm run build
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*Real-time overview with metrics, charts, and activity feed*

### Incidents
![Incidents](docs/screenshots/incidents.png)
*AI-powered incident analysis and root cause detection*

### Deployments
![Deployments](docs/screenshots/deployments.png)
*Multi-stage deployment pipeline with canary analysis*

### Cost Optimization
![Costs](docs/screenshots/costs.png)
*Cost anomaly detection with AI recommendations*

### Runbooks
![Runbooks](docs/screenshots/runbooks.png)
*Auto-generated operational procedures*

---

## 🎯 Roadmap

### Phase 1 - MVP ✅ (Complete)
- [x] 4 AI agents implementation
- [x] Real-time dashboard
- [x] Incident management
- [x] Deployment orchestration
- [x] Cost optimization
- [x] Runbook generation
- [x] Simulation engine

### Phase 2 - Integrations 🚧 (Planned)
- [ ] Real OpenAI API integration
- [ ] Slack notifications
- [ ] AWS CloudWatch integration
- [ ] Datadog metrics
- [ ] PagerDuty incidents
- [ ] GitHub Actions deployments

### Phase 3 - Enterprise 📋 (Future)
- [ ] User authentication
- [ ] Multi-tenant support
- [ ] Role-based access control
- [ ] Database persistence
- [ ] Webhook subscriptions
- [ ] Custom alert rules

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write TypeScript with strict types
- Follow existing code style (Prettier + ESLint)
- Add comments for complex logic
- Update documentation for new features
- Test on mobile and desktop

---

## 🐛 Known Issues

- Simulation events are client-side only (reset on page refresh)
- Mock AI responses (not using real OpenAI API by default)
- No data persistence (uses in-memory state)
- Limited to 50 activity logs (older logs are removed)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - Amazing React framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Vercel](https://vercel.com/)** - Seamless deployment platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - Gorgeous icon library
- **[Recharts](https://recharts.org/)** - Powerful charting library

---

## 🔗 Links

- **Live Demo:** [https://andhq-ai.vercel.app](https://andhq-ai.vercel.app)
- **GitHub:** [https://github.com/yourusername/commandhq-ai](https://github.com/yourusername/commandhq-ai)
- **Documentation:** [View Docs](#documentation)
- **Issues:** [Report Bug](https://github.com/yourusername/commandhq-ai/issues)

---

## 💬 Support

Need help? Have questions?

- 📧 Email: support@commandhq.ai
- 💬 Discord: [Join Community](https://discord.gg/commandhq)
- 🐦 Twitter: [@commandhq_ai](https://twitter.com/commandhq_ai)

---

## ⭐ Star History

If you find this project helpful, please consider giving it a star! ⭐

---

<div align="center">

**Built with ❤️ for the DevOps Community**

Made by [Your Name](https://github.com/yourusername) | [FLIR App Challenge 2025]

</div>
```

---

## 📝 Additional Files

### LICENSE (MIT License)

```markdown
MIT License

Copyright (c) 2026 CommandHQ.ai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### .env.example

```bash
# ============================================
# CommandHQ.ai - Environment Configuration
# ============================================

# App Configuration
NEXT_PUBLIC_APP_NAME=CommandHQ.ai
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Configuration (OPTIONAL - uses mock AI by default)
# OPENAI_API_KEY=sk-your-openai-api-key-here
# NEXT_PUBLIC_ENABLE_REAL_AI=false

# Simulation Settings
NEXT_PUBLIC_SIMULATION_INTERVAL=10000
NEXT_PUBLIC_INCIDENT_PROBABILITY=0.3
NEXT_PUBLIC_DEPLOYMENT_PROBABILITY=0.3
NEXT_PUBLIC_COST_ALERT_PROBABILITY=0.2

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### CONTRIBUTING.md

```markdown
# Contributing to CommandHQ.ai

Thank you for your interest in contributing! 🎉

## How to Contribute

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a new branch for your feature
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with clear messages
7. **Push** to your fork
8. **Submit** a Pull Request

## Development Setup

```bash
git clone https://github.com/yourusername/commandhq-ai.git
cd commandhq-ai
npm install
npm run dev
```

## Code Style

- Use TypeScript with strict types
- Follow Prettier formatting
- Run `npm run lint` before committing
- Add comments for complex logic

## Pull Request Process

1. Update documentation for new features
2. Add screenshots for UI changes
3. Ensure all tests pass
4. Request review from maintainers

## Questions?

Open an issue or reach out on Discord!
``

import HeroBento from '@/components/HeroBento';
import ROIPulse from '@/components/ROIPulse';
import AssistantPreview from '@/components/AssistantPreview';
import TechStackGrid from '@/components/TechStackGrid';
import LeadershipSnippet from '@/components/LeadershipSnippet';
import CaseStudyCard from '@/components/CaseStudyCard';

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-7xl mx-auto flex flex-col gap-16">
      <header className="flex justify-between items-center w-full mb-8">
        <div className="text-xl font-bold tracking-tighter mix-blend-difference">
          DAVE<span className="text-blue-500">SMITH</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#orchestration" className="hover:text-white transition-colors">Orchestration</a>
          <a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a>
          <a href="#contact" className="hover:text-white transition-colors">Hire Me</a>
        </nav>
      </header>

      <section id="orchestration" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        <HeroBento />
        <ROIPulse />
        <LeadershipSnippet />
        <TechStackGrid />
        <AssistantPreview />
      </section>

      <section id="case-studies" className="pt-16 border-t border-white/10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">High-ROI Orchestration</h2>
          <p className="text-zinc-400">Demonstrating measurable impact through agentic systems and digital labor governance.</p>
        </div>

        {/* Case Studies will be injected here next */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CaseStudyCard
            headline="Optimizing Enterprise Intelligence via Copilot Analytics"
            action="Engineered a real-time dashboard for Copilot usage reporting and analysis."
            tooling={['Next.js', 'Telemetry', 'React', 'TypeScript']}
            roiMetric="Identified 25% license optimization and 15-35% operational cost reductions."
            imageSrc="/ai_project_3.png"
          />
          <CaseStudyCard
            headline="Scaling Agentic Capability via MCP Training"
            action="Architected a 'Knowledge Transfer' series to train engineers on MCP server development with Custom Instructions."
            tooling={['MCP', 'Node.js', 'Digital Workforce', 'Governance']}
            roiMetric="Deployed 10+ custom internal agent tools, reducing developer rote work by 40%."
            imageSrc="/ai_project_1.png"
          />
          <CaseStudyCard
            headline="Automating the SDLC via Intelligent Code Agents"
            action="Developed a suite of AI-integrated coding tools to streamline repository management and PR reviews."
            tooling={['LangChain', 'Map-Reduce-Align', 'Python']}
            roiMetric="Accelerated PR review cycles by 60% with semantic code context generation."
            imageSrc="/ai_project_2.png"
          />
        </div>
      </section>

    </main>
  );
}

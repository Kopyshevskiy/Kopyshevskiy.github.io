import React from 'react';
import { PROFILE, PROJECTS, SOCIAL_LINKS } from './data';
import { ProjectCard } from './components/ProjectCard';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-100">
      {/* Changed max-w-3xl to max-w-2xl for narrower content (bigger borders) */}
      {/* Increased padding px-6 to px-8 md:px-12 */}
      <div className="max-w-2xl mx-auto px-8 md:px-12 py-16 md:py-32">
        
        {/* Header / Bio Section */}
        <header className="mb-24 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-black">
            {PROFILE.name}
          </h1>
          <p className="text-xl text-neutral-500 mb-8 font-light">
            {PROFILE.title}
          </p>
          
          <div className="prose prose-neutral prose-lg text-neutral-600 mb-10 leading-relaxed">
            <p>{PROFILE.bio}</p>
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-black transition-colors duration-300"
                aria-label={link.platform}
              >
                {link.icon}
              </a>
            ))}
            <a 
              href={`mailto:${PROFILE.email}`}
              className="text-neutral-400 hover:text-black transition-colors duration-300"
              aria-label="Email"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </header>

        {/* Projects Section */}
        <section>
          <div className="flex items-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
             <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">Selected Work</h2>
             <div className="h-px bg-neutral-100 flex-1"></div>
          </div>
         
          <div className="space-y-12">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-neutral-100 text-center text-neutral-400 text-sm font-light animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        </footer>
      </div>

      {/* Interactive Elements */}
      <ChatWidget />
    </div>
  );
};

export default App;
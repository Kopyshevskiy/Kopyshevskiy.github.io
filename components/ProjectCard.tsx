import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Staggered animation delay based on index
  const animationDelay = `${index * 150}ms`;

  return (
    <div 
      className="group relative animate-fade-in-up opacity-0 flex flex-col md:flex-row gap-6 items-start"
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Section - Fixed width/height on desktop, full width on mobile if desired, or kept small */}
      {project.mediaUrl ? (
        <div className="w-full md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-sm border border-neutral-100 bg-neutral-50 shadow-sm">
           <img 
             src={project.mediaUrl} 
             alt={`${project.title} visualization`}
             className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
             loading="lazy"
           />
        </div>
      ) : (
        /* Placeholder for alignment if no image exists, or render nothing to let text expand */
        <div className="hidden md:block w-32 h-32 flex-shrink-0 rounded-sm border border-neutral-100 bg-neutral-50/50 flex items-center justify-center">
            <span className="text-neutral-200 text-xs">No Preview</span>
        </div>
      )}

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-neutral-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {project.title}
        </h3>
        
        <div className="text-sm text-neutral-400 font-mono mt-1 mb-2">
          {project.year}
        </div>
        
        <p className="text-neutral-600 text-sm leading-relaxed mb-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 items-center mt-auto">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider border border-neutral-100 px-1.5 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
          
          {project.link && (
            <a 
              href={project.link} 
              className="ml-auto text-xs border border-neutral-200 px-2 py-1 rounded-sm text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300 flex items-center gap-1"
            >
              PROJECT
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
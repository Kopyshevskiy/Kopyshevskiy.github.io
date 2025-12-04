import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  year: string;
  mediaUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode; // Using SVG directly to avoid heavy icon libs for this snippet
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  avatarUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
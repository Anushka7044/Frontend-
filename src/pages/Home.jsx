import React from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import ProgressPreview from '../components/ProgressPreview/ProgressPreview';
import GrowthMessage from '../components/GrowthMessage/GrowthMessage';
import CTASection from '../components/CTA/CTASection';

export default function Home({ onNavigate, user }) {
  return (
    <main className="home-page-wrapper">
      <Hero onNavigate={onNavigate} user={user} />
      <Features onNavigate={onNavigate} user={user} />
      <HowItWorks />
      <ProgressPreview onNavigate={onNavigate} user={user} />
      <GrowthMessage onNavigate={onNavigate} user={user} />
      <CTASection onNavigate={onNavigate} user={user} />
    </main>
  );
}

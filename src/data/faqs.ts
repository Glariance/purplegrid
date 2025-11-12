import { MessageCircleQuestion } from 'lucide-react';

export const faqs = [
  {
    category: 'Collaboration & Communication',
    icon: MessageCircleQuestion,
    questions: [
      {
        question: 'How do I communicate with my remote team?',
        answer:
          'Every pod operates inside your preferred channels - typically a shared Slack/Teams space plus weekly live syncs. You also get a Pod Leader who consolidates updates and flags decisions.'
      },
      {
        question: 'How often do I get reports?',
        answer:
          'Daily digest via email or Slack outlining wins, risks, and priority actions. Weekly summary video, and a monthly ROI review call to recalibrate strategy.'
      },
      {
        question: 'Can I work async across time zones?',
        answer:
          'Yes. Pods are staffed across multiple time zones to create follow-the-sun coverage. We map your preferred hours during onboarding and overlap at least 2 core hours daily.'
      }
    ]
  }
];

export type FAQGroup = typeof faqs[number];

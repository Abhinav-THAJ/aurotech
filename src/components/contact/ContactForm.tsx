'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'Customer';
    const emailVal = email.trim() || 'Not provided';
    const subjectVal = subject.trim() || 'General Inquiry';
    const messageVal = message.trim();

    const text = 
`Hello Auro Tech International,

I have an inquiry from your website:

*Name:* ${fullName}
*Email:* ${emailVal}
*Subject:* ${subjectVal}

*Message:*
${messageVal}`;

    const whatsappUrl = `https://wa.me/919498818184?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
          <Input 
            required 
            placeholder="John" 
            className="h-12" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
          <Input 
            placeholder="Doe" 
            className="h-12" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
        <Input 
          required 
          type="email" 
          placeholder="john@example.com" 
          className="h-12" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
        <Input 
          required 
          placeholder="How can we help?" 
          className="h-12" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
        <textarea 
          required
          rows={5} 
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Tell us about your requirements..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-orange-600 hover:bg-orange-700 h-14 text-lg rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
      >
        <MessageSquare className="w-5 h-5" />
        Send Message via WhatsApp
      </Button>
    </form>
  );
}

import React from 'react';

interface ChatGPTModalProps {
  promptContext: string;
  onClose: () => void;
}

export function ChatGPTModal({ promptContext, onClose }: ChatGPTModalProps) {
  const copyPrompt = () => {
    navigator.clipboard.writeText(promptContext);
    alert("Prompt copied to clipboard! Paste this into ChatGPT.");
  };

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in">
      <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-full">
        <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
          <div>
            <h3 className="font-bold text-lg">ChatGPT No-Key Mode</h3>
            <p className="text-sm text-muted-foreground mt-1">Copy this prompt into ChatGPT to generate your email for free.</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <textarea readOnly value={promptContext} className="w-full h-[300px] p-4 bg-muted text-sm font-mono rounded-xl border border-border focus:outline-none resize-none" />
        </div>
        <div className="p-6 border-t border-border bg-muted/30 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 font-medium">Close</button>
          <button onClick={copyPrompt} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-xl hover-lift shadow-md">Copy Prompt</button>
        </div>
      </div>
    </div>
  );
}

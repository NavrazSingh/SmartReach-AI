import React, { useState } from 'react';
import { Send, Copy, Check, Mail, Building2, UserCircle2, Loader2, Rocket } from 'lucide-react';

function App() {
  const [icp, setIcp] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!icp || !company || !email) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ icp, company, email }),
      });
      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (error) {
      console.error('Error generating email:', error);
      alert('Failed to generate email. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
            SmartReach AI
          </h1>
        </div>
        <div className="text-sm font-medium text-slate-500">
          
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel: Input */}
          <section className="space-y-6">
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Outreach Details
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                    <UserCircle2 className="w-4 h-4" /> Ideal Customer Profile (ICP)
                  </label>
                  <textarea 
                    className="input-field min-h-[100px] resize-none"
                    placeholder="e.g. CTO of a mid-sized healthcare startup"
                    value={icp}
                    onChange={(e) => setIcp(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Target Company
                  </label>
                  <input 
                    type="text"
                    className="input-field"
                    placeholder="e.g. HealthSync Tech"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Contact Email
                  </label>
                  <input 
                    type="email"
                    className="input-field"
                    placeholder="e.g. contact@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="btn-primary w-full mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Generate Email
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Right Panel: Output */}
          <section className="space-y-6">
            <div className="glass-card p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Generated Outreach Email</h2>
                {generatedEmail && (
                  <button 
                    onClick={handleCopy}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 transition-colors"
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Email</>
                    )}
                  </button>
                )}
              </div>

              <div className={`flex-grow rounded-xl bg-slate-50 border border-slate-200 p-6 min-h-[300px] relative overflow-hidden transition-all duration-500 ${!generatedEmail ? 'flex items-center justify-center' : ''}`}>
                {!generatedEmail && !loading && (
                  <div className="text-center text-slate-400 max-w-xs">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Enter details and click generate to see your outreach email here.</p>
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center transition-all">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                      <p className="text-sm font-medium text-primary-600">Drafting your email...</p>
                    </div>
                  </div>
                )}

                {generatedEmail && (
                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {generatedEmail}
                  </div>
                )}
              </div>
              
              {generatedEmail && (
                <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100 flex gap-3 text-sm text-primary-800">
                  <Rocket className="w-5 h-5 flex-shrink-0 text-primary-600" />
                  <p>This email was generated using FireReach AI, focused on cybersecurity training for startups.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;

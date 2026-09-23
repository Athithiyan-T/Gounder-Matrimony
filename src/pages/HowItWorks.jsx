import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, FAQS } from '../data/staticData';

export const HowItWorks = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '4rem 0' }}>
      <div className="container">
        
        {/* Banner Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
          <span className="subtitle-badge">Step-by-Step Guide</span>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            How Gounder Matrimony Works
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            A transparent and simple step-by-step process to assist families from profile creation to marriage proposal.
          </p>
        </div>

        {/* 4 Step Visual Process Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div key={idx} className="card" style={{ padding: '2rem', background: '#FFF', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-gold)',
                fontSize: '1.4rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontFamily: 'var(--font-brand)'
              }}>
                {step.step}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="subtitle-badge">Frequently Asked Questions</span>
            <h2 className="section-main-heading">Got Questions? We Have Answers</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="card" style={{ background: '#FFF', overflow: 'hidden' }}>
                  <div
                    onClick={() => toggleFaq(idx)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      backgroundColor: isOpen ? 'var(--color-primary-light)' : '#FFF'
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HelpCircle size={18} color="var(--color-gold)" />
                      {faq.question}
                    </h4>
                    {isOpen ? <ChevronUp size={20} color="var(--color-primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                  </div>

                  {isOpen && (
                    <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(122,28,41,0.08)', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Ready to Register Your Profile?
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

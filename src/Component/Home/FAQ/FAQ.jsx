import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqs = [
    {
        question: "Who can donate blood?",
        answer: "Anyone between 18-65 years old, weighing at least 50kg, and in good health can donate blood. You must not have donated blood in the last 3 months and should not have any infections or chronic diseases.",
    },
    {
        question: "How often can I donate blood?",
        answer: "You can donate whole blood every 3 months (12 weeks). This gap allows your body to fully replenish the donated blood and maintain healthy iron levels.",
    },
    {
        question: "Is blood donation safe?",
        answer: "Yes, blood donation is completely safe. We use sterile, single-use needles and equipment for each donor. Our trained medical staff ensures the process is safe and comfortable.",
    },
    {
        question: "How long does the donation process take?",
        answer: "The entire process takes about 45 minutes to 1 hour, including registration, health screening, donation (10-15 minutes), and rest period. The actual blood collection takes only 10-15 minutes.",
    },
    {
        question: "What should I do before donating blood?",
        answer: "Eat a healthy meal, drink plenty of water, get adequate sleep the night before, and bring a valid ID. Avoid fatty foods before donation and don't donate on an empty stomach.",
    },
    {
        question: "Will I feel weak after donating?",
        answer: "Most donors feel fine after donating. You might feel slightly lightheaded, which is why we provide refreshments and ask you to rest for 10-15 minutes. Drink plenty of fluids and avoid strenuous activities for the rest of the day.",
    },
    {
        question: "Can I donate if I'm on medication?",
        answer: "It depends on the medication. Common medications like vitamins and birth control are usually fine, but antibiotics and certain other medications may require a waiting period. Consult with our medical staff during screening.",
    },
    {
        question: "What happens to my blood after donation?",
        answer: "Your blood is tested for infections, typed, and separated into components (red cells, plasma, platelets). It's then stored and distributed to hospitals when needed for surgeries, emergencies, and treatments.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-14 bg-white dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
                    {/* Animated Decorative Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <h2 className="text-rose-600 dark:text-rose-500 font-heading font-bold tracking-[0.3em] uppercase text-[10px]">
                            Knowledge Base
                        </h2>
                    </div>

                    {/* Main Title - Using your font-heading (Montserrat) */}
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter italic font-heading mb-6">
                        FREQUENTLY ASKED <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-rose-700">
                            QUESTIONS.
                        </span>
                    </h3>

                    {/* Subtext with improved readability */}
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-slate-500 dark:text-slate-400 font-sans text-base md:text-lg max-w-xl leading-relaxed font-light">
                            Got questions about the mission? We've gathered the essential data
                            to help you prepare for your life-saving journey.
                        </p>

                        {/* Decorative Divider */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-px bg-slate-200 dark:bg-white/10"></div>
                            <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            <div className="w-12 h-px bg-slate-200 dark:bg-white/10"></div>
                        </div>
                    </div>
                </div>

                {/* Custom Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 rounded-2xl overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="font-heading font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 transition-colors">
                                    {faq.question}
                                </span>
                                <span className={`text-rose-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
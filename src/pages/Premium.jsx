import React, { useState } from "react";
import { FaCheck, FaCrown, FaMusic, FaDownload, FaInfinity, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RazorpayModal from "../components/RazorpayModal";

const PremiumPage = () => {
    const navigate = useNavigate();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleGetPlan = (plan) => {
        setSelectedPlan(plan);
        setIsPaymentOpen(true);
    };

    const plans = [
        {
            name: "Individual",
            price: "₹199",
            features: [
                "Ad-free music listening",
                "Download to listen offline",
                "Play songs in any order",
                "High quality audio",
                "Listen with friends in real time",
                "Organize listening queue"
            ],
            color: "from-purple-600 to-blue-600",
            buttonText: "Get Individual",
            recommended: false
        },
        {
            name: "Premium Gold",
            price: "₹399",
            features: [
                "Everything in Individual",
                "Ultra High Quality (Lossless)",
                "Early access to new releases",
                "Exclusive Artist content",
                "VibeFy Live Concert access",
                "Member-only merch discounts"
            ],
            color: "from-amber-400 to-orange-600",
            buttonText: "Go Gold",
            recommended: true
        },
        {
            name: "Family",
            price: "₹599",
            features: [
                "6 Premium accounts",
                "Block explicit music",
                "Family Mix: A playlist for your family",
                "VibeFy Kids app access",
                "Ad-free music listening",
                "Download to listen offline"
            ],
            color: "from-green-600 to-emerald-800",
            buttonText: "Get Family",
            recommended: false
        }
    ];

    return (
        <div className="flex flex-col min-h-full pb-20">
            {/* Payment Modal */}
            <RazorpayModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                plan={selectedPlan}
            />

            {/* Hero Section */}
            <div className="relative px-4 sm:px-8 pt-20 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black z-0"></div>

                {/* Decorative Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto mt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-amber-400 font-bold text-sm animate-bounce-slow">
                        <FaCrown />
                        <span>PREMIUM MEMBERSHIP</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white">
                        Experience Music <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Like Never Before</span>
                    </h1>
                    <p className="text-[#b3b3b3] text-lg sm:text-xl font-medium max-w-2xl">
                        Ad-free music, offline listening, and ultra-high quality audio.
                        Join millions of listeners on VibeFy Premium.
                    </p>
                </div>
            </div>

            {/* Why Premium Section */}
            <div className="px-4 sm:px-8 py-12">
                <h2 className="text-3xl font-black text-white text-center mb-12">Why Go Premium?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: FaInfinity, title: "Ad-free Music", desc: "Enjoy uninterrupted music without any ads." },
                        { icon: FaDownload, title: "Offline Playback", desc: "Save your data by downloading your favorite tracks." },
                        { icon: FaVolumeUp, title: "High Quality", desc: "Listen in high fidelity for a crystal clear experience." },
                        { icon: FaMusic, title: "Anywhere", desc: "Listen on your phone, speaker, and other devices." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-[#b3b3b3] text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Plans Section */}
            <div className="px-4 sm:px-8 py-16">
                <h2 className="text-3xl font-black text-white text-center mb-4">Choose Your Plan</h2>
                <p className="text-[#b3b3b3] text-center mb-16">No commitment, cancel anytime.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative flex flex-col p-8 rounded-[2.5rem] border ${plan.recommended ? 'border-amber-400/50 bg-white/5' : 'border-white/10 bg-[#181818]'} transition-all hover:translate-y-[-8px]`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-black rounded-full uppercase tracking-wider">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-white">{plan.price}</span>
                                    <span className="text-[#b3b3b3] text-sm">/ month</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 mb-10">
                                {plan.features.map((feature, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <FaCheck className="text-[10px] text-white" />
                                        </div>
                                        <span className="text-sm text-[#b3b3b3]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleGetPlan(plan)}
                                className={`w-full py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${plan.color} text-white shadow-xl`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="px-4 sm:px-8 mt-12">
                <div className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-[3rem] text-center flex flex-col items-center gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white relative z-10">Ready to level up your vibe?</h2>
                    <p className="text-white/80 font-medium relative z-10">Enjoy a 30-day free trial on us. No hidden fees.</p>
                    <button className="bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-2xl relative z-10">
                        Start 30-Day Free Trial
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default PremiumPage;

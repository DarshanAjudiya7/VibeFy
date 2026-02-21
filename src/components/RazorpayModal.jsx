import React, { useState } from "react";
import {
    FaArrowLeft,
    FaUser,
    FaShieldAlt,
    FaChevronDown,
    FaChevronUp,
    FaMobileAlt,
    FaCreditCard,
    FaUniversity,
    FaHistory,
    FaWallet,
    FaCheckCircle
} from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

const RazorpayModal = ({ isOpen, onClose, plan }) => {
    const [selectedMethod, setSelectedMethod] = useState("upi");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
            }, 2000);
        }, 1500);
    };

    const PaymentOption = ({ id, icon: Icon, label, subIcons, isExpanded, onClick }) => (
        <div className="border-b border-gray-100 last:border-none">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="text-gray-600 text-xl">
                        <Icon />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-semibold text-gray-800">{label}</span>
                        {subIcons && <div className="flex gap-2 mt-1">{subIcons}</div>}
                    </div>
                </div>
                {isExpanded ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
            </button>
            {isExpanded && id === "upi" && (
                <div className="grid grid-cols-2 gap-3 p-5 bg-gray-50/50">
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all group">
                        <SiGooglepay className="text-gray-600 group-hover:text-[#4285F4]" size={24} />
                        <span className="text-sm font-medium text-gray-700">Google Pay</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all group">
                        <SiPhonepe className="text-gray-600 group-hover:text-[#5f259f]" size={24} />
                        <span className="text-sm font-medium text-gray-700">PhonePe</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all group">
                        <SiPaytm className="text-gray-600 group-hover:text-[#00B9F1]" size={24} />
                        <span className="text-sm font-medium text-gray-700">PayTM</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all group">
                        <span className="text-sm font-bold text-gray-400">...</span>
                        <span className="text-sm font-medium text-gray-700">Other UPI</span>
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-[420px] bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                {isSuccess ? (
                    <div className="p-12 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <FaCheckCircle className="text-green-500 text-5xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-500">Welcome to VibeFy Premium</p>
                    </div>
                ) : (
                    <>
                        {/* Razorpay Header */}
                        <div className="bg-[#2a55e5] p-5 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-lg transition-all">
                                    <FaArrowLeft />
                                </button>
                                <div className="text-center">
                                    <h2 className="text-lg font-bold">VibeFy</h2>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider">
                                        <FaShieldAlt className="text-green-400" />
                                        Razorpay Trusted Business
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaUser />
                                </div>
                            </div>
                        </div>

                        {/* Payment Body */}
                        <div className="bg-gray-50 px-5 py-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">All Payment Options</h3>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <PaymentOption
                                    id="upi"
                                    icon={FaMobileAlt}
                                    label="UPI"
                                    subIcons={<><SiGooglepay size={14} /><SiPhonepe size={14} /><SiPaytm size={14} /></>}
                                    isExpanded={selectedMethod === "upi"}
                                    onClick={() => setSelectedMethod(selectedMethod === "upi" ? "" : "upi")}
                                />
                                <PaymentOption
                                    id="cards"
                                    icon={FaCreditCard}
                                    label="Cards"
                                    isExpanded={selectedMethod === "cards"}
                                    onClick={() => setSelectedMethod(selectedMethod === "cards" ? "" : "cards")}
                                />
                                <PaymentOption
                                    id="netbanking"
                                    icon={FaUniversity}
                                    label="Netbanking"
                                    isExpanded={selectedMethod === "netbanking"}
                                    onClick={() => setSelectedMethod(selectedMethod === "netbanking" ? "" : "netbanking")}
                                />
                                <PaymentOption
                                    id="wallet"
                                    icon={FaWallet}
                                    label="Wallet"
                                    isExpanded={selectedMethod === "wallet"}
                                    onClick={() => setSelectedMethod(selectedMethod === "wallet" ? "" : "wallet")}
                                />
                                <PaymentOption
                                    id="paylater"
                                    icon={FaHistory}
                                    label="Pay Later"
                                    isExpanded={selectedMethod === "paylater"}
                                    onClick={() => setSelectedMethod(selectedMethod === "paylater" ? "" : "paylater")}
                                />
                            </div>

                            {/* Trust Badges */}
                            <div className="flex justify-center gap-6 mt-8 opacity-40">
                                <div className="flex flex-col items-center gap-1">
                                    <FaShieldAlt size={16} />
                                    <span className="text-[8px] font-bold">PCI DSS</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FaCheckCircle size={16} />
                                    <span className="text-[8px] font-bold">VERIFIED</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-gray-100 flex items-center justify-between">
                            <div>
                                <span className="block text-xl font-bold text-gray-800">
                                    {plan?.price || "₹0"}
                                </span>
                                <button className="text-[10px] font-bold text-blue-600 uppercase hover:underline">
                                    View Details
                                </button>
                            </div>
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className={`px-12 py-3 bg-[#121212] text-white font-bold rounded-xl hover:bg-black transition-all flex items-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RazorpayModal;

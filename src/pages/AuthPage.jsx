import { SignIn } from "@clerk/clerk-react";
import { FaMusic } from "react-icons/fa";

const AuthPage = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#090909]">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#1db954]/10 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#1db954]/5 blur-[120px] animate-pulse delay-75"></div>

                {/* Animated Mesh Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#090909_100%)]"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1db954 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-8 animate-bounce-slow">
                    <div className="w-12 h-12 bg-[#1db954] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(29,185,84,0.3)]">
                        <FaMusic className="text-black text-2xl" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white">
                        Vibe<span className="text-[#1db954]">Fy</span>
                    </h1>
                </div>

                {/* Clerk SignIn Component */}
                <div className="w-full shadow-2xl rounded-2xl overflow-hidden border border-white/5 backdrop-blur-xl bg-white/5">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-transparent border-none shadow-none",
                            }
                        }}
                    />
                </div>

                {/* Support/Info Text */}
                <p className="mt-8 text-center text-[#b3b3b3] text-sm font-medium">
                    Experience music like never before. <br />
                    Join the <span className="text-white">VibeFy</span> community today.
                </p>
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

export default AuthPage;

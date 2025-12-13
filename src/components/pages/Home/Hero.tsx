import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Trophy, Info } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Slider } from '../../ui/slider';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

interface HeroProps {
    authenticated?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ authenticated = false }) => {
    const [seed, setSeed] = useState(8);
    const [wins, setWins] = useState(3);
    const [shares, setShares] = useState(10);
    const [payoutPerShare, setPayoutPerShare] = useState(0);
    const [totalPayout, setTotalPayout] = useState(0);

    useEffect(() => {
        const perShare = seed * wins;
        setPayoutPerShare(perShare);
        setTotalPayout(perShare * shares);
    }, [seed, wins, shares]);

    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-y-auto bg-slate-950 py-6 md:py-12">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/10 via-slate-950 to-slate-950" />
                {/* Abstract grid lines */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                ></div>
            </div>

            <div className="container relative z-10 px-4 mx-auto py-6 md:py-0">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Branding & Intro */}
                    <div className="text-center lg:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                                <span className="block">Trade the</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">
                                    Tournament.
                                </span>
                            </h1>
                            <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                The first fantasy market where you buy shares in
                                teams. Payouts are determined by our unique{' '}
                                <span className="text-orange-400 font-semibold">
                                    Seed × Wins × Shares
                                </span>{' '}
                                protocol.
                            </p>
                        </motion.div>

                        {/* Trust/Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span>$1000 Budget</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                            <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-orange-500" />
                                <span>Compete for Points</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: The "Protocol" Interface */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Decorative glow behind the card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 rounded-full blur-[100px]" />

                        <Card className="relative bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden rounded-3xl">
                            {/* Header of the Card */}
                            <div className="bg-slate-950/50 p-4 md:p-6 border-b border-white/5 flex items-center gap-3 md:gap-4">
                                <div className="relative w-16 h-16 shrink-0 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-2 shadow-inner">
                                    <img
                                        src="/mmm-logo-cropped.jpg"
                                        alt="MMM Logo"
                                        className="w-full h-full object-contain"
                                        style={{
                                            imageRendering: 'crisp-edges',
                                            WebkitBackfaceVisibility: 'hidden',
                                            backfaceVisibility: 'hidden',
                                            transform: 'translateZ(0)',
                                        }}
                                        loading="eager"
                                        decoding="sync"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-base font-semibold text-white">
                                        Seed Multiplier Protocol
                                    </h3>
                                </div>
                            </div>

                            <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                                {/* Visualizer */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                            Equation
                                        </div>
                                        <div className="text-xl md:text-2xl font-mono text-white">
                                            <span className="text-blue-400 font-bold">
                                                #{seed}
                                            </span>
                                            <span className="text-slate-600 mx-2">
                                                ×
                                            </span>
                                            <span className="text-orange-400 font-bold">
                                                {wins} Wins
                                            </span>
                                            <span className="text-slate-600 mx-2">
                                                ×
                                            </span>
                                            <span className="text-green-400 font-bold">
                                                {shares} Shares
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div>
                                            <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                                Total Points
                                            </div>
                                            <motion.div
                                                key={totalPayout}
                                                initial={{ scale: 1.2 }}
                                                animate={{ scale: 1 }}
                                                className="text-3xl md:text-4xl font-black tracking-tighter text-white"
                                            >
                                                {totalPayout}
                                                <span className="text-lg text-slate-500 font-normal ml-1">
                                                    pts
                                                </span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sliders Area */}
                                <div className="space-y-4 md:space-y-6 bg-slate-950/50 rounded-2xl p-4 md:p-6 border border-white/5">
                                    {/* Seed Slider */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300 font-medium flex items-center gap-2">
                                                Tournament Seed{' '}
                                                <Info className="w-3 h-3 text-slate-600" />
                                            </span>
                                            <span className="text-blue-400 font-mono bg-blue-400/10 px-2 py-0.5 rounded">
                                                #{seed}
                                            </span>
                                        </div>
                                        <Slider
                                            value={[seed]}
                                            max={16}
                                            min={1}
                                            step={1}
                                            onValueChange={(vals) =>
                                                setSeed(vals[0])
                                            }
                                            className="py-2 cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-600 font-medium uppercase tracking-wider">
                                            <span>Favorite (#1)</span>
                                            <span>Underdog (#16)</span>
                                        </div>
                                    </div>

                                    {/* Wins Slider */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300 font-medium flex items-center gap-2">
                                                Total Wins{' '}
                                                <Info className="w-3 h-3 text-slate-600" />
                                            </span>
                                            <span className="text-orange-400 font-mono bg-orange-400/10 px-2 py-0.5 rounded">
                                                {wins} Wins
                                            </span>
                                        </div>
                                        <Slider
                                            value={[wins]}
                                            max={6}
                                            min={0}
                                            step={1}
                                            onValueChange={(vals) =>
                                                setWins(vals[0])
                                            }
                                            className="py-2 cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-600 font-medium uppercase tracking-wider">
                                            <span>Early Exit (0)</span>
                                            <span>Champion (6)</span>
                                        </div>
                                    </div>

                                    {/* Shares Slider */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300 font-medium flex items-center gap-2">
                                                Number of Shares ($1 each){' '}
                                                <Info className="w-3 h-3 text-slate-600" />
                                            </span>
                                            <span className="text-green-400 font-mono bg-green-400/10 px-2 py-0.5 rounded">
                                                {shares} Shares
                                            </span>
                                        </div>
                                        <Slider
                                            value={[shares]}
                                            max={1000}
                                            min={1}
                                            step={1}
                                            onValueChange={(vals) =>
                                                setShares(vals[0])
                                            }
                                            className="py-2 cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-600 font-medium uppercase tracking-wider">
                                            <span>Min (1)</span>
                                            <span>Max (1000)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Insight Box */}
                                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            Allocate your{' '}
                                            <span className="text-white font-bold">
                                                $1000 budget
                                            </span>{' '}
                                            wisely across teams.
                                            {seed >= 12 &&
                                            wins >= 2 &&
                                            shares >= 20
                                                ? ' High Risk, High Reward! Cinderella stories with more shares yield massive total payouts.'
                                                : seed <= 4 &&
                                                  wins >= 4 &&
                                                  shares >= 20
                                                ? ' Consistent performers with more shares yield steady, reliable total returns.'
                                                : shares >= 50
                                                ? ' More shares amplify your returns! Higher share counts multiply your total payout.'
                                                : ' Balance your portfolio with a mix of safe seeds, potential upsets, and share allocation.'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

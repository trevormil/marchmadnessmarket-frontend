import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, LogOut } from 'lucide-react';
import { RootState } from '../../../redux/store';
import * as ROUTES from '../../../constants/routes';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../../ui/sheet';
import { logOutUser } from '../../../redux/actions/userActions';
// Tabs component not used in new design

const Navigation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authenticated = useSelector(
        (state: RootState) => state.user.authenticated
    );
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(logOutUser());
        navigate(ROUTES.HOME);
    };

    const getCurrentPath = () => {
        const pathName = location.pathname.split('/');
        if (pathName[pathName.length - 2] === 'stocks') {
            return ROUTES.BROWSE;
        }
        return `/${pathName.pop()}`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to={ROUTES.HOME}
                    className="flex items-center gap-3 group"
                >
                    <img
                        src="/mmm-logo-cropped.jpg"
                        alt="March Madness Market Logo"
                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg transition-transform group-hover:scale-105 object-contain flex-shrink-0"
                        style={{
                            imageRendering: 'crisp-edges',
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                        }}
                        loading="eager"
                        decoding="sync"
                    />
                    <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight whitespace-nowrap hidden sm:inline">
                        March Madness Market
                    </span>
                    <span className="text-base font-bold text-white tracking-tight sm:hidden">
                        MMM
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        to={ROUTES.BROWSE}
                        className={`text-sm font-medium transition-colors ${
                            getCurrentPath() === ROUTES.BROWSE
                                ? 'text-white'
                                : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        Market
                    </Link>
                    {authenticated && (
                        <Link
                            to={ROUTES.PORTFOLIO}
                            className={`text-sm font-medium transition-colors ${
                                getCurrentPath() === ROUTES.PORTFOLIO
                                    ? 'text-white'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            Portfolio
                        </Link>
                    )}
                    <Link
                        to={ROUTES.LEADERBOARD}
                        className={`text-sm font-medium transition-colors ${
                            getCurrentPath() === ROUTES.LEADERBOARD
                                ? 'text-white'
                                : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        Leaderboard
                    </Link>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {authenticated && (
                        <>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-800 bg-slate-900/50">
                                <span className="text-sm font-medium text-slate-300">
                                    ${user.accountBalance?.toFixed(2) || '0.00'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-800 bg-slate-900/50">
                                <span className="text-sm font-medium text-white">
                                    {user.totalAccountValue || 0}
                                </span>
                                <span className="text-xs text-slate-400">
                                    pts
                                </span>
                            </div>
                        </>
                    )}
                    {authenticated ? (
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    ) : (
                        <>
                            <Link to={ROUTES.SIGN_IN}>
                                <Button
                                    variant="ghost"
                                    className="text-slate-300 hover:text-white hover:bg-white/5"
                                >
                                    Log In
                                </Button>
                            </Link>
                            <Link to={ROUTES.SIGN_UP}>
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white border-none font-semibold">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-300"
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-slate-950 border-slate-800 text-white">
                            <div className="flex flex-col gap-6 mt-4">
                                {/* Mobile Logo */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
                                    <img
                                        src="/mmm-logo-cropped.jpg"
                                        alt="March Madness Market Logo"
                                        className="h-10 w-10 rounded-lg object-contain"
                                        style={{
                                            imageRendering: 'crisp-edges',
                                            WebkitBackfaceVisibility: 'hidden',
                                            backfaceVisibility: 'hidden',
                                            transform: 'translateZ(0)',
                                        }}
                                        loading="eager"
                                        decoding="sync"
                                    />
                                    <span className="text-lg font-bold text-white">
                                        March Madness Market
                                    </span>
                                </div>

                                <SheetClose asChild>
                                    <Link
                                        to={ROUTES.BROWSE}
                                        className="text-lg font-medium hover:text-blue-400 transition-colors block"
                                    >
                                        Market
                                    </Link>
                                </SheetClose>
                                {authenticated && (
                                    <SheetClose asChild>
                                        <Link
                                            to={ROUTES.PORTFOLIO}
                                            className="text-lg font-medium hover:text-blue-400 transition-colors block"
                                        >
                                            Portfolio
                                        </Link>
                                    </SheetClose>
                                )}
                                <SheetClose asChild>
                                    <Link
                                        to={ROUTES.LEADERBOARD}
                                        className="text-lg font-medium hover:text-blue-400 transition-colors block"
                                    >
                                        Leaderboard
                                    </Link>
                                </SheetClose>
                                <div className="h-px bg-slate-800" />
                                {authenticated ? (
                                    <>
                                        <div className="text-sm text-slate-400">
                                            Balance: $
                                            {user.accountBalance?.toFixed(2) ||
                                                '0.00'}
                                        </div>
                                        <div className="text-sm text-slate-400">
                                            Points:{' '}
                                            {user.totalAccountValue || 0}
                                        </div>
                                        <SheetClose asChild>
                                            <Button
                                                variant="outline"
                                                onClick={handleLogout}
                                                className="w-full border-slate-700 flex items-center justify-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </Button>
                                        </SheetClose>
                                    </>
                                ) : (
                                    <>
                                        <SheetClose asChild>
                                            <Link
                                                to={ROUTES.SIGN_UP}
                                                className="block"
                                            >
                                                <Button className="w-full bg-blue-600">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                to={ROUTES.SIGN_IN}
                                                className="block"
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-slate-700"
                                                >
                                                    Log In
                                                </Button>
                                            </Link>
                                        </SheetClose>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

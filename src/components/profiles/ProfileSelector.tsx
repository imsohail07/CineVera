import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Baby, User, X } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { PROFILES } from '../../data/mockData';
import { Profile } from '../../types';

const PROFILE_ICONS: Record<string, React.ElementType> = {
  admin: Shield,
  family: Users,
  kids: Baby,
  guest: User,
};

const PROFILE_COLORS: Record<string, string> = {
  admin: '#FF9900',
  family: '#4F6B95',
  kids: '#2ECC71',
  guest: '#AAB2BF',
};

export function ProfileSelector() {
  const { showProfileSelector, setShowProfileSelector, setProfile, currentProfile } = useAppStore();

  const handleSelect = (p: Profile) => {
    setProfile(p);
  };

  return (
    <AnimatePresence>
      {showProfileSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(15,17,23,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowProfileSelector(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl p-8 w-full max-w-md"
            style={{ backgroundColor: '#1B2028', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Who's watching?
                </h2>
                <p className="text-sm text-[#AAB2BF] mt-0.5">Select your profile to continue</p>
              </div>
              <button onClick={() => setShowProfileSelector(false)}
                className="p-2 rounded hover:bg-white/5 transition-colors text-[#AAB2BF]">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {PROFILES.map((p) => {
                const Icon = PROFILE_ICONS[p.type];
                const color = PROFILE_COLORS[p.type];
                const isActive = currentProfile.id === p.id;

                return (
                  <motion.button
                    key={p.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(p)}
                    className="flex flex-col items-center gap-3 p-5 rounded-lg transition-all"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,153,0,0.08)' : '#222933',
                      border: isActive ? '1px solid rgba(255,153,0,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-white">{p.name}</div>
                      <div className="text-xs text-[#AAB2BF] capitalize mt-0.5">{p.maturityLevel} content</div>
                    </div>
                    {isActive && (
                      <div className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(255,153,0,0.2)', color: '#FF9900' }}>
                        ACTIVE
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <button className="w-full mt-4 py-2.5 rounded text-sm font-medium text-[#AAB2BF] hover:text-white transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              + Manage Profiles
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

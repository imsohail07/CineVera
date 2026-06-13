import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  User, Play, Palette, Shield, Bell, HardDrive, ChevronRight,
  Monitor, Volume2, Subtitles, Wifi, Lock, Users
} from 'lucide-react';
import clsx from 'clsx';

const SECTIONS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'profiles', label: 'Profiles', icon: Users },
  { id: 'playback', label: 'Playback', icon: Play },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'parental', label: 'Parental Controls', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'storage', label: 'Storage', icon: HardDrive },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-5 rounded-full transition-colors"
      style={{ backgroundColor: value ? '#FF9900' : 'rgba(255,255,255,0.1)' }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ duration: 0.15 }}
        className="absolute top-1 w-3 h-3 bg-white rounded-full"
      />
    </button>
  );
}

function SettingRow({
  icon: Icon, label, description, children
}: { icon: React.ElementType; label: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,153,0,0.1)' }}>
          <Icon size={15} style={{ color: '#FF9900' }} />
        </div>
        <div>
          <div className="text-sm font-medium text-white">{label}</div>
          {description && <div className="text-xs text-[#AAB2BF] mt-0.5">{description}</div>}
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [autoplay, setAutoplay] = useState(true);
  const [autoNext, setAutoNext] = useState(true);
  const [skipIntro, setSkipIntro] = useState(true);
  const [hdr, setHdr] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [newContent, setNewContent] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'playback':
        return (
          <div>
            <h3 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Playback Settings</h3>
            <SettingRow icon={Play} label="Autoplay Next Episode" description="Automatically start next episode after 5 seconds">
              <Toggle value={autoNext} onChange={setAutoNext} />
            </SettingRow>
            <SettingRow icon={Play} label="Skip Intro Automatically" description="Jump past intro sequences">
              <Toggle value={skipIntro} onChange={setSkipIntro} />
            </SettingRow>
            <SettingRow icon={Monitor} label="Default Quality" description="Streaming quality when not on mobile data">
              <select className="text-sm text-[#AAB2BF] rounded px-2 py-1 outline-none"
                style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>4K Ultra HD</option>
                <option>1080p HD</option>
                <option>720p</option>
                <option>Auto</option>
              </select>
            </SettingRow>
            <SettingRow icon={Wifi} label="HDR Streaming" description="High Dynamic Range when available">
              <Toggle value={hdr} onChange={setHdr} />
            </SettingRow>
            <SettingRow icon={Volume2} label="Default Audio Language" description="Preferred audio track">
              <select className="text-sm text-[#AAB2BF] rounded px-2 py-1 outline-none"
                style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Japanese</option>
              </select>
            </SettingRow>
            <SettingRow icon={Subtitles} label="Default Subtitle Language" description="Show subtitles automatically">
              <select className="text-sm text-[#AAB2BF] rounded px-2 py-1 outline-none"
                style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>Off</option>
                <option>English</option>
                <option>Spanish</option>
              </select>
            </SettingRow>
          </div>
        );
      case 'appearance':
        return (
          <div>
            <h3 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Appearance</h3>
            <SettingRow icon={Palette} label="Dark Mode" description="Always use dark theme (recommended)">
              <Toggle value={darkMode} onChange={setDarkMode} />
            </SettingRow>
            <SettingRow icon={Monitor} label="Reduce Motion" description="Minimize animations and transitions">
              <Toggle value={reducedMotion} onChange={setReducedMotion} />
            </SettingRow>
            <SettingRow icon={Palette} label="Interface Language">
              <select className="text-sm text-[#AAB2BF] rounded px-2 py-1 outline-none"
                style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </SettingRow>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h3 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Notifications</h3>
            <SettingRow icon={Bell} label="Push Notifications" description="Receive notifications on this device">
              <Toggle value={notifications} onChange={setNotifications} />
            </SettingRow>
            <SettingRow icon={Bell} label="New Content Alerts" description="When new episodes or movies are added">
              <Toggle value={newContent} onChange={setNewContent} />
            </SettingRow>
            <SettingRow icon={Bell} label="Watchlist Updates" description="Reminders for items in your watchlist">
              <Toggle value={autoplay} onChange={setAutoplay} />
            </SettingRow>
          </div>
        );
      case 'parental':
        return (
          <div>
            <h3 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Parental Controls</h3>
            <div className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: 'rgba(255,153,0,0.06)', border: '1px solid rgba(255,153,0,0.15)' }}>
              <div className="flex items-center gap-2 text-sm text-[#FF9900] font-medium mb-1">
                <Lock size={14} /> PIN Protected
              </div>
              <div className="text-xs text-[#AAB2BF]">Parental controls are secured with a 4-digit PIN.</div>
            </div>
            <SettingRow icon={Shield} label="Content Maturity Level" description="Maximum content rating allowed">
              <select className="text-sm text-[#AAB2BF] rounded px-2 py-1 outline-none"
                style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>All Ages (G)</option>
                <option>Teen (PG-13)</option>
                <option>Mature (R)</option>
                <option>All (No Restriction)</option>
              </select>
            </SettingRow>
            <SettingRow icon={Lock} label="Purchase PIN" description="Require PIN for any purchases">
              <Toggle value={true} onChange={() => {}} />
            </SettingRow>
          </div>
        );
      case 'storage':
        return (
          <div>
            <h3 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Storage</h3>
            <div className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#AAB2BF]">Downloads used</span>
                <span className="text-white font-medium">4.2 GB / 15 GB</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full progress-gradient" style={{ width: '28%' }} />
              </div>
            </div>
            <SettingRow icon={HardDrive} label="Download Quality" description="Quality for offline downloads">
              <select className="text-sm text-[#AAB2BF] rounded px-2 py-1 outline-none"
                style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.08)' }}>
                <option>High (1080p)</option>
                <option>Medium (720p)</option>
                <option>Low (480p)</option>
              </select>
            </SettingRow>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Account Settings</h3>
            <div className="rounded-lg p-4 mb-4 flex items-center gap-4"
              style={{ backgroundColor: '#222933', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-black"
                style={{ backgroundColor: '#FF9900' }}>A</div>
              <div>
                <div className="text-white font-semibold">Admin Account</div>
                <div className="text-sm text-[#AAB2BF]">admin@cinevera.com</div>
                <div className="text-xs text-[#FF9900] mt-0.5 font-medium">Cinevera Premium</div>
              </div>
            </div>
            {[
              { label: 'Edit Profile', icon: User },
              { label: 'Change Password', icon: Lock },
              { label: 'Subscription Plan', icon: Shield },
              { label: 'Payment Methods', icon: HardDrive },
            ].map(({ label, icon: Icon }) => (
              <button key={label} className="w-full flex items-center justify-between py-3.5 text-sm hover:text-white transition-colors text-[#AAB2BF]"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-3">
                  <Icon size={15} />
                  {label}
                </div>
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Settings</h1>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-52 flex-shrink-0">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#1B2028', border: '1px solid rgba(255,255,255,0.06)' }}>
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-all relative',
                  activeSection === id ? 'text-white' : 'text-[#AAB2BF] hover:text-white hover:bg-white/5'
                )}
                style={activeSection === id ? { backgroundColor: 'rgba(255,153,0,0.08)' } : {}}
              >
                {activeSection === id && (
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full" style={{ backgroundColor: '#FF9900' }} />
                )}
                <Icon size={15} style={{ color: activeSection === id ? '#FF9900' : 'inherit' }} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 rounded-lg p-5"
          style={{ backgroundColor: '#1B2028', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </motion.div>
  );
}

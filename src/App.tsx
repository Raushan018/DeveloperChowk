import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Bug,
  BugOff,
  Code2,
  ExternalLink,
  MessageSquareText,
  ListMusic,
  MessageCircle,
  Music2,
  Pause,
  Play,
  Plus,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react'

const COMMUNITY_URL = '#'
const BACKGROUND_IMAGE = '/assets/ChatGPT%20Image%20Sep%2026,%202026,%2001_35_03%20AM.png'
const BACKGROUND_VIDEO = '/assets/Young_people_working_on_laptops_20260926114459.mp4'
const YOUTUBE_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLQAK-wBEC-Ys'
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/videoseries?list=PLQAK-wBEC-Ys'

const YOUTUBE_TRACKS = [
  ['-bPxKlIVrNM', 'Falsafa | Dflacko | Hustle 5 Apna Homeground'],
  ['LlclNbIkRsI', 'Haveli | XEEMO | Hustle 5 Apna Homeground'],
  ['Uh_OzAbEk-c', 'Chhota Ladka | Parv | Hustle 5 Apna Homeground'],
  ['izSy4fm-oQM', 'LET GO | Harmeeet | Hustle 5 Apna Homeground'],
  ['mXCxRw-DcX4', 'Maa Main Darta Hu | Ansh4sure | Hustle 5 Apna Homeground'],
  ['Hxt0164bJcQ', 'Izhaar | whysoKai | Hustle 5 Apna Homeground'],
  ['doq3q8symSI', 'Zaalim | OG Tehran | Hustle 5 Apna Homeground'],
  ['Lf92_Vctk6Q', 'Piya Bairi Lage | Siroyi | Hustle 5 Apna Homeground'],
  ['HZMNUREowcg', 'Aushadhi | OG Tehran | Hustle 5 Apna Homeground'],
  ['GpQqgKYyiZk', 'Payback | whysoKai | Hustle 5 Apna Homeground'],
  ['Y3_eC0MkkJY', 'Fan Ho Gayi | DHADKAN | Hustle 5 Apna Homeground'],
  ['E9EnA-wyVoA', 'Kora Panna | Farak | Hustle 5 Apna Homeground'],
  ['aiSRueWjFkM', 'Kaali Gaddi | Akshat Jakhar | Hustle 5 Apna Homeground'],
  ['u6xIEkgzHnw', 'Thar Coast | Akshat Jakhar | Hustle 5 Apna Homeground'],
  ['3M94BpQFA6k', 'Roti | Harmeeet | Hustle 5 Apna Homeground'],
  ['r33PrE5WVd4', 'Baba Bam Bam | Raaj Babu | Hustle 5 Apna Homeground'],
  ['o9ep7IpV6fQ', 'Kalakaar banna hai | Anushka Baduwal | Hustle 5 Apna Homeground'],
  ['fWl0tC3RzZ0', 'Doctor-Doctor | Ansh4sure | Hustle 5 Apna Homeground'],
  ['llk9VrljLlY', 'Parv Man | Parv | Hustle 5 Apna Homeground'],
  ['8D3Eu4B9J-I', 'Jhoot | Harmeeet | Hustle 5 Apna Homeground'],
  ['4JOYnS64VBo', 'Catchy | Anushka Baduwal | Hustle 5 Apna Homeground'],
  ['2zH1XCYGkdo', 'Lickety Rap | Gargi | Hustle 5 Apna Homeground'],
  ['M3GuRr5HOG0', 'Bhaukaal Tight | R-Mridul | Hustle 5 Apna Homeground'],
  ['PQQ9oskTGrY', 'Likhta Hoon | Farak | Hustle 5 Apna Homeground'],
  ['YcJKAbjSPa8', 'Deewana | Dflacko | Hustle 5 Apna Homeground'],
  ['g4cHrpau2Js', 'Kaaga | Farak | Hustle 5 Apna Homeground'],
  ['64GtUmWZ9-g', 'Atithi Devo Bhava | Bhaktaaa | Hustle 5 Apna Homeground'],
  ['RfMi5qoigVc', 'Mona Lisa | SickLot | Hustle 5 Apna Homeground'],
  ['p8Etb7LQsJE', 'Terrible time to meet me | whysoKai | Hustle 5 Apna Homeground'],
  ['1GIM0RoCq5c', 'MAATI | MC Square, Bhaktaaa, Akshat Jakhar, Ansh4sure, Farak | Hustle 5 Apna Homeground'],
  ['ybf2ZExQxqM', 'She wanna play | OG Tehran | MTV Hustle 5 Apna Homeground'],
  ['ymj1VXJuZLc', 'Apna Apna Aasmaan | harmeeet | Hustle 5 Apna Homeground'],
  ['FNbOwDboawc', 'La La La | SickLot | Hustle 5 Apna Homeground'],
] as const

type YouTubeTrack = readonly [string, string]

const BUG_STUCK_TRACKS = [
  ['5MIGQBpVeqs', 'Mujhse Mohabbat Ka'], ['fXzm9F4S3d0', 'Tumsa Koi Pyaara'], ['IIsLwlU7EcE', 'Pehli Pehli Baar Mohabbat Ki Hai (From Sirf Tum)'], ['DvJFq1FUb4Q', 'Saaton Janam Main Tere'], ['q6ZAv1Bp9S0', 'Tumhein Dekhen Meri Aankhen'], ['LMpSZWT1O78', 'Tumhein Apna Banane Ki Kasam Khai Hai'], ['-Tl_FVOx-cs', 'Raah Mein Unse Mulaqat'], ['z89sVzrF0nQ', 'Tu Jo Hans Hans Ke (From Raja Bhaiya)'], ['5SGxpmPt9j0', 'Kahin Mujhe Pyar Hua Toh Nahin'], ['JQ0XR8jpCb4', 'Dil Kehta Hai (From Akele Hum Akele Tum)'], ['cVT3BKkPCc4', 'Is Tarah Aashiqui Ka - Kumar Sanu'], ['NvVN5JyMrnI', 'Kitna Haseen Chehra (From Dilwale)'], ['5SGxpmPt9j0', 'Kahin Mujhe Pyar Hua Toh Nahin'], ['KjH9trvWcKw', 'Pucho Zara Pucho'], ['q0bKtiVDJxQ', 'Woh Ladki Bahut Yaad Aati'], ['rSm4PnsUryE', 'Laal Dupatta'], ['cp-aVe09H1k', 'Sona Kitna Sona Hai'], ['9x9tR2DKLIk', 'HUMKO DEEWANA KAR GAYE'], ['EpexZeHmAlU', 'Aisi Deewangi (From Deewana)'], ['_4w_aM6CMBI', 'Aate Jate Khoobsurat Awara'], ['9Eg4d56rt-U', 'Neele Neele Ambar Par (Male Version)'], ['cQuSaM_qPsQ', 'Is Pyar Se Meri Taraf Na Dekho (Duet)'], ['8Pn5fsrz0v0', 'Hum Laakh Chupaye'], ['7Ny77gTsWGk', 'Hum Yaar Hai Tumhare'], ['_dLXszk6jic', 'Tumse Milne Ko Dil'], ['EN_ydFzNoPk', 'Ab Tere Dil Mein To'], ['Onel2nozSJ4', 'Dil Ka Aalam (From Aashiqui)'], ['ooGFsfsSiYo', 'Nahin Yeh Ho Nahin Sakta'], ['ER7RoDTT2_4', 'Barsaat Ke Mausam Mein'], ['esbQ9uY-U1Q', 'Meri Mehbooba'], ['NWCG3MUDc0A', 'Aye Mere Humsafar'], ['YSRQfSmi9pI', 'Aapke Pyaar Mein Hum'], ['4eKrYIJezNs', 'Tere Dar Par Sanam (Male)'], ['GCcyZi0dHXY', 'Tumse Milne Ki Tamanna Hai'], ['AIPeyDOQLBg', 'Taaron Ka Chamakta'], ['XFQCeehE7ns', 'DING DONG'], ['xmuLsxFqD2U', 'Dheere - Dheere - Dheere'], ['m8SbXVuGLFY', 'Love Tujhe Love Main Karta'], ['E9Y45BncXLA', 'Chand Se Parda Kijiye'], ['4eKrYIJezNs', 'Tere Dar Par Sanam (Male)'], ['DIWJFRO1s9k', 'Dilbar Mere (From Satte Pe Satta)'], ['O5qahfzGtc8', 'Jeeta Tha Jiske Liye'], ['3_cGT6rXp6w', 'O Dil Tod Ke Hansti Ho Mera'], ['hADBbsFPWBM', 'Sab Kuch Bhula Diya'], ['CrnRqE8hOIc', 'O Mere Dil Ke Chain'], ['eAxK5tyahUM', 'Main Agar Saamne'], ['YhEdDnxHZt4', 'Jo Bhi Kasmein'], ['jBHmpCuLJOQ', 'Pyaar Se Pyar Hum'], ['gfcdq9cyxpI', 'KYON KI ITNA PYAR'], ['mUmRgBzzpyg', 'Humko Sirf Tumse'], ['1WI_ybqZ9cc', 'Mujhe Haq Hai'], ['MgkfGGNbkAU', 'KYO KISI KO'], ['XOj4ldIWbK8', 'Tum Dil Ki Dhadkan Mein'], ['8-aagqHnx7M', 'HUM TUMKO NIGAHON MEIN'], ['LMrgv7bRLQM', 'PEHLI PEHLI BAAR MOHABBAT KI HAI'], ['pX0O-t82zTg', 'Chhupana Bhi Nahin Aata'], ['l-12ZVfUQps', 'Zindagi Ban Gaye Ho Tum'], ['A1wZUXY--4U', 'Dil Laga Liya Maine'], ['qzj5e6CywRY', 'Milne Ki Tum Koshish Karna'], ['bkWpCme6JCo', 'Dil Ne Yeh Kaha Hain Dil Se'], ['58VwkROgWGI', 'Mera Dil Bhi Kitna Pagal Hai'], ['_Aj1CVyMWn0', 'Jeeye to Jeeye Kaise'], ['bT0ifxNDdJM', 'Main Duniya Bhula Doonga'], ['u4m-EPPXqM0', 'Ajnabi Mujhko Itna Bata'], ['t7QIMar8i9o', 'Sochenge Tumhe Pyar (From Deewana)'], ['ar_m3IbjS4c', 'TUMSE MILNA'], ['eY34Z5OHUFI', 'Ek Sanam Chahiye Aashiqui Ke Liye (From Aashiqui)'], ['wFYj1XpqlmE', 'Jeeye to Jeeye Kaise'], ['v5VtxXxuoZk', 'Dil Hai Ke Manta Nahin'], ['NI0Mg2J25jQ', 'Tum Dil Ki Dhadkan Mein (From Dhadkan)'], ['0vWhZssFtVs', 'Kitaben Bahut Si'], ['vmzbVgLShEw', 'Ladki Badi Anjani Hai'], ['vD7O3mSbXxQ', 'Tu Meri Zindagi Hai (From Aashiqui)'], ['5P3PGmRxPG0', 'Dil Kehta Hai'], ['xKb6lP3JxrA', 'Pardesi Pardesi'], ['VoTnpKGUW8k', 'Aaye Ho Meri Zindagi Mein (Female)'],
] as const

const DEPLOYED_TRACKS = [
  ['CJfynWLD11c', 'Umair & Talha Anjum - No Other Place'], ['ljllVH71Cgo', 'Raabta | JOKHAY | Talha Anjum | Hashim Nawaz'], ['ijE2MMtzkHg', 'AFSANAY - Young Stunners | Talhah Yunus | Talha Anjum'], ['ZLidcuC8iww', 'Balli Aur Mein - Talha Anjum'], ['pfGppy_cX_4', 'Falsafay | Talha Anjum | Rap Demon'], ['wooId-cxJ2E', 'Zindagi Se Maut Tak - Talha Anjum'], ['tyraktWMaiE', 'SABAR - Jokhay | Shareh | JJ47 | Talha Anjum'], ['naGFRwzbKo0', 'Pain Killers - Talha Anjum'], ['6TYqiw_yWg0', 'Nevermind - Umair, Talha Anjum & CALM'], ['UcU-yRIZ5DE', '4AM in Karachi - Talha Anjum'], ['EOa8UmVhw0c', 'Kyun - Talha Anjum feat. Annural Khalid'], ['pwxvbzCU_oU', 'WHY - Young Stunners | Talha Anjum'], ['jIQ0Dx-4peE', 'GUMAAN - Young Stunners'], ['mQKiG_itA_A', 'Mein Aur Mere Idols - Talha Anjum'], ['Ai47BcMrsXw', '100 Bars - Talha Anjum'], ['cFqhO3ZFoKo', 'WOH BANDA NAI - Young Stunners'], ['HhqPMyFznxw', '9MM - Talha Anjum'], ['nhshYevehZg', 'PURPOSE RAP - Young Stunners'], ['42Ekv1x_Qdo', 'Agency - Talha Anjum | Rap Demon'], ['WRLYqPV9zE4', 'surface - Abdullah Siddiqui & Talha Anjum'], ['KzO0iKufUc0', 'QUARANTINE - Young Stunners'], ['DTjibK1z0Vo', 'LAGA REH - Young Stunners'], ['PWAt_6OaWXg', '12 BAJAY - Talha Anjum'], ['aELywUrWMSY', 'Talha Anjum - Open Letter'], ['iWomYr2dlsM', 'Downers At Dusk - Talha Anjum'], ['PzU2ru1kcJw', 'Talha Anjum - Secrets'], ['avF5SdWVIRc', 'Glass Half Full feat. JJ47 & Talhah Yunus'], ['34PUt9M7dc8', 'Lost In Time - Talha Anjum'], ['n_NC-ZmQC50', 'Desperation - Talha Anjum'], ['wedNGWk-l0A', 'Happy Hour - Talha Anjum'], ['URJY1HMNSeg', 'Touch Base feat. Talhah Yunus & KR$NA'],
] as const

export type Track = {
  title: string
  artist: string
  cover: string
  audio: string
  fallbackDuration: string
}

export const playlist: Track[] = [
  {
    title: 'Full Video : Pehle Kabhi Na Mera Haal | Baghban | ...',
    artist: 'Credits: T-Series',
    cover: BACKGROUND_IMAGE,
    audio: '/audio/song1.mp3',
    fallbackDuration: '4:33',
  },
]

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

function durationFromLabel(label: string) {
  const [minutes, seconds] = label.split(':').map(Number)
  return minutes * 60 + seconds
}

function randomTrackId(tracks: readonly YouTubeTrack[], currentId?: string) {
  if (tracks.length < 2) return tracks[0][0]
  const available = tracks.filter(([id]) => id !== currentId)
  return available[Math.floor(Math.random() * available.length)][0]
}

function Header() {
  return (
    <header className="site-header">
      <nav className="nav-pills" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="explore-indicator">EXPLORE <ChevronDown size={12} strokeWidth={1.7} /></div>
    </header>
  )
}

const SITUATIONS = [
  { label: 'Bug Stuck', mood: 'Sad', icon: Bug, tone: 'stuck' },
  { label: 'Code Cooking', mood: 'Working', icon: Code2, tone: 'cooking' },
  { label: 'Deployed', mood: 'Happy', icon: BugOff, tone: 'deployed' },
] as const

type PlaylistMode = 'cooking' | 'stuck' | 'deployed'

function SituationMenu({ onPlaylistSituation, onOpen, closeSignal }: { onPlaylistSituation: (mode: PlaylistMode) => void; onOpen: () => void; closeSignal: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(1)
  const situation = SITUATIONS[selected]

  useEffect(() => {
    setIsOpen(false)
  }, [closeSignal])

  return (
    <div className="situation-menu">
      <button className={`situation-button ${situation.tone}`} onClick={() => { onOpen(); setIsOpen((open) => !open) }} aria-expanded={isOpen} aria-haspopup="menu">
        <span className="situation-label">Situation</span>
        <situation.icon className="situation-emoji" size={21} strokeWidth={2.2} />
        <ChevronDown size={13} className={isOpen ? 'rotated' : ''} />
      </button>
      {isOpen && <div className="situation-dropdown" role="menu">{SITUATIONS.map((item, index) => <button key={item.label} className={index === selected ? 'selected' : ''} onClick={() => { setSelected(index); setIsOpen(false); onPlaylistSituation(item.tone as PlaylistMode) }} role="menuitem"><item.icon className="situation-option-emoji" size={22} strokeWidth={2} /><span><strong>{item.label}</strong><small>{item.mood}</small></span></button>)}</div>}
    </div>
  )
}

type FeedbackEntry = { id: string; name: string; message: string; createdAt: number }
const FEEDBACK_STORAGE_KEY = 'raushan-feedback'
const FEEDBACK_MAX_AGE = 30 * 24 * 60 * 60 * 1000

function FeedbackMenu({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const feedbackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let stored: FeedbackEntry[] = []
    try {
      const parsed = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]')
      if (Array.isArray(parsed)) stored = parsed as FeedbackEntry[]
    } catch {
      localStorage.removeItem(FEEDBACK_STORAGE_KEY)
    }
    const fresh = stored.filter((entry) => Date.now() - entry.createdAt < FEEDBACK_MAX_AGE)
    setFeedback(fresh)
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(fresh))
  }, [])

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!feedbackRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const submitFeedback = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    if (!trimmedName || !trimmedMessage) return
    const entry = { id: crypto.randomUUID(), name: trimmedName, message: trimmedMessage, createdAt: Date.now() }
    const updated = [entry, ...feedback]
    setFeedback(updated)
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updated))
    setName('')
    setMessage('')
  }

  return (
    <div className="feedback-menu" ref={feedbackRef}>
      <button type="button" className="feedback-button" onClick={() => { onOpen(); setIsOpen((open) => !open) }} aria-expanded={isOpen}><MessageSquareText size={16} /> Feedback</button>
      {isOpen && <div className="feedback-panel">
        <form onSubmit={submitFeedback}>
          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" aria-label="Your name" />
          <textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write feedback..." aria-label="Feedback message" rows={3} />
          <button type="submit">Post feedback</button>
        </form>
        <div className="feedback-list">{feedback.length === 0 ? <p className="feedback-empty">No feedback yet</p> : feedback.map((entry) => <article key={entry.id}><strong>{entry.name}</strong><p>{entry.message}</p></article>)}</div>
      </div>}
    </div>
  )
}

function MoodToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <motion.button
      className={`mood-toggle ${enabled ? 'is-on' : ''}`}
      onClick={onToggle}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={enabled}
      aria-label="Toggle rain mood"
    >
      <CloudRain size={16} strokeWidth={1.7} />
      <span className={`mood-state ${enabled ? 'is-on' : ''}`} aria-label={enabled ? 'Rain mood on' : 'Rain mood off'} />
    </motion.button>
  )
}

function CommunityCard() {
  return (
    <motion.section className="community-card" whileHover={{ y: -4 }} id="about">
      <div className="community-mark" aria-hidden="true">
        <span><MessageCircle size={18} fill="currentColor" /></span>
        <span><MessageCircle size={14} fill="currentColor" /></span>
      </div>
      <div className="community-copy">
        <p className="eyebrow">NOSTALGIA CLUB / 24.7</p>
        <h2>WhatsApp par naye retro picks</h2>
        <p>Har hafte purane geeton ki nayi mehfil — saath judein.</p>
      </div>
      <a className="join-button" href={COMMUNITY_URL} onClick={(event) => COMMUNITY_URL === '#' && event.preventDefault()}>Join Channel <ChevronRight size={15} /></a>
    </motion.section>
  )
}

function ProgressBar({ current, duration, onSeek, onSeekStart, onSeekEnd }: { current: number; duration: number; onSeek: (event: ChangeEvent<HTMLInputElement>) => void; onSeekStart?: () => void; onSeekEnd?: () => void }) {
  const progress = duration > 0 ? (current / duration) * 100 : 0
  return (
    <div className="progress-wrap">
      <input aria-label="Seek through track" type="range" min="0" max={duration || 0} step="0.1" value={current} onPointerDown={onSeekStart} onPointerUp={onSeekEnd} onChange={onSeek} style={{ '--progress': `${progress}%` } as CSSProperties} />
      <div className="time-row"><span>{formatTime(current)}</span><span>{formatTime(duration)}</span></div>
    </div>
  )
}

function PlayerControls({ isPlaying, onPrevious, onToggle, onNext }: { isPlaying: boolean; onPrevious: () => void; onToggle: () => void; onNext: () => void }) {
  return (
    <div className="player-controls">
      <button className="control-button" onClick={onPrevious} aria-label="Previous track"><ChevronLeft /></button>
      <motion.button className="play-button" onClick={onToggle} whileTap={{ scale: 0.91 }} aria-label={isPlaying ? 'Pause track' : 'Play track'}>
        {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
      </motion.button>
      <button className="control-button" onClick={onNext} aria-label="Next track"><ChevronRight /></button>
    </div>
  )
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const youtubeFrameRef = useRef<HTMLIFrameElement>(null)
  const youtubeReadyRef = useRef(false)
  const youtubeCommandQueue = useRef<Array<{ func: string; args: unknown[] }>>([])
  const isSeekingRef = useRef(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tracks, setTracks] = useState<Track[]>(playlist)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.78)
  const [hasError, setHasError] = useState(false)
  const [showYouTubePlaylist, setShowYouTubePlaylist] = useState(true)
  const [selectedYouTubeId, setSelectedYouTubeId] = useState<string>(YOUTUBE_TRACKS[0][0])
  const [youtubeReady, setYoutubeReady] = useState(false)
  const [youtubeNowPlayingTitle, setYoutubeNowPlayingTitle] = useState('')
  const [playlistMode, setPlaylistMode] = useState<PlaylistMode>('cooking')
  const activeYouTubeTracks: readonly YouTubeTrack[] = playlistMode === 'stuck' ? BUG_STUCK_TRACKS : playlistMode === 'deployed' ? DEPLOYED_TRACKS : YOUTUBE_TRACKS
  const track = tracks[trackIndex]
  const selectedYouTubeTrack = activeYouTubeTracks.find(([id]) => id === selectedYouTubeId)
  const activeTitle = showYouTubePlaylist ? selectedYouTubeTrack?.[1] || youtubeNowPlayingTitle || 'Loading song...' : track.title
  const activeArtist = showYouTubePlaylist ? 'Raushan.exe' : track.artist
  const activeCover = showYouTubePlaylist && selectedYouTubeTrack ? `https://i.ytimg.com/vi/${selectedYouTubeTrack[0]}/hqdefault.jpg` : track.cover
  const playerDuration = showYouTubePlaylist ? duration : duration || durationFromLabel(track.fallbackDuration)

  useEffect(() => {
    const startCookingPlaylist = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string; mode?: PlaylistMode } | undefined>).detail
      youtubeReadyRef.current = false
      setYoutubeReady(false)
      setPlaylistMode(detail?.mode || 'cooking')
      const nextTracks = detail?.mode === 'stuck' ? BUG_STUCK_TRACKS : detail?.mode === 'deployed' ? DEPLOYED_TRACKS : YOUTUBE_TRACKS
      setSelectedYouTubeId(detail?.id || randomTrackId(nextTracks, selectedYouTubeId))
      setIsPlaying(true)
    }
    window.addEventListener('start-cooking-playlist', startCookingPlaylist)
    return () => window.removeEventListener('start-cooking-playlist', startCookingPlaylist)
  }, [])

  useEffect(() => {
    youtubeReadyRef.current = false
    youtubeCommandQueue.current = []
    setYoutubeReady(false)
    setCurrent(0)
    setDuration(0)
    setYoutubeNowPlayingTitle('')
  }, [selectedYouTubeId])

  const sendYouTubeCommand = (func: string, args: unknown[] = []) => {
    if (!youtubeReadyRef.current || !youtubeFrameRef.current?.contentWindow) {
      youtubeCommandQueue.current.push({ func, args })
      return
    }
    youtubeFrameRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*')
  }

  const handleYouTubeLoad = () => {
    youtubeReadyRef.current = true
    setYoutubeReady(true)
    const frame = youtubeFrameRef.current?.contentWindow
    if (frame) {
      frame.postMessage(JSON.stringify({ event: 'listening', id: 'deluxe-salon-player', channel: 'widget' }), '*')
      frame.postMessage(JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onStateChange'] }), '*')
      frame.postMessage(JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onPlaybackQualityChange'] }), '*')
    }
    youtubeCommandQueue.current.forEach(({ func, args }) => sendYouTubeCommand(func, args))
    youtubeCommandQueue.current = []
    if (isPlaying) sendYouTubeCommand('playVideo')
  }

  useEffect(() => {
    if (showYouTubePlaylist) return
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    setCurrent(0)
    setDuration(0)
    setHasError(false)
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [trackIndex, showYouTubePlaylist])

  useEffect(() => {
    const audio = audioRef.current
    if (showYouTubePlaylist) {
      sendYouTubeCommand('setVolume', [volume * 100])
    } else if (audio) {
      audio.volume = volume
    }
  }, [volume, showYouTubePlaylist])

  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube-nocookie.com' && event.origin !== 'https://www.youtube.com') return
      let data: { event?: string; info?: { currentTime?: number; duration?: number; playerState?: number; videoData?: { video_id?: string; title?: string } } | number }
      try {
        data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
      } catch {
        return
      }
      if (data.event !== 'infoDelivery' || typeof data.info !== 'object' || data.info === null) return
      if (data.info.videoData?.video_id) {
        const playingId = data.info.videoData.video_id
        if (activeYouTubeTracks.some(([id]) => id === playingId) && playingId !== selectedYouTubeId) setSelectedYouTubeId(playingId)
        if (data.info.videoData.title) setYoutubeNowPlayingTitle(data.info.videoData.title)
      }
      if (typeof data.info.currentTime === 'number') setCurrent(data.info.currentTime)
      if (typeof data.info.duration === 'number') setDuration(data.info.duration)
      if (typeof data.info.playerState === 'number') {
        setIsPlaying(data.info.playerState === 1)
      }
    }
    window.addEventListener('message', handleYouTubeMessage)
    return () => window.removeEventListener('message', handleYouTubeMessage)
  }, [selectedYouTubeId, activeYouTubeTracks])

  useEffect(() => {
    if (!showYouTubePlaylist || !youtubeReady) return
    const poll = window.setInterval(() => {
      if (isSeekingRef.current) return
      sendYouTubeCommand('getCurrentTime')
      sendYouTubeCommand('getDuration')
      sendYouTubeCommand('getPlayerState')
    }, 500)
    return () => window.clearInterval(poll)
  }, [showYouTubePlaylist, selectedYouTubeId, youtubeReady])

  useEffect(() => {
    const resumePlayback = () => {
      if (document.visibilityState !== 'visible' || !isPlaying) return
      if (showYouTubePlaylist) {
        sendYouTubeCommand('playVideo')
      } else {
        void audioRef.current?.play().catch(() => undefined)
      }
    }
    document.addEventListener('visibilitychange', resumePlayback)
    return () => document.removeEventListener('visibilitychange', resumePlayback)
  }, [isPlaying, showYouTubePlaylist])

  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({ title: activeTitle, artist: activeArtist, artwork: [{ src: activeCover }] })
    navigator.mediaSession.setActionHandler('play', () => { sendYouTubeCommand('playVideo'); void audioRef.current?.play().catch(() => undefined); setIsPlaying(true) })
    navigator.mediaSession.setActionHandler('pause', () => { sendYouTubeCommand('pauseVideo'); audioRef.current?.pause(); setIsPlaying(false) })
    navigator.mediaSession.setActionHandler('nexttrack', () => changeTrack(1))
    navigator.mediaSession.setActionHandler('previoustrack', () => changeTrack(-1))
  }, [activeTitle, activeArtist, activeCover])

  const togglePlay = () => {
    if (showYouTubePlaylist) {
      sendYouTubeCommand(isPlaying ? 'pauseVideo' : 'playVideo')
      setIsPlaying((playing) => !playing)
      return
    }
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true))
    }
  }

  const changeTrack = (offset: number) => {
    if (showYouTubePlaylist) {
      const nextId = randomTrackId(activeYouTubeTracks, selectedYouTubeId)
      youtubeReadyRef.current = false
      setYoutubeReady(false)
      setSelectedYouTubeId(nextId)
      setIsPlaying(true)
      return
    }
    setTrackIndex((index) => (index + offset + tracks.length) % tracks.length)
  }

  const addSong = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const newTrack: Track = {
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'My playlist',
      cover: BACKGROUND_IMAGE,
      audio: URL.createObjectURL(file),
      fallbackDuration: '0:00',
    }
    setTracks((currentTracks) => [...currentTracks, newTrack])
    setTrackIndex(tracks.length)
    setIsPlaying(false)
    event.target.value = ''
  }

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value)
    if (showYouTubePlaylist) {
      sendYouTubeCommand('seekTo', [nextTime, true])
    } else if (audioRef.current) {
      audioRef.current.currentTime = nextTime
    }
    setCurrent(nextTime)
  }

  const handleSeekEnd = () => {
    isSeekingRef.current = false
    sendYouTubeCommand('seekTo', [current, true])
  }

  return (
    <motion.section className="music-player-wrap" id="faq" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7 }}>
      <div className="playlist-panel">
        <div className="playlist-header">
          <span><ListMusic size={14} /> My Playlist</span>
          <label className="add-song-button">
            <Plus size={14} /> Add song
            <input ref={fileInputRef} type="file" accept="audio/*" onChange={addSong} />
          </label>
          <button className="youtube-button" onClick={() => setShowYouTubePlaylist((visible) => !visible)}><ExternalLink size={13} /> YouTube playlist</button>
        </div>
        {tracks.length > 1 && <div className="playlist-list">{tracks.map((item, index) => <button key={`${item.audio}-${index}`} className={index === trackIndex ? 'active' : ''} onClick={() => { setTrackIndex(index); setIsPlaying(false) }}>{index + 1}. {item.title}</button>)}</div>}
        {showYouTubePlaylist && <div className="youtube-frame"><iframe key={`${playlistMode}-${selectedYouTubeId}`} ref={youtubeFrameRef} onLoad={handleYouTubeLoad} referrerPolicy="strict-origin-when-cross-origin" title="YouTube playlist player" src={`https://www.youtube-nocookie.com/embed/${selectedYouTubeId}?list=${playlistMode === 'stuck' ? 'PL0umg_TNpoZTTdZVIi5tfX69pRmoMFGna' : playlistMode === 'deployed' ? 'PLlhSyXK6xj7oxpgyPZcV4gFzw50oVclAr' : 'PLQAK-wBEC-Ys'}&controls=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&modestbranding=1&playsinline=1`} allow="autoplay; encrypted-media; picture-in-picture" /><div className="youtube-track-list">{activeYouTubeTracks.map(([id, title], index) => <button key={`${id}-${index}`} className={id === selectedYouTubeId ? 'active' : ''} onClick={() => { youtubeReadyRef.current = false; setYoutubeReady(false); setSelectedYouTubeId(id); setShowYouTubePlaylist(true); setIsPlaying(false) }}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</div><a href={playlistMode === 'stuck' ? 'https://youtube.com/playlist?list=PL0umg_TNpoZTTdZVIi5tfX69pRmoMFGna' : playlistMode === 'deployed' ? 'https://youtube.com/playlist?list=PLlhSyXK6xj7oxpgyPZcV4gFzw50oVclAr' : YOUTUBE_PLAYLIST_URL} target="_blank" rel="noreferrer">Open full playlist <ExternalLink size={11} /></a></div>}
      </div>
      <div className="music-player">
      <audio ref={audioRef} src={track.audio} preload="auto" autoPlay={!showYouTubePlaylist} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrent((previous) => Math.abs(previous - event.currentTarget.currentTime) >= 0.25 ? event.currentTarget.currentTime : previous)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => changeTrack(1)} onError={() => setHasError(true)} />
      <div className="track-summary">
        <div className={`album-art ${isPlaying ? 'spinning' : ''}`}>
          <img src={activeCover} alt="Current song artwork" />
          <span className="album-hole" />
        </div>
        <div className="track-copy">
          <h3>{activeTitle}</h3>
          <p>{activeArtist}</p>
        </div>
      </div>
      <div className="player-progress"><ProgressBar current={current} duration={playerDuration} onSeek={handleSeek} onSeekStart={() => { isSeekingRef.current = true }} onSeekEnd={handleSeekEnd} /></div>
      <PlayerControls isPlaying={isPlaying} onPrevious={() => changeTrack(-1)} onToggle={togglePlay} onNext={() => changeTrack(1)} />
      <label className="volume-control" aria-label="Volume">
        {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ '--progress': `${volume * 100}%` } as CSSProperties} />
      </label>
      {hasError && !showYouTubePlaylist && <p className="audio-error">Add audio files in <strong>/public/audio</strong> to start this track.</p>}
      </div>
    </motion.section>
  )
}

function RainOverlay({ enabled }: { enabled: boolean }) {
  return <AnimatePresence>{enabled && <motion.div className="rain-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ left: `${(index * 37) % 100}%`, animationDelay: `${(index % 9) * -0.35}s`, animationDuration: `${0.8 + (index % 5) * 0.14}s` }} />)}</motion.div>}</AnimatePresence>
}

export default function App() {
  const [rainMood, setRainMood] = useState(false)
  const [songsOpen, setSongsOpen] = useState(false)
  const [playlistMode, setPlaylistMode] = useState<PlaylistMode>('cooking')
  const [situationCloseSignal, setSituationCloseSignal] = useState(0)
  const songsPanelRef = useRef<HTMLDivElement>(null)
  const topActionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeSongsOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node
      if (!songsPanelRef.current?.contains(target) && !topActionsRef.current?.contains(target)) setSongsOpen(false)
    }
    document.addEventListener('pointerdown', closeSongsOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeSongsOnOutsideClick)
  }, [])

  const startPlaylist = (mode: PlaylistMode, id?: string) => {
    setPlaylistMode(mode)
    setSongsOpen(true)
    window.dispatchEvent(new CustomEvent('start-cooking-playlist', { detail: { mode, id } }))
  }

  return (
    <main className="app-shell">
      <video className="background-layer" src={BACKGROUND_VIDEO} autoPlay loop muted playsInline aria-hidden="true" />
      <div className="vignette" />
      <RainOverlay enabled={rainMood} />
      <div className="top-actions" ref={topActionsRef}>
        <FeedbackMenu onOpen={() => { setSongsOpen(false); setSituationCloseSignal((signal) => signal + 1) }} />
        <button className="songs-button" onClick={() => { setSituationCloseSignal((signal) => signal + 1); setSongsOpen((open) => !open) }}><Music2 size={16} /> Songs</button>
        <SituationMenu onPlaylistSituation={(mode) => startPlaylist(mode)} onOpen={() => setSongsOpen(false)} closeSignal={situationCloseSignal} />
      </div>
      {songsOpen && <div className="songs-panel" ref={songsPanelRef}>{(playlistMode === 'stuck' ? BUG_STUCK_TRACKS : playlistMode === 'deployed' ? DEPLOYED_TRACKS : YOUTUBE_TRACKS).map(([id, title], index) => <button key={`${id}-${index}`} onClick={() => { setSongsOpen(false); startPlaylist(playlistMode, id) }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong></button>)}</div>}
      <section className="hero-content">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}><MoodToggle enabled={rainMood} onToggle={() => setRainMood((value) => !value)} /></motion.div>
        <motion.div className="player-stack" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.75 }}>
          <MusicPlayer />
        </motion.div>
      </section>
    </main>
  )
}

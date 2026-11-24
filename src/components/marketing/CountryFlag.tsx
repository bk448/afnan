import type { CountrySlug } from '@/types/content'
import { cn } from '@/lib/cn'

/**
 * Country flags as inline SVG, drawn on a 3:2 field.
 *
 * Inline rather than image files: no network request, sharp at any size, and
 * they inherit the page's own rendering. Emblem-bearing flags (Mexico,
 * Portugal, Spain) are drawn without their coats of arms, which is standard
 * practice at small sizes and avoids rendering a national emblem inaccurately.
 */

const W = 30
const H = 20

function Vertical({ colors }: { colors: [string, string, string] }) {
  return (
    <>
      <rect width={W / 3} height={H} fill={colors[0]} />
      <rect x={W / 3} width={W / 3} height={H} fill={colors[1]} />
      <rect x={(W / 3) * 2} width={W / 3} height={H} fill={colors[2]} />
    </>
  )
}

function Horizontal({ colors }: { colors: [string, string, string] }) {
  return (
    <>
      <rect width={W} height={H / 3} fill={colors[0]} />
      <rect y={H / 3} width={W} height={H / 3} fill={colors[1]} />
      <rect y={(H / 3) * 2} width={W} height={H / 3} fill={colors[2]} />
    </>
  )
}

const MAPLE =
  'M15 4.2l1.1 2.4 2.1-.5-.7 2.3 2.2 1.5-1.2.9.6 2.1-2.6-.5-.2 1.2h-.6l.1-1.2-2.7.5.6-2.1-1.2-.9 2.2-1.5-.7-2.3 2.1.5z'

const FLAGS: Record<CountrySlug, React.ReactElement> = {
  uk: (
    <>
      <rect width={W} height={H} fill="#012169" />
      <g clipPath="url(#uk-clip)">
        <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2.2" />
      </g>
      <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
      <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.6" />
      <clipPath id="uk-clip">
        <rect width={W} height={H} />
      </clipPath>
    </>
  ),
  canada: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <rect width={7.5} height={H} fill="#D80621" />
      <rect x={22.5} width={7.5} height={H} fill="#D80621" />
      <path d={MAPLE} fill="#D80621" />
    </>
  ),
  mexico: <Vertical colors={['#006847', '#fff', '#CE1126']} />,
  germany: <Horizontal colors={['#000', '#DD0000', '#FFCE00']} />,
  france: <Vertical colors={['#002395', '#fff', '#ED2939']} />,
  italy: <Vertical colors={['#009246', '#fff', '#CE2B37']} />,
  ireland: <Vertical colors={['#169B62', '#fff', '#FF883E']} />,
  netherlands: <Horizontal colors={['#AE1C28', '#fff', '#21468B']} />,
  spain: (
    <>
      <rect width={W} height={H} fill="#AA151B" />
      <rect y={5} width={W} height={10} fill="#F1BF00" />
    </>
  ),
  portugal: (
    <>
      <rect width={W} height={H} fill="#FF0000" />
      <rect width={12} height={H} fill="#006600" />
      <circle cx={12} cy={10} r={4} fill="#FFE800" stroke="#D52B1E" strokeWidth="0.6" />
    </>
  ),
  switzerland: (
    <>
      <rect width={W} height={H} fill="#D52B1E" />
      <rect x={13.4} y={4} width={3.2} height={12} fill="#fff" />
      <rect x={9} y={8.4} width={12} height={3.2} fill="#fff" />
    </>
  ),
  japan: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <circle cx={15} cy={10} r={6} fill="#BC002D" />
    </>
  ),
  israel: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <rect y={2.4} width={W} height={2.4} fill="#0038B8" />
      <rect y={15.2} width={W} height={2.4} fill="#0038B8" />
      <path
        d="M15 6.4l2.9 5.1h-5.8zM15 13.6l-2.9-5.1h5.8z"
        fill="none"
        stroke="#0038B8"
        strokeWidth="0.9"
      />
    </>
  ),
  australia: (
    <>
      <rect width={W} height={H} fill="#00247D" />
      <g clipPath="url(#au-canton)">
        <path d="M0 0L15 10M15 0L0 10" stroke="#fff" strokeWidth="2" />
        <path d="M0 0L15 10M15 0L0 10" stroke="#C8102E" strokeWidth="1.1" />
        <path d="M7.5 0v10M0 5h15" stroke="#fff" strokeWidth="3" />
        <path d="M7.5 0v10M0 5h15" stroke="#C8102E" strokeWidth="1.8" />
      </g>
      <clipPath id="au-canton">
        <rect width={15} height={10} />
      </clipPath>
      <g fill="#fff">
        <circle cx={7.5} cy={15.5} r={1.5} />
        <circle cx={21} cy={4.5} r={0.9} />
        <circle cx={24.5} cy={9} r={0.9} />
        <circle cx={21} cy={13.5} r={0.9} />
        <circle cx={17.5} cy={9} r={0.9} />
        <circle cx={22} cy={8.5} r={0.5} />
      </g>
    </>
  ),
  uae: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <rect y={0} width={W} height={6.67} fill="#00732F" />
      <rect y={13.33} width={W} height={6.67} fill="#000" />
      <rect width={8} height={H} fill="#FF0000" />
    </>
  ),
  singapore: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <rect width={W} height={10} fill="#ED2939" />
      <path
        d="M9.4 5a3.6 3.6 0 100 5 4.4 4.4 0 110-5z"
        fill="#fff"
        transform="translate(-0.6 2.5)"
      />
      <g fill="#fff">
        <circle cx={11.6} cy={3.6} r={0.7} />
        <circle cx={14} cy={3} r={0.7} />
        <circle cx={16.4} cy={3.6} r={0.7} />
        <circle cx={12.6} cy={6} r={0.7} />
        <circle cx={15.4} cy={6} r={0.7} />
      </g>
    </>
  ),
}

interface CountryFlagProps {
  slug: CountrySlug
  className?: string
  /** Decorative beside a visible country name; labelled when standing alone. */
  label?: string
}

export function CountryFlag({ slug, className, label }: CountryFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn(
        'h-auto w-full shrink-0 rounded-[2px] ring-1 ring-ink-800/15',
        className,
      )}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {FLAGS[slug]}
    </svg>
  )
}

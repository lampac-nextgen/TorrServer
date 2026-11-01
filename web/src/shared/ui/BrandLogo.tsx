import { publicUrl } from 'shared/lib/publicUrl'
import { useThemePreference } from 'shared/theme/useThemePreference'

interface BrandLogoProps {
  className?: string
  /** Force a variant; default follows the effective brightness (dark logo on dark surfaces). */
  variant?: 'dark' | 'light'
  /** Empty when a visible heading already names the product. */
  alt?: string
}

/** TorrServer mark + wordmark (outlined SVG, no font needed). `dark` is drawn for dark backgrounds. */
export default function BrandLogo({ className = 'h-12 w-auto', variant, alt = 'TorrServer' }: BrandLogoProps) {
  const { isDark } = useThemePreference()
  const v = variant ?? (isDark ? 'dark' : 'light')
  return <img src={publicUrl(`brand/logo-${v}.svg`)} width={196} height={48} alt={alt} className={className} />
}

import { GitHub as GitHubIcon } from '@mui/icons-material'

import { LinkWrapper, LinkIcon } from './style'

interface LinkComponentProps {
  name: string
  link?: string
}

export default function LinkComponent({ name, link }: LinkComponentProps) {
  return (
    <LinkWrapper $isLink={!!link} href={link} target='_blank' rel='noreferrer'>
      {link && (
        <LinkIcon>
          <GitHubIcon />
        </LinkIcon>
      )}

      <div>{name}</div>
    </LinkWrapper>
  )
}

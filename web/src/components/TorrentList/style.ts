import styled, { css } from 'styled-components'

/** Non-interactive empty-state wrapper (e.g. offline message). */
export default styled.div`
  ${({
    theme: {
      addDialog: { notificationSuccessBGColor },
    },
  }) => css`
    display: grid;
    place-items: center;
    gap: 12px;
    padding: 28px 40px;
    border-radius: 8px;
    outline: none;
    background: ${notificationSuccessBGColor};

    .empty-icon {
      font-size: 64px;
    }

    .icon-label {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
  `}
`

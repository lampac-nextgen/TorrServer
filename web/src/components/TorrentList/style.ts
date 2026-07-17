import styled, { css, keyframes } from 'styled-components'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`

export default styled.div<{ $isButton?: boolean }>`
  ${({
    $isButton,
    theme: {
      addDialog: { notificationSuccessBGColor, languageSwitchBGColor },
    },
  }) => css`
    display: grid;
    place-items: center;
    gap: 12px;
    padding: 28px 40px;
    border-radius: 8px;
    outline: none;

    ${
      $isButton &&
      css`
        background: ${notificationSuccessBGColor};
        transition:
          background 0.2s ease,
          box-shadow 0.2s ease;
        cursor: pointer;

        :hover,
        :focus-visible {
          background: ${languageSwitchBGColor};
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

          .empty-icon {
            animation: ${float} 1.4s ease-in-out infinite;
          }
        }
      `
    }

    .empty-icon {
      font-size: 120px !important;
      width: 1em;
      height: 1em;
      transition: transform 0.2s ease;
    }

    .icon-label {
      font-size: 20px;
      text-align: center;
    }
  `}
`

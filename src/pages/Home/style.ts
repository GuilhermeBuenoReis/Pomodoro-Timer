import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3.5rem;
  }
`

export const BaseCountdowButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  transition: all 0.3s;

  border-radius: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const StartCountdowButton = styled(BaseCountdowButton)`
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
    color: ${(props) => props.theme['gray-100']};
  }
`

export const StopCountdowButton = styled(BaseCountdowButton)`
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme['gray-100']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
    color: ${(props) => props.theme['gray-100']};
  }
`

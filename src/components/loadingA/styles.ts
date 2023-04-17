import { LoaderCircle as Loader } from '@styled-icons/boxicons-regular';
import styled, { keyframes } from 'styled-components';

interface IIsLoadingProps {
  color?: string;
  size?: number;
}

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const IsLoading = styled(Loader).attrs((props: IIsLoadingProps) => ({
  size: props.size || 24,
  color: props.color || 'currentColor',
}))`
  animation: ${Rotate} 2s infinite linear;
`;

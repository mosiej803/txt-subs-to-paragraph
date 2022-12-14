import styled from 'styled-components';
import { scrollbar } from 'assets/styles/mixins';

export const Wrapper = styled.div`
  font-size: 1.6rem;
  line-height: 1.2;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Options = styled.div`
  color: ${({ theme }) => theme.colors.lightGrey};

  display: flex;
  justify-content: center;
  gap: 3rem;
`;

export const Loader = styled.div`
  color: ${({ theme }) => theme.colors.lightGrey};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 20rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.red};

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: ${({ converted: { soFar, outOf } }) => `${(soFar / outOf) * 20}rem`};
    height: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ResultWrapper = styled.div`
  padding: 4rem 2.4rem;
  border-radius: 0.9rem;
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  ${scrollbar}
`;

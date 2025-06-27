import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../src/app/components/ui/Loading';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
  }),
}));

describe('Loading Component', () => {
  it('renders loading component', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('displays custom message', () => {
    const customMessage = 'Please wait...';
    render(<Loading message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeTruthy();
  });

  it('renders without props', () => {
    expect(() => render(<Loading />)).not.toThrow();
  });
}); 
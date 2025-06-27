import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../src/app/components/Table';

describe('Table Component', () => {
  const mockColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
  ];

  const mockData = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Raza' },
  ];

  it('renders table headers', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Name')).toBeTruthy();
  });

  it('renders table data', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByText('Ali')).toBeTruthy();
    expect(screen.getByText('Raza')).toBeTruthy();
  });

  it('handles empty data', () => {
    render(<Table columns={mockColumns} data={[]} />);
    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Name')).toBeTruthy();
  });

  it('renders without crashing', () => {
    expect(() => render(<Table columns={mockColumns} data={mockData} />)).not.toThrow();
  });
}); 
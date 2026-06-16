import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { useAppStore } from '../../store/appStore';

describe('Sidebar Component', () => {
  it('renders all nav items when expanded', () => {
    // Set initial state
    useAppStore.setState({ sidebarCollapsed: false, activeSection: 'home' });

    render(<Sidebar />);

    // Check that standard nav items are visible in the document
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('Live Channels')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('hides nav labels when collapsed', () => {
    // Set collapsed state
    useAppStore.setState({ sidebarCollapsed: true });

    render(<Sidebar />);

    // When collapsed, labels should not be in the document
    expect(screen.queryByText('Home')).toBeNull();
    expect(screen.queryByText('Trending')).toBeNull();
  });

  it('triggers setActiveSection when a nav item is clicked', () => {
    useAppStore.setState({ sidebarCollapsed: false, activeSection: 'home' });
    render(<Sidebar />);

    const moviesBtn = screen.getByText('Movies');
    fireEvent.click(moviesBtn);

    expect(useAppStore.getState().activeSection).toBe('movies');
  });

  it('toggles sidebar collapse state on toggle button click', () => {
    useAppStore.setState({ sidebarCollapsed: false });
    render(<Sidebar />);

    // Since we don't have text inside the toggle button, we can find it by its layout structure (or query button)
    // The toggle button contains a chevron left / right icon
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons[buttons.length - 1]; // Toggle is the last button in the sidebar

    fireEvent.click(toggleButton);
    expect(useAppStore.getState().sidebarCollapsed).toBe(true);
  });
});

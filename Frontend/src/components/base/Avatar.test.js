// src/components/base/Avatar.test.js
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar'; // Ensure path is correct

describe('Avatar', () => {
  test('renders an image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" size="m" />);
    const imgElement = screen.getByRole('img', { name: /avatar/i });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(imgElement).toHaveClass('rounded-circle');
  });

  test('renders default image when src is not provided', () => {
    render(<Avatar size="m" />);
    const imgElement = screen.getByRole('img', { name: /avatar/i });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'avatar.webp');
    expect(imgElement).toHaveClass('avatar-placeholder', 'rounded-circle');
  });
});
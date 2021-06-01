import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Icon from '.';

describe('Icon component', () => {
  afterEach(cleanup);

  it('should render without explode', () => {
    const { container } = render(<Icon name="heart" />);

    should.exist(container);
    expect(container.querySelector('svg')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(<Icon name="heart" />);
    const icon = container.querySelector('svg');

    expect(icon.getAttribute('class').split(' ')).to.include.members(['bi', 'bi-icon']);
  });

  it('should accept an "id" prop', () => {
    const { container } = render(<Icon name="heart" id="foo" />);
    const icon = container.querySelector('svg');

    expect(icon.id).to.equal('foo');
  });

  it('should allow adding custom classes', () => {
    const { container } = render(<Icon name="heart" className="foo" />);
    const icon = container.querySelector('svg');

    expect(icon.getAttribute('class').split(' ')).to.include.members(['foo']);
  });

  it('should allow to define custom style', () => {
    const { container } = render(<Icon name="heart" style={{ margin: '10px' }} />);
    const icon = container.querySelector('svg');

    expect(icon.getAttribute('style')).to.equal('margin: 10px;');
  });

  it('should allow to define the icon color', () => {
    const { container, rerender } = render(<Icon name="heart" color="primary" />);
    const icon = container.querySelector('svg');

    expect(icon.getAttribute('class').split(' ')).to.include.members(['icon-primary']);

    rerender(<Icon name="heart" color="warning" />);

    expect(icon.getAttribute('class').split(' ')).to.include.members(['icon-warning']);
    expect(icon.getAttribute('class').split(' ')).to.not.include.members(['icon-primary']);
  });

  it('should allow to define the icon size', () => {
    const { container, rerender } = render(<Icon name="heart" size="small" />);
    const icon = container.querySelector('svg');

    expect(icon.getAttribute('class').split(' ')).to.include.members(['fa-sm']);

    rerender(<Icon name="heart" size="large" />);

    expect(icon.getAttribute('class').split(' ')).to.include.members(['fa-lg']);
    expect(icon.getAttribute('class').split(' ')).to.not.include.members(['fa-sm']);
  });
});
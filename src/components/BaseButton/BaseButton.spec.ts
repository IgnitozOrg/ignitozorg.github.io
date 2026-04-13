import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('sets the href attribute', () => {
    const wrapper = mount(BaseButton, {
      props: { href: 'https://example.com' },
    })
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
  })

  it('uses accent variant by default', () => {
    const wrapper = mount(BaseButton, {
      props: { href: '#' },
    })
    expect(wrapper.find('a').classes()).toContain('btn--accent')
  })

  it('applies ghost variant when specified', () => {
    const wrapper = mount(BaseButton, {
      props: { href: '#', variant: 'ghost' },
    })
    expect(wrapper.find('a').classes()).toContain('btn--ghost')
  })

  it('forwards target and rel attributes', () => {
    const wrapper = mount(BaseButton, {
      props: { href: 'https://example.com', target: '_blank', rel: 'noopener' },
    })
    const anchor = wrapper.find('a')
    expect(anchor.attributes('target')).toBe('_blank')
    expect(anchor.attributes('rel')).toBe('noopener')
  })
})

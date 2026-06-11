import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizProgress from '@/components/QuizProgress.vue'

describe('QuizProgress', () => {
  it('renders current and total', () => {
    const wrapper = mount(QuizProgress, {
      props: { current: 3, total: 10, progress: 30 },
    })
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('10')
  })

  it('sets progress bar width', () => {
    const wrapper = mount(QuizProgress, {
      props: { current: 5, total: 10, progress: 50 },
    })
    const fill = wrapper.find('.progress-fill')
    expect(fill.attributes('style')).toContain('width: 50%')
  })

  it('shows 0% at the beginning', () => {
    const wrapper = mount(QuizProgress, {
      props: { current: 1, total: 10, progress: 0 },
    })
    const fill = wrapper.find('.progress-fill')
    expect(fill.attributes('style')).toContain('width: 0%')
  })

  it('shows 100% at the end', () => {
    const wrapper = mount(QuizProgress, {
      props: { current: 10, total: 10, progress: 100 },
    })
    const fill = wrapper.find('.progress-fill')
    expect(fill.attributes('style')).toContain('width: 100%')
  })
})

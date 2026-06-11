import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultScreen from '@/components/ResultScreen.vue'
import type { WrongAnswer } from '@/interfaces'

const mockWrongAnswers: WrongAnswer[] = [
  {
    question: {
      id: 1,
      infinitive: 'go',
      translation: 'ir',
      type: 'irregular',
      form: 'past-simple',
      difficulty: 'easy',
      options: ['goed', 'went', 'wented', 'gone'],
      correctAnswer: 1,
    },
    selectedIndex: 0,
  },
  {
    question: {
      id: 2,
      infinitive: 'eat',
      translation: 'comer',
      type: 'irregular',
      form: 'past-participle',
      difficulty: 'easy',
      options: ['ate', 'eaten', 'eated', 'et'],
      correctAnswer: 1,
    },
    selectedIndex: 2,
  },
]

describe('ResultScreen', () => {
  it('renders score and total', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 7, total: 10, wrongAnswers: mockWrongAnswers },
    })
    expect(wrapper.text()).toContain('7')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('Quiz Complete!')
  })

  it('calculates and displays percentage', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 7, total: 10, wrongAnswers: mockWrongAnswers },
    })
    expect(wrapper.text()).toContain('70%')
  })

  it('renders wrong answers review', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 7, total: 10, wrongAnswers: mockWrongAnswers },
    })
    expect(wrapper.text()).toContain('Review your mistakes')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('go')
    expect(wrapper.text()).toContain('eat')
  })

  it('shows your answer vs correct answer', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 7, total: 10, wrongAnswers: mockWrongAnswers },
    })
    expect(wrapper.text()).toContain('goed') // wrong answer for go
    expect(wrapper.text()).toContain('went') // correct answer for go
  })

  it('shows perfect message when no mistakes', () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 10, total: 10, wrongAnswers: [] },
    })
    expect(wrapper.text()).toContain('Perfect score!')
    expect(wrapper.text()).not.toContain('Review your mistakes')
  })

  it('emits restart on button click', async () => {
    const wrapper = mount(ResultScreen, {
      props: { score: 7, total: 10, wrongAnswers: mockWrongAnswers },
    })
    const button = wrapper.find('.restart-btn')
    await button.trigger('click')
    expect(wrapper.emitted('restart')).toBeTruthy()
  })
})

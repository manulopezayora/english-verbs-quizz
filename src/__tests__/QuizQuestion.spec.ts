import QuizQuestion from '@/components/QuizQuestion.vue'
import type { Question } from '@/interfaces'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

const baseQuestion: Question = {
  id: 1,
  infinitive: 'go',
  translation: 'ir',
  type: 'irregular',
  form: 'past-simple',
  difficulty: 'easy',
  options: ['goed', 'went', 'wented', 'gone'],
  correctAnswer: 1,
}

describe('QuizQuestion', () => {
  it('renders the question text', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: null },
    })
    expect(wrapper.text()).toContain('go')
    expect(wrapper.text()).toContain('past simple')
    expect(wrapper.text()).toContain('ir')
  })

  it('renders all option buttons', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: null },
    })
    const buttons = wrapper.findAll('.option-btn')
    expect(buttons).toHaveLength(4)
    expect(buttons[0]!.text()).toBe('goed')
    expect(buttons[1]!.text()).toBe('went')
    expect(buttons[2]!.text()).toBe('wented')
    expect(buttons[3]!.text()).toBe('gone')
  })

  it('emits select event with correct index on click', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: null },
    })
    const buttons = wrapper.findAll('.option-btn')
    buttons[1]!.trigger('click')
    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted![0]![0]).toBe(1)
  })

  it('disables buttons after selection', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: 1 },
    })
    const buttons = wrapper.findAll('.option-btn')
    buttons.forEach((btn) => {
      expect((btn.element as HTMLButtonElement).disabled).toBe(true)
    })
  })

  it('applies correct class to the right answer', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: 0 },
    })
    const buttons = wrapper.findAll('.option-btn')
    expect(buttons[1]!.classes()).toContain('correct')
  })

  it('applies incorrect class to the selected wrong answer', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: 0 },
    })
    const buttons = wrapper.findAll('.option-btn')
    expect(buttons[0]!.classes()).toContain('incorrect')
  })

  it('applies dimmed class to non-selected wrong answers', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: 0 },
    })
    const buttons = wrapper.findAll('.option-btn')
    expect(buttons[2]!.classes()).toContain('dimmed')
    expect(buttons[3]!.classes()).toContain('dimmed')
  })

  it('shows difficulty and type after selection', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: 0 },
    })
    expect(wrapper.text()).toContain('easy')
    expect(wrapper.text()).toContain('irregular')
  })

  it('does not show explanation before selection', () => {
    const wrapper = mount(QuizQuestion, {
      props: { question: baseQuestion, selectedAnswer: null },
    })
    expect(wrapper.find('.explanation').exists()).toBe(false)
  })
})

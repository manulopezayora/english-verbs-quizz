import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterPanel from '@/components/FilterPanel.vue'

describe('FilterPanel', () => {
  it('renders filter groups', () => {
    const wrapper = mount(FilterPanel)
    expect(wrapper.text()).toContain('Select topics to practice')
    expect(wrapper.text()).toContain('Difficulty')
    expect(wrapper.text()).toContain('Verb Type')
    expect(wrapper.text()).toContain('Form')
    expect(wrapper.text()).toContain('Questions')
  })

  it('renders all filter buttons', () => {
    const wrapper = mount(FilterPanel)
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons).toHaveLength(11)
    expect(buttons[0]!.text()).toBe('easy')
    expect(buttons[3]!.text()).toBe('regular')
    expect(buttons[5]!.text()).toBe('Past Simple')
  })

  it('toggles difficulty buttons on click', async () => {
    const wrapper = mount(FilterPanel)
    const easyBtn = wrapper.findAll('.filter-btn')[0]!
    expect(easyBtn.classes()).not.toContain('active')

    await easyBtn.trigger('click')
    expect(easyBtn.classes()).toContain('active')

    await easyBtn.trigger('click')
    expect(easyBtn.classes()).not.toContain('active')
  })

  it('selects question count buttons (mutually exclusive)', async () => {
    const wrapper = mount(FilterPanel)
    const filterOptions = wrapper.findAll('.filter-options')
    const countButtons = filterOptions[3]!.findAll('.filter-btn')

    expect(countButtons[1]!.classes()).toContain('active')

    await countButtons[0]!.trigger('click')
    expect(countButtons[0]!.classes()).toContain('active')
    expect(countButtons[1]!.classes()).not.toContain('active')
  })

  it('renders All for count 0', () => {
    const wrapper = mount(FilterPanel)
    const filterOptions = wrapper.findAll('.filter-options')
    const countButtons = filterOptions[3]!.findAll('.filter-btn')
    expect(countButtons[3]!.text()).toBe('All')
  })

  it('emits start with correct filters on click', async () => {
    const wrapper = mount(FilterPanel)
    const startBtn = wrapper.find('.start-btn')
    await startBtn.trigger('click')

    const emitted = wrapper.emitted('start')
    expect(emitted).toBeTruthy()
    const payload = emitted![0]![0] as Record<string, unknown>
    expect(payload).toHaveProperty('difficulties')
    expect(payload).toHaveProperty('types')
    expect(payload).toHaveProperty('forms')
    expect(payload.questionCount).toBe(10)
  })
})

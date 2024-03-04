import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => id === item.id.toString())

    if (!answer) {
      throw new Error('Answer not found')
    }

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }

  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}

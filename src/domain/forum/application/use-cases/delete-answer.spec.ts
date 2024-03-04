import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('authorId-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'authorId-1',
      answerId: 'answer-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('authorId-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'authorId-2',
        answerId: 'answer-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

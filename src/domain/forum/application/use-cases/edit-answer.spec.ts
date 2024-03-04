import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('authorId-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'authorId-1',
      content: 'Conteúdo teste',
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    })
  })
  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('authorId-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        content: 'Conteúdo teste',
        answerId: newAnswer.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

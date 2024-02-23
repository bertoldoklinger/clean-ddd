import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repositories"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}


export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
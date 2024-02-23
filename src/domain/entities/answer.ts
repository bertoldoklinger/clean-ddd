import { randomUUID } from "crypto"
import { Entity } from "../../core/entities/entity"

interface AnswerProps {
  questionId: string,
  content: string,
  authorId: string
  createdAt: Date
  updatedAt?: Date
}



export class Answer extends Entity<AnswerProps>{

  get content(){
    return this.props.content
  }
}
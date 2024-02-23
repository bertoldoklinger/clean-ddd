import { randomUUID } from "crypto"
import { Entity } from "../../core/entities/entity"

interface AnswerProps {
  questionId: string,
  content: string,
  authorId: string
}



export class Answer extends Entity<AnswerProps>{

  get content(){
    return this.props.content
  }
}
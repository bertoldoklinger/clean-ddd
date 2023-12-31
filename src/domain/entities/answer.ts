import { randomUUID } from "crypto"

interface AnswerProps {
  questionId: string,
  content: string,
  authorId: string
}



export class Answer {
  public content: string
  public id: string
  public authorId: string
  public questionId: string

  constructor(props: AnswerProps, id?: string) {
    this.id = id ?? randomUUID()
    this.content = props.content
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}
import { Comment, CommentProps } from './comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps extends CommentProps {
  answerId: UniqueEntityId
}
export class QuestionComment extends Comment<QuestionCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
